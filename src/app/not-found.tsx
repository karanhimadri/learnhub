import Link from "next/link";
import { AlertTriangle, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        {/* Icon */}
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600">
          <AlertTriangle className="h-7 w-7" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-gray-900">
          Page Not Found
        </h1>

        {/* Description */}
        <p className="mt-2 text-sm text-gray-600">
          The page you are looking for doesn’t exist or has been moved.
        </p>

        {/* Divider */}
        <div className="my-6 h-px bg-gray-200" />

        {/* Actions */}
        <div className="flex justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Home
          </Link>

          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
