// src/app/dashboard/admin/settings/page.tsx
"use client";

import { Moon, Sun } from "lucide-react";
import { useState } from "react";

export default function AdminSettings() {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="max-w-3xl px-4 py-8">
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4">
          <h1 className="text-lg font-semibold text-gray-900">Settings</h1>
          <p className="text-sm text-gray-500">
            Manage your application preferences
          </p>
        </div>

        {/* Dark Mode Toggle */}
        <div className="flex items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 text-teal-700">
              {enabled ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </div>

            <div>
              <p className="text-sm font-medium text-gray-900">Dark Mode</p>
              <p className="text-xs text-gray-500">
                Toggle between light and dark theme
              </p>
            </div>
          </div>

          {/* 🔘 Rounded Toggle */}
          <button
            onClick={() => setEnabled(!enabled)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded transition-colors duration-300 focus:outline-none ${
              enabled ? "bg-teal-600" : "bg-gray-300"
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-1 ring-black/5 transition duration-300 ease-in-out ${
                enabled ? "translate-x-5" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
