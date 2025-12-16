"use client";

import { useEffect, useState } from "react";

type ActiveCourse = {
  id: string;
  title: string;
  instructor: string;
  progressPercent: number;
  nextLesson: string;
};

type UpcomingItem = {
  id: string;
  courseTitle: string;
  label: string;
  due: string;
};

export default function LearnerMyLearningPage() {
  const [activeCourses, setActiveCourses] = useState<ActiveCourse[]>([]);
  const [upcomingDeadlines, setUpcomingDeadlines] = useState<UpcomingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setError(null);
      setLoading(true);

      try {
        const res = await fetch("/api/enrollments", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json().catch(() => null);

        if (!res.ok) {
          const message = (data && data.message) || "Failed to load enrollments";
          if (!cancelled) setError(message);
          return;
        }

        const courses = (data?.courses || []) as Array<{
          enrollmentId: string;
          courseId: string;
          title: string;
          instructor: string;
          enrolledAt: string | null;
        }>;

        if (cancelled) return;

        const mappedActive: ActiveCourse[] = courses.map((c) => ({
          id: c.courseId,
          title: c.title,
          instructor: c.instructor,
          // Real progress tracking not implemented yet; default to 0%
          progressPercent: 0,
          nextLesson: "Start this course",
        }));

        const mappedUpcoming: UpcomingItem[] = courses.map((c, index) => ({
          id: c.enrollmentId,
          courseTitle: c.title,
          label: "Continue learning",
          due: index === 0 ? "Today" : "Soon",
        }));

        setActiveCourses(mappedActive);
        setUpcomingDeadlines(mappedUpcoming);
      } catch {
        if (!cancelled) setError("Failed to load enrollments");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-xl font-semibold text-gray-900">My learning</h1>
        <p className="mt-1 text-sm text-gray-600">
          Resume your in-progress courses and keep an eye on upcoming work.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="lg:col-span-2 space-y-3">
          <h2 className="text-sm font-semibold text-gray-900">In-progress courses</h2>
          {loading ? (
            <p className="text-sm text-gray-600">Loading your courses...</p>
          ) : error ? (
            <p className="text-sm font-semibold text-red-600">{error}</p>
          ) : activeCourses.length === 0 ? (
            <p className="text-sm text-gray-600">
              You are not enrolled in any courses yet.
            </p>
          ) : (
            activeCourses.map((course) => (
              <article
                key={course.id}
                className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{course.title}</h3>
                    <p className="text-xs text-gray-500">By {course.instructor}</p>
                    <p className="mt-1 text-xs text-gray-600">
                      Next up: {course.nextLesson}
                    </p>
                  </div>
                  <div className="mt-2 w-full sm:mt-0 sm:w-48">
                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <span>Progress</span>
                      <span>{course.progressPercent}%</span>
                    </div>
                    <div className="mt-1 h-1.5 w-full rounded-full bg-gray-100">
                      <div
                        className="h-1.5 rounded-full bg-emerald-500"
                        style={{ width: `${course.progressPercent}%` }}
                      />
                    </div>
                    <button className="mt-2 w-full rounded border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-100">
                      Go to course
                    </button>
                  </div>
                </div>
              </article>
            ))
          )}
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-gray-900">Upcoming</h2>
          <div className="space-y-2 text-sm">
            {loading ? (
              <p className="text-xs text-gray-600">Loading upcoming items...</p>
            ) : upcomingDeadlines.length === 0 ? (
              <p className="text-xs text-gray-600">
                No upcoming items yet. Enroll in a course to get started.
              </p>
            ) : (
              upcomingDeadlines.map((item) => (
                <div
                  key={item.id}
                  className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2"
                >
                  <p className="text-xs font-medium text-gray-500">{item.due}</p>
                  <p className="mt-0.5 text-sm font-semibold text-gray-900">
                    {item.label}
                  </p>
                  <p className="mt-0.5 text-xs text-gray-600">
                    {item.courseTitle}
                  </p>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
