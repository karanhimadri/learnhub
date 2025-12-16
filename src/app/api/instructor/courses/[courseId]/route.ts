import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Course from "@/models/Course";
import { verifyToken } from "@/lib/auth";

type RouteContext = {
  params: Promise<{
    courseId: string;
  }>;
};

export async function GET(req: NextRequest, { params }: RouteContext) {
  try {
    await connectDB();

    const authHeader = req.headers.get("authorization") || "";
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.slice(7)
      : req.cookies.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = verifyToken(token);

    if (!user || (user.role !== "instructor" && user.role !== "admin")) {
      return NextResponse.json(
        { message: "Only instructors or admins can view courses" },
        { status: 403 }
      );
    }

    const { courseId } = await params;

    const query = { _id: courseId };

    const course = await Course.findOne(query).lean();

    if (!course) {
      return NextResponse.json({ message: "Course not found" }, { status: 404 });
    }

    return NextResponse.json({ course }, { status: 200 });
  } catch (error) {
    console.error("COURSE_DETAIL_ERROR", error);
    return NextResponse.json(
      { message: "Failed to load course" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest, { params }: RouteContext) {
  try {
    await connectDB();

    const authHeader = req.headers.get("authorization") || "";
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.slice(7)
      : req.cookies.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = verifyToken(token);

    if (!user || (user.role !== "instructor" && user.role !== "admin")) {
      return NextResponse.json(
        { message: "Only instructors or admins can update courses" },
        { status: 403 }
      );
    }

    const { courseId } = await params;

    const body = await req.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
    }

    const {
      title,
      skills,
      level,
      category,
      duration,
      price,
      isPublic,
    } = body as {
      title?: string;
      skills?: string[];
      level?: "Beginner" | "Intermediate" | "Advanced";
      category?: string;
      duration?: string;
      price?: number;
      isPublic?: boolean;
    };

    const updates: Record<string, unknown> = {};

    if (title !== undefined) {
      if (!title || title.trim().length < 5) {
        return NextResponse.json(
          { message: "Title must be at least 5 characters" },
          { status: 400 }
        );
      }
      updates.title = title.trim();
    }

    if (category !== undefined) {
      if (!category) {
        return NextResponse.json(
          { message: "Category is required" },
          { status: 400 }
        );
      }
      updates.category = category.trim();
    }

    if (duration !== undefined) {
      if (!duration) {
        return NextResponse.json(
          { message: "Duration is required" },
          { status: 400 }
        );
      }
      updates.duration = duration.trim();
    }

    if (level !== undefined) {
      if (!["Beginner", "Intermediate", "Advanced"].includes(level)) {
        return NextResponse.json(
          { message: "Invalid level" },
          { status: 400 }
        );
      }
      updates.level = level;
    }

    if (price !== undefined) {
      const parsedPrice = Number(price);
      if (Number.isNaN(parsedPrice) || parsedPrice < 0) {
        return NextResponse.json(
          { message: "Price must be a non-negative number" },
          { status: 400 }
        );
      }
      updates.price = parsedPrice;
    }

    if (Array.isArray(skills)) {
      updates.skills = skills.map((s) => String(s).trim()).filter(Boolean);
    }

    if (isPublic !== undefined) {
      updates.isPublic = Boolean(isPublic);
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { message: "No changes to apply" },
        { status: 200 }
      );
    }

    const filter = { _id: courseId };

    const course = await Course.findOneAndUpdate(filter, updates, {
      new: true,
    }).lean();

    if (!course) {
      return NextResponse.json({ message: "Course not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Course updated", course },
      { status: 200 }
    );
  } catch (error) {
    console.error("COURSE_UPDATE_ERROR", error);
    return NextResponse.json(
      { message: "Failed to update course" },
      { status: 500 }
    );
  }
}
