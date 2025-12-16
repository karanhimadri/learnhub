"use client";

import { useEffect, useState } from "react";
import { CourseProvider, useCourse, InstructorCourse } from "@/hooks/useCourse";
import { Edit3, Loader2, Trash2 } from "lucide-react";
import Link from "next/link";

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "-";

  const day = date.getDate().toString().padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();

  return `${day} ${month}, ${year}`;
}

function CoursesList() {
  const { fetchInstructorCourses, error } = useCourse();
  const [courses, setCourses] = useState<InstructorCourse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const data = await fetchInstructorCourses();
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
  }, [fetchInstructorCourses]);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-lg font-semibold text-gray-900">Your courses</h1>
        <p className="mt-1 text-sm text-gray-600">
          Manage all courses you&apos;ve launched as an instructor.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading courses…
        </div>
      ) : error ? (
        <p className="text-sm font-semibold text-red-600">{error}</p>
      ) : courses.length === 0 ? (
        <p className="text-sm text-gray-500">You haven&apos;t created any courses yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-50 text-xs font-semibold uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Created</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course._id} className="border-b border-gray-100 last:border-0">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    {course.title}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {course.category}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {course.isPublic ? (
                      <span className="inline-flex rounded-full bg-green-50 px-2 py-0.5 text-xs font-semibold text-green-700">
                        Published
                      </span>
                    ) : (
                      <span className="inline-flex rounded-full bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-600">
                        Draft
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    ₹{course.price.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {formatDate(course.createdAt)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="inline-flex gap-2">
                      <Link
                        href={`/dashboard/instructor/courses/${course._id}`}
                        className="inline-flex items-center gap-1 rounded border border-gray-300 px-2 py-1 text-xs font-medium text-gray-700 hover:border-blue-600 hover:text-blue-700"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                        Edit
                      </Link>

                      <button
                        type="button"
                        className="inline-flex items-center gap-1 rounded border border-gray-300 px-2 py-1 text-xs font-medium text-gray-700 hover:border-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default function AllCourses() {
  return (
    <CourseProvider>
      <CoursesList />
    </CourseProvider>
  );
}
