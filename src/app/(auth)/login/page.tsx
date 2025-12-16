"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Lock, Mail, ArrowRight, CheckCircle2, Eye, EyeOff } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

type Role = "learner" | "instructor" | "admin";

const ROLE_CONFIG = {
  learner: {
    label: "Learner",
    primaryLabel: "Email address",
    placeholder: "learner@example.com",
  },
  instructor: {
    label: "Instructor",
    primaryLabel: "Email address",
    placeholder: "instructor@example.com",
  },
  admin: {
    label: "Admin",
    primaryLabel: "Admin email",
    placeholder: "admin@platform.com",
  },
} as const;

export default function LoginPage() {
  const [role, setRole] = useState<Role>("learner");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const router = useRouter();

  const { login, loading } = useAuth();

  const roleConfig = ROLE_CONFIG[role];

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(null);

    if (!email.trim()) {
      toast.error("Email is required");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Enter a valid email address");
      return;
    }

    if (!password.trim()) {
      toast.error("Password is required");
      return;
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    try {
      await login({ email, password });

      toast.success(`Signed in successfully as ${roleConfig.label}`);
      setStatus(`Signed in successfully as ${roleConfig.label}`);
      router.push("/dashboard")
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "Failed to sign in");
      } else {
        toast.error("Failed to sign in");
      }
    }
  };


  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-4xl rounded-2xl border border-gray-200 bg-white shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">

          {/* LEFT INFO PANEL */}
          <aside className="border-b bg-linear-to-br from-green-600 to-emerald-700 p-8 text-white md:border-b-0 md:border-r">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-green-100">
              LearnHub Platform
            </p>

            <h1 className="mt-4 text-3xl font-bold">
              Sign in to your learning space
            </h1>

            <p className="mt-3 text-sm text-emerald-100">
              Access personalized dashboards for learners, instructors, and admins. Track progress, manage courses, and grow your skills.
            </p>

            <div className="mt-8 space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-100" />
                <div>
                  <p className="font-semibold">Multi-role access</p>
                  <p className="text-emerald-100">
                    Tailored views for learners, instructors, and administrators in one place.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-100" />
                <div>
                  <p className="font-semibold">Secure & reliable</p>
                  <p className="text-emerald-100">
                    Enterprise-grade security with 24/7 access to your learning journey.
                  </p>
                </div>
              </div>
            </div>
          </aside>

          {/* RIGHT FORM PANEL */}
          <section className="p-8">
            <div className="mb-6 inline-flex rounded-full border border-gray-200 bg-gray-50 p-1 text-xs font-semibold uppercase tracking-wide">
              <button className="rounded-full bg-green-600 px-5 py-2 text-white">
                Sign in
              </button>
              <Link
                href="/register"
                className="px-5 py-2 text-gray-500 hover:text-gray-900"
              >
                Create account
              </Link>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* ROLE SELECT */}
              <div>
                <p className="text-[11px] font-semibold tracking-[0.25em] text-green-600 uppercase">
                  Select role
                </p>

                <div className="mt-2 inline-flex rounded-full border border-gray-200 bg-gray-50 p-1">
                  {(Object.keys(ROLE_CONFIG) as Role[]).map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => {
                        setRole(key);
                        setStatus(null);
                      }}
                      className={`rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wide ${role === key
                        ? "bg-green-600 text-white"
                        : "text-gray-600 hover:text-gray-900"
                        }`}
                    >
                      {ROLE_CONFIG[key].label}
                    </button>
                  ))}
                </div>
              </div>

              {/* PRIMARY INPUT */}
              <div>
                <label className="flex items-center gap-1 text-[11px] font-semibold tracking-[0.25em] text-gray-700 uppercase">
                  <Mail className="h-3.5 w-3.5 text-green-600" />
                  {roleConfig.primaryLabel}
                </label>

                <input
                  type="email"
                  placeholder={roleConfig.placeholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                />
              </div>

              {/* PASSWORD */}
              <div>
                <label className="flex items-center gap-1 text-[11px] font-semibold tracking-[0.25em] text-gray-700 uppercase">
                  <Lock className="h-3.5 w-3.5 text-green-600" />
                  Password
                </label>

                <div className="mt-2 relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-10 text-sm text-gray-900 placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                    placeholder="••••••••"
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

              {/* OPTIONS */}
              <div className="flex items-center justify-between text-xs text-gray-600">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  Keep me signed in
                </label>

                <button type="button" className="font-medium text-green-600 hover:text-green-700">
                  Forgot password?
                </button>
              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white hover:bg-green-700 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? "Signing in..." : "Sign in"}
                <ArrowRight className="h-4 w-4" />
              </button>

              {status && (
                <p className="text-xs font-semibold text-green-700">
                  {status}
                </p>
              )}

              <p className="text-xs text-gray-500">
                By continuing, you agree to the platform terms and privacy policy.
              </p>
            </form>
          </section>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
