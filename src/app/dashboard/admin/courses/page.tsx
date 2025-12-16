// src/app/dashboard/admin/courses/page.tsx

import { BookOpen } from "lucide-react";

export default function AllCourses() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="w-full max-w-3xl rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex flex-col items-center text-center p-10">
          {/* Icon */}
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-teal-100 text-teal-700">
            <BookOpen className="h-7 w-7" />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-semibold text-gray-900">
            All Courses
          </h1>

          {/* Description */}
          <p className="mt-2 max-w-md text-sm text-gray-600">
            View and manage all courses created by instructors across the platform.
          </p>

          {/* Divider */}
          <div className="my-6 h-px w-full max-w-sm bg-gray-200" />

          {/* Status badge */}
          <span className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-4 py-1.5 text-sm font-medium text-teal-700">
            <span className="h-2 w-2 rounded-full bg-teal-500" />
            Coming Soon
          </span>

          {/* Helper text */}
          <p className="mt-4 text-xs text-gray-500">
            This section will include course listing, filters, and moderation tools.
          </p>
        </div>
      </div>
    </div>
  );
}
