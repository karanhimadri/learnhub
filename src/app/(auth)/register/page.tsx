"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import {
  UserPlus,
  Mail,
  Lock,
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
} from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from "@/hooks/useAuth";


const COPY = {
  title: "Join your learning platform",
  subtitle:
    "Create an account to access courses, collaborate with teams, and grow your skills.",
  benefits: [
    "Access tailored learning paths",
    "Track progress and certifications",
    "Learn from expert instructors",
  ],
};

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { register, loading } = useAuth();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!fullName.trim()) {
      toast.error("Full name is required");
      return;
    } else if (fullName.trim().length < 2) {
      toast.error("Full name must be at least 2 characters");
      return;
    }

    if (!email.trim()) {
      toast.error("Email is required");
      return;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Enter a valid email address");
      return;
    }

    if (!password.trim()) {
      toast.error("Password is required");
      return;
    } else if (password.length < 8) {
      toast.error("Password must be at least 8 characters")
      return;
    }

    try {
      await register({
        name: fullName,
        email,
        password,
      });

      toast.success("Account created successfully");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "Failed to create account");
      } else {
        toast.error("Failed to create account");
      }
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-4xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* LEFT */}
          <aside className="border-b bg-linear-to-br from-green-600 to-emerald-700 p-8 text-white md:border-b-0 md:border-r">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-green-100">
              LearnHub Platform
            </p>

            <h1 className="mt-4 text-3xl font-bold">{COPY.title}</h1>

            <p className="mt-3 text-sm text-emerald-100">{COPY.subtitle}</p>

            <ul className="mt-8 space-y-3 text-sm text-emerald-50">
              {COPY.benefits.map((item) => (
                <li key={item} className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-100" />
                  {item}
                </li>
              ))}
            </ul>
          </aside>

          {/* RIGHT */}
          <section className="p-8">
            <div className="mb-6 inline-flex rounded-full border border-gray-200 bg-gray-50 p-1 text-xs font-semibold uppercase tracking-wide">
              <Link
                href="/login"
                className="px-5 py-2 text-gray-500 hover:text-gray-900"
              >
                Sign in
              </Link>
              <span className="rounded-full bg-green-600 px-5 py-2 text-white">
                Create account
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-gray-700">
                  <UserPlus className="h-3.5 w-3.5 text-green-600" />
                  Full name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder="John Doe"
                />
              </div>

              {/* Email */}
              <div>
                <label className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-gray-700">
                  <Mail className="h-3.5 w-3.5 text-green-600" />
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder="john@example.com"
                />
              </div>

              {/* Password */}
              <div>
                <label className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-gray-700">
                  <Lock className="h-3.5 w-3.5 text-green-600" />
                  Password
                </label>
                <div className="relative mt-2">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-10 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                    placeholder="Create a secure password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-green-700 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? "Creating account..." : "Create account"}
                <ArrowRight className="h-4 w-4" />
              </button>
              <p className="text-xs text-gray-500">
                By creating an account, you agree to our terms and privacy policy.
              </p>
            </form>
          </section>
        </div>
      </div>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </div>
  );
}
