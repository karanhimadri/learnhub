import { LayoutDashboard, Users, BookOpen, GraduationCap, ArrowUpRight, ShieldCheck } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
            <LayoutDashboard className="h-6 w-6 text-green-600" />
            Admin Dashboard
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Monitor platform health, manage instructors and courses, and keep learners engaged.
          </p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
          <ShieldCheck className="h-3.5 w-3.5" />
          Admin view
        </span>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Total learners</p>
          <div className="mt-2 flex items-end justify-between">
            <p className="text-2xl font-bold text-gray-900">1,248</p>
            <span className="text-xs font-medium text-green-600">+8% this month</span>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Active instructors</p>
          <div className="mt-2 flex items-end justify-between">
            <p className="text-2xl font-bold text-gray-900">32</p>
            <span className="text-xs font-medium text-green-600">+3 new</span>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Published courses</p>
          <div className="mt-2 flex items-end justify-between">
            <p className="text-2xl font-bold text-gray-900">87</p>
            <span className="text-xs font-medium text-gray-500">12 in review</span>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Completion rate</p>
          <div className="mt-2 flex items-end justify-between">
            <p className="text-2xl font-bold text-gray-900">78%</p>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600">
              <ArrowUpRight className="h-3 w-3" />
              +4% vs last month
            </span>
          </div>
        </div>
      </div>

      {/* Two-column content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left: recent activity */}
        <div className="space-y-4 lg:col-span-2">
          <h2 className="text-sm font-semibold text-gray-800">Recent platform activity</h2>
            <div className="divide-y divide-gray-100 rounded-xl border border-gray-200 bg-gray-50">
              <div className="flex items-center gap-3 px-4 py-3">
                <GraduationCap className="h-4 w-4 text-green-600" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">New instructor Jane Smith approved</p>
                  <p className="text-xs text-gray-500">2 minutes ago • Instructor Management</p>
                </div>
              </div>

              <div className="flex items-center gap-3 px-4 py-3">
                <BookOpen className="h-4 w-4 text-indigo-600" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">Course Modern React Patterns submitted for review</p>
                  <p className="text-xs text-gray-500">18 minutes ago • Courses</p>
                </div>
              </div>

            <div className="flex items-center gap-3 px-4 py-3">
              <Users className="h-4 w-4 text-amber-600" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">54 new learners enrolled this week</p>
                <p className="text-xs text-gray-500">Today • Enrollments</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: quick actions */}
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-gray-800">Quick admin actions</h2>
          <div className="space-y-3 rounded-xl border border-gray-200 bg-gray-50 p-4">
            <button
              type="button"
              className="flex w-full items-center justify-between rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-700"
            >
              Approve new instructors
              <ArrowUpRight className="h-4 w-4" />
            </button>

            <button
              type="button"
              className="flex w-full items-center justify-between rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-gray-800 shadow-sm hover:bg-gray-100 border border-gray-200"
            >
              Review pending courses
              <ArrowUpRight className="h-4 w-4 text-gray-500" />
            </button>

            <button
              type="button"
              className="flex w-full items-center justify-between rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-gray-800 shadow-sm hover:bg-gray-100 border border-gray-200"
            >
              View platform analytics
              <ArrowUpRight className="h-4 w-4 text-gray-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
