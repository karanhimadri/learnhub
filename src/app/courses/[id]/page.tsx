"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

type PublicCourseDetail = {
  id: string;
  title: string;
  instructor: string;
  skills: string[];
  level: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  duration: string;
  price: number;
  rating: number;
  ratingCount: number;
};

export default function Course() {
  const params = useParams();
  const id = params?.id as string | undefined;

  const [course, setCourse] = useState<PublicCourseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [enrolling, setEnrolling] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (!id) return;

    let cancelled = false;

    const load = async () => {
      try {
        const res = await fetch(`/api/courses/${id}`);
        const data = await res.ok ? await res.json() : null;

        if (!cancelled) {
          if (!res.ok) throw new Error();
          setCourse(data.course);
        }
      } catch {
        if (!cancelled) setError("Failed to load course details");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  return (
    <div className="min-h-screen bg-green-50">
      {/* HEADER */}
      <section className="border-b border-green-100 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-widest text-green-700">
            COURSE DETAILS
          </p>

          <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Title */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                {loading ? "Loading..." : course?.title || "Course not found"}
              </h1>

              {course && (
                <p className="mt-1 text-sm text-gray-600">
                  By{" "}
                  <span className="font-semibold text-green-700">
                    {course.instructor}
                  </span>
                </p>
              )}
            </div>

            {/* Enroll Button */}
            {course && (
              <button
                type="button"
                disabled={enrolling}
                onClick={async () => {
                  if (!id || enrolling) return;

                  setEnrolling(true);
                  setError(null);

                  try {
                    const res = await fetch("/api/enrollments", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({ courseId: id }),
                    });

                    const data = await res.json().catch(() => null);

                    if (!res.ok) {
                      const message =
                        (data && data.message) || "Failed to enroll";
                      setError(message);
                      return;
                    }

                    router.push("/dashboard");
                  } catch {
                    setError("Failed to enroll");
                  } finally {
                    setEnrolling(false);
                  }
                }}
                className="inline-flex items-center justify-center rounded-md bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-75"
              >
                {enrolling ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enrolling...
                  </>
                ) : (
                  "Enroll Now"
                )}
              </button>
            )}
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {loading ? (
          <p className="text-sm text-gray-600">Loading course details...</p>
        ) : error ? (
          <p className="text-sm font-semibold text-red-600">{error}</p>
        ) : !course ? (
          <p className="text-sm text-gray-600">Course not found.</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-[2fr,1fr]">
            {/* MAIN */}
            <div className="space-y-5">
              <div className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                {course.level} · {course.category}
              </div>

              <p className="text-sm text-gray-700">
                Duration:{" "}
                <span className="font-medium">{course.duration}</span>
              </p>

              <p className="text-sm text-gray-700">
                Rating:{" "}
                <span className="font-semibold">
                  {course.rating.toFixed(1)}
                </span>{" "}
                <span className="text-gray-500">
                  ({course.ratingCount} reviews)
                </span>
              </p>

              {course.skills.length > 0 && (
                <div>
                  <h2 className="text-sm font-semibold text-gray-900">
                    Skills you&apos;ll gain
                  </h2>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {course.skills.map((skill) => (
                      <li
                        key={skill}
                        className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-800"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* SIDEBAR */}
            <aside className="rounded-lg border border-green-100 bg-white p-5 shadow-sm">
              <p className="text-2xl font-bold text-green-700">
                {course.price === 0 ? "Free" : `₹${course.price.toFixed(2)}`}
              </p>

              <p className="mt-1 text-xs text-gray-500">
                One-time access · Full course
              </p>

              <p className="mt-4 text-[11px] text-gray-500">
                Enrollment functionality will be added later.
              </p>
            </aside>
          </div>
        )}
      </section>
    </div>
  );
}
