import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectDB } from "@/lib/mongodb";
import { verifyToken } from "@/lib/auth";
import Enrollment from "@/models/Enrollment";
import { Types } from "mongoose";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = verifyToken(token);

    if (!user || user.role !== "learner") {
      return NextResponse.json(
        { message: "Only learners can view these stats" },
        { status: 403 }
      );
    }

    await connectDB();

    const userId = new Types.ObjectId(user.userId);

    const [summary] = await Enrollment.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          active: {
            $sum: {
              $cond: [
                {
                  $or: [
                    { $eq: ["$isComplete", false] },
                    { $eq: ["$isComplete", null] },
                  ],
                },
                1,
                0,
              ],
            },
          },
          completed: {
            $sum: {
              $cond: [{ $eq: ["$isComplete", true] }, 1, 0],
            },
          },
        },
      },
    ]);

    const stats = summary || {
      total: 0,
      active: 0,
      completed: 0,
    };

    return NextResponse.json({ stats }, { status: 200 });
  } catch (error) {
    console.error("LEARNER_STATS_ERROR", error);
    return NextResponse.json(
      { message: "Failed to load learner stats" },
      { status: 500 }
    );
  }
}
