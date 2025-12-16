import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectDB } from "@/lib/mongodb";
import { verifyToken } from "@/lib/auth";
import Enrollment from "@/models/Enrollment";
import Course from "@/models/Course";

export async function POST(req: NextRequest) {
  try {
    const { courseId } = await req.json().catch(() => ({} as Record<string, never>));

    if (!courseId || typeof courseId !== "string") {
      return NextResponse.json(
        { message: "courseId is required" },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = verifyToken(token);

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const course = await Course.findOne({ _id: courseId, isPublic: true }).lean();

    if (!course) {
      return NextResponse.json(
        { message: "Course not found" },
        { status: 404 }
      );
    }

    try {
      await Enrollment.create({
        user: user.userId,
        course: courseId,
        enrolledAt: new Date(),
        isActive: true,
        // isComplete remains false by default on new enrollment
      });
    } catch (err: unknown) {
      if ((err as { code?: number })?.code === 11000) {
        return NextResponse.json(
          { message: "Already enrolled in this course" },
          { status: 200 }
        );
      }
      throw err;
    }

    return NextResponse.json(
      { message: "Enrolled successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("ENROLLMENT_ERROR", error);
    return NextResponse.json(
      { message: "Failed to enroll" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = verifyToken(token);

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const enrollments = await Enrollment.find({ user: user.userId })
      .populate({
        path: "course",
        populate: { path: "instructor", select: "name" },
      })
      .lean();

    const courses = enrollments
      .map((enrollment: { _id: { toString: () => string }; course?: { _id: { toString: () => string }; title: string; instructor?: { name?: string } }; enrolledAt?: Date; createdAt?: Date }) => {
        const course = enrollment.course;
        if (!course) return null;

        const instructorDoc = course.instructor as { name?: string } | undefined;

        return {
          enrollmentId: enrollment._id.toString(),
          courseId: course._id.toString(),
          title: course.title,
          instructor: instructorDoc?.name ?? "Unknown Instructor",
          enrolledAt: enrollment.enrolledAt ?? enrollment.createdAt ?? null,
        };
      })
      .filter(Boolean);

    return NextResponse.json({ courses }, { status: 200 });
  } catch (error) {
    console.error("ENROLLMENT_LIST_ERROR", error);
    return NextResponse.json(
      { message: "Failed to load enrollments" },
      { status: 500 }
    );
  }
}
