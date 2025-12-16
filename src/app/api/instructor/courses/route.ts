import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Course from "@/models/Course";
import { verifyToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const authHeader = req.headers.get("authorization") || "";
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.slice(7)
      : req.cookies.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = verifyToken(token);

    if (!user || (user.role !== "instructor" && user.role !== "admin")) {
      return NextResponse.json(
        { message: "Only instructors or admins can view their courses" },
        { status: 403 }
      );
    }

    const courses = await Course.find({ instructor: user.userId })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(
      { courses },
      { status: 200 }
    );
  } catch (error) {
    console.error("COURSE_LIST_ERROR", error);
    return NextResponse.json(
      { message: "Failed to load courses" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const authHeader = req.headers.get("authorization") || "";
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.slice(7)
      : req.cookies.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = verifyToken(token);

    if (!user || (user.role !== "instructor" && user.role !== "admin")) {
      return NextResponse.json(
        { message: "Only instructors or admins can create courses" },
        { status: 403 }
      );
    }

    const body = await req.json().catch(() => null);

    if (!body) {
      return NextResponse.json(
        { message: "Invalid JSON body" },
        { status: 400 }
      );
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

    if (!title || title.trim().length < 5) {
      return NextResponse.json(
        { message: "Title is required and must be at least 5 characters" },
        { status: 400 }
      );
    }

    if (!category || !duration) {
      return NextResponse.json(
        { message: "Category and duration are required" },
        { status: 400 }
      );
    }

    if (!level || !["Beginner", "Intermediate", "Advanced"].includes(level)) {
      return NextResponse.json(
        { message: "Invalid level" },
        { status: 400 }
      );
    }

    if (price === undefined || price === null || Number.isNaN(Number(price))) {
      return NextResponse.json(
        { message: "Price is required" },
        { status: 400 }
      );
    }

    const parsedPrice = Number(price);
    if (parsedPrice < 0) {
      return NextResponse.json(
        { message: "Price cannot be negative" },
        { status: 400 }
      );
    }

    const course = await Course.create({
      title: title.trim(),
      instructor: user.userId,
      skills: Array.isArray(skills)
        ? skills.map((s) => String(s).trim()).filter(Boolean)
        : [],
      level,
      category: category.trim(),
      duration: duration.trim(),
      price: parsedPrice,
      isPublic: Boolean(isPublic),
    });

    return NextResponse.json(
      { message: "Course created", course },
      { status: 201 }
    );
  } catch (error) {
    console.error("COURSE_CREATE_ERROR", error);
    return NextResponse.json(
      { message: "Failed to create course" },
      { status: 500 }
    );
  }
}
