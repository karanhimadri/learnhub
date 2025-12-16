"use client";

import { useEffect, useState } from "react";
import { useCourse, InstructorCourseStats } from "@/hooks/useCourse";
import {
  BarChart3,
  BookOpenCheck,
  Eye,
  EyeOff,
  IndianRupee,
  Layers,
} from "lucide-react";

export default function InstructorDashboard() {
  const { fetchInstructorStats, error } = useCourse();
  const [stats, setStats] = useState<InstructorCourseStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const data = await fetchInstructorStats();
        if (!cancelled) {
          setStats(data);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [fetchInstructorStats]);

  const summary = stats || {
    total: 0,
    public: 0,
    draft: 0,
    free: 0,
    paid: 0,
  };

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            Instructor overview
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Track your published, draft, free and paid courses at a glance.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600">
          <BarChart3 className="h-3.5 w-3.5 text-green-600" />
          Instructor dashboard
        </div>
      </header>

      {loading ? (
        <p className="text-sm text-gray-500">Loading course stats…</p>
      ) : error ? (
        <p className="text-sm font-semibold text-red-600">{error}</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                Total courses
              </p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {summary.total}
              </p>
            </div>
            <Layers className="h-6 w-6 text-green-600" />
          </div>

          <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                Published
              </p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {summary.public}
              </p>
            </div>
            <Eye className="h-6 w-6 text-green-600" />
          </div>

          <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                Drafts
              </p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {summary.draft}
              </p>
            </div>
            <EyeOff className="h-6 w-6 text-gray-500" />
          </div>

          <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                Free / Paid
              </p>
              <p className="mt-1 text-base font-semibold text-gray-900">
                {summary.free} free · {summary.paid} paid
              </p>
            </div>
            <div className="flex flex-col items-center gap-1 text-green-700">
              <BookOpenCheck className="h-5 w-5" />
              <IndianRupee className="h-4 w-4" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
