import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Course from "@/models/Course";
import { verifyToken } from "@/lib/auth";
import { Types } from "mongoose";

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
        { message: "Only instructors or admins can view course stats" },
        { status: 403 }
      );
    }

    const instructorId = new Types.ObjectId(user.userId);

    const stats = await Course.aggregate([
      { $match: { instructor: instructorId } },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          public: {
            $sum: { $cond: [{ $eq: ["$isPublic", true] }, 1, 0] },
          },
          draft: {
            $sum: { $cond: [{ $eq: ["$isPublic", false] }, 1, 0] },
          },
          free: {
            $sum: { $cond: [{ $eq: ["$price", 0] }, 1, 0] },
          },
          paid: {
            $sum: { $cond: [{ $gt: ["$price", 0] }, 1, 0] },
          },
        },
      },
    ]);

    const summary = stats[0] || {
      total: 0,
      public: 0,
      draft: 0,
      free: 0,
      paid: 0,
    };

    return NextResponse.json({ stats: summary }, { status: 200 });
  } catch (error) {
    console.error("COURSE_STATS_ERROR", error);
    return NextResponse.json(
      { message: "Failed to load course stats" },
      { status: 500 }
    );
  }
}
