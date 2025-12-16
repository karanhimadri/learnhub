"use client";

import { useEffect, useState } from "react";
import CourseCard from "@/components/CourseCard";
import { useCourse, type PublicCourse } from "@/hooks/useCourse";

export default function CoursesPage() {
	const { fetchPublicCourses, error } = useCourse();
	const [courses, setCourses] = useState<PublicCourse[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let cancelled = false;

		const load = async () => {
			try {
				const data = await fetchPublicCourses();
				if (!cancelled) {
					setCourses(data);
				}
			} finally {
				if (!cancelled) {
					setLoading(false);
				}
			}
		};

		load();

		return () => {
			cancelled = true;
		};
	}, [fetchPublicCourses]);

	return (
		<div className="bg-gray-50 min-h-screen">
			<section className="border-b border-gray-200 bg-white">
				<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
					<h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
						Explore Courses
					</h1>
					<p className="mt-2 max-w-2xl text-sm text-gray-600">
						Learn in-demand skills from top universities and industry leaders.
						Courses are structured into beginner, intermediate, and advanced levels
						to match your learning journey.
					</p>
				</div>
			</section>

			<section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
				<div className="mb-4 text-xs font-medium uppercase tracking-wide text-gray-500">
					{loading
						? "Loading courses..."
						: error
						? error
						: `Showing ${courses.length} courses`}
				</div>

				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{!loading && !error &&
						courses.map((course) => (
							<CourseCard key={course.id} {...course} />
						))}
				</div>
			</section>
		</div>
	);
}

