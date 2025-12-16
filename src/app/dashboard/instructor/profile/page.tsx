"use client";

import { FormEvent, useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function InstructorProfile() {
  const { user, changePassword, loading, error } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    setSuccessMessage(null);

    if (!currentPassword || !newPassword || !confirmPassword) {
      setLocalError("All password fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      setLocalError("New password and confirmation do not match");
      return;
    }

    if (newPassword.length < 6) {
      setLocalError("New password must be at least 6 characters");
      return;
    }

    try {
      await changePassword({ currentPassword, newPassword });
      setSuccessMessage("Password updated successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      // handled in hook
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 text-gray-900">
      <div className="mx-auto max-w-3xl space-y-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Instructor Profile
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            View your basic details and securely update your password.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Basic Info */}
          <section className="rounded border border-gray-200 bg-white px-6 py-5">
            <h2 className="mb-4 text-sm font-medium uppercase tracking-wide text-gray-500">
              Basic Information
            </h2>

            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-500">Name</p>
                <p className="font-medium text-gray-900">
                  {user?.name || "-"}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Email</p>
                <p className="break-all font-medium text-gray-900">
                  {user?.email || "-"}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Role</p>
                <span className="inline-flex items-center rounded border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
                  {user?.role || "-"}
                </span>
              </div>
            </div>
          </section>

          {/* Change Password */}
          <section className="rounded border border-gray-200 bg-white px-6 py-5">
            <h2 className="mb-4 text-sm font-medium uppercase tracking-wide text-gray-500">
              Change Password
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              <div className="space-y-1.5">
                <label className="block text-gray-600" htmlFor="currentPassword">
                  Current password
                </label>
                <input
                  id="currentPassword"
                  type="password"
                  className="w-full rounded border border-gray-300 px-3 py-2 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-gray-600" htmlFor="newPassword">
                  New password
                </label>
                <input
                  id="newPassword"
                  type="password"
                  className="w-full rounded border border-gray-300 px-3 py-2 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <label
                  className="block text-gray-600"
                  htmlFor="confirmPassword"
                >
                  Confirm new password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  className="w-full rounded border border-gray-300 px-3 py-2 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              {(localError || error) && (
                <p className="text-xs text-red-600">
                  {localError || error}
                </p>
              )}

              {successMessage && !error && (
                <p className="text-xs text-emerald-600">
                  {successMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center rounded border border-emerald-600 bg-emerald-600 px-4 py-2 text-xs font-medium uppercase tracking-wide text-white hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Updating..." : "Update Password"}
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
