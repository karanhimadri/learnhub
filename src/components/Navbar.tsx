"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, GraduationCap } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/dashboard", label: "Dashboard" },
];

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const isActive = href.startsWith("/dashboard")
    ? pathname.startsWith("/dashboard")
    : pathname === href;

  return (
    <Link
      href={href}
      className={`relative px-4 py-2 text-sm font-medium transition-colors ${isActive
        ? "text-green-600"
        : "text-gray-600 hover:text-green-600"
        }`}
    >
      {label}
      {isActive && (
        <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-green-600 rounded-full" />
      )}
    </Link>
  );
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();

  const avatarSeed = user?.name || user?.email || "Guest";
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    avatarSeed
  )}&background=random&color=fff&size=128`;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-green-500 to-emerald-600 shadow-lg shadow-green-500/30">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-gray-900">LearnHub</span>
              <span className="text-[10px] font-medium text-gray-500 -mt-1">Course Platform</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const resolvedHref =
                link.href === "/dashboard" && user?.role
                  ? `/dashboard/${user.role}`
                  : link.href;

              return (
                <NavLink
                  key={link.href}
                  href={resolvedHref}
                  label={link.label}
                />
              );
            })}
          </nav>

          {/* Desktop Auth / Profile */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-3 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <span className="relative inline-flex h-8 w-8 overflow-hidden rounded-full bg-green-100">
                  <Image
                    src={avatarUrl}
                    alt={user.name}
                    width={32}
                    height={32}
                    className="h-full w-full object-cover"
                  />
                </span>
                <span className="flex flex-col items-start leading-tight">
                  <span className="text-xs text-gray-500">Signed in as</span>
                  <span className="text-sm font-semibold text-gray-900 truncate max-w-35">
                    {user.name}
                  </span>
                </span>
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-green-600 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-green-700 hover:shadow-md"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const resolvedHref =
                  link.href === "/dashboard" && user?.role
                    ? `/dashboard/${user.role}`
                    : link.href;

                return (
                  <Link
                    key={link.href}
                    href={resolvedHref}
                    className="px-4 py-3 text-sm font-medium text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <hr className="my-3 border-gray-100" />
              {user ? (
                <button
                  type="button"
                  className="mx-4 flex items-center gap-3 rounded-lg bg-gray-50 px-4 py-3 text-sm font-medium text-gray-800 hover:bg-gray-100 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="inline-flex h-9 w-9 overflow-hidden rounded-full bg-green-100">
                    <Image
                      src={avatarUrl}
                      alt={user.name}
                      width={36}
                      height={36}
                      className="h-full w-full object-cover"
                    />
                  </span>
                  <span className="flex flex-col items-start leading-tight">
                    <span className="text-[11px] uppercase tracking-wide text-gray-500">Signed in</span>
                    <span className="text-sm font-semibold text-gray-900 truncate max-w-40">
                      {user.name}
                    </span>
                  </span>
                </button>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="px-4 py-3 text-sm font-medium text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className="mx-4 mt-2 text-center rounded-lg bg-green-600 px-4 py-3 text-sm font-semibold text-white hover:bg-green-700 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

