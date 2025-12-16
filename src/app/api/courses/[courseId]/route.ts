import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Course from "@/models/Course";

type RouteContext = {
  params: Promise<{
    courseId: string;
  }>;
};

export async function GET(_req: NextRequest, { params }: RouteContext) {
  try {
    await connectDB();

    const { courseId } = await params;

    const doc = await Course.findOne({ _id: courseId, isPublic: true })
      .populate("instructor", "name")
      .lean();

    if (!doc) {
      return NextResponse.json(
        { message: "Course not found" },
        { status: 404 }
      );
    }

    const instructorDoc = doc.instructor as { name?: string } | undefined;

    const course = {
      id: doc._id.toString(),
      title: doc.title,
      instructor: instructorDoc?.name ?? "Unknown Instructor",
      skills: doc.skills ?? [],
      level: doc.level,
      category: doc.category,
      duration: doc.duration,
      price: doc.price,
      rating: doc.rating ?? 4.7,
      ratingCount: doc.ratingCount ?? 0,
    };

    return NextResponse.json(
      {
        message: "Course fetched successfully",
        course,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("PUBLIC_COURSE_DETAIL_ERROR", error);
    return NextResponse.json(
      { message: "Failed to load course" },
      { status: 500 }
    );
  }
}
