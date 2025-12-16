import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Course from "@/models/Course";

export async function GET() {
	try {
		await connectDB();

		const courses = await Course.find({ isPublic: true })
			.populate("instructor", "name")
			.sort({ createdAt: -1 })
			.lean();

		const publicCourses = courses.map((course: { _id: { toString: () => string }; title: string; instructor?: { name?: string }; skills?: string[]; level: string; category: string; duration: string; price: number; rating?: number; ratingCount?: number }) => {
			const instructorDoc = course.instructor as { name?: string } | undefined;

			return {
				id: course._id.toString(),
				title: course.title,
				instructor: instructorDoc?.name ?? "Unknown Instructor",
				skills: course.skills ?? [],
				level: course.level,
				category: course.category,
				duration: course.duration,
				price: course.price,
				rating: course.rating ?? 4.7,
				ratingCount: course.ratingCount ?? 0,
			};
		});

		return NextResponse.json(
			{
				message: "Public courses fetched successfully",
				courses: publicCourses,
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error fetching public courses", error);

		return NextResponse.json(
			{
				message: "Failed to fetch courses",
			},
			{ status: 500 }
		);
	}
}

