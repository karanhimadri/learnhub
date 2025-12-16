//src/components/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  Settings,
  PlusCircle,
  User,
  LogOut
} from "lucide-react";

export const sidebarFeatures = {
  admin: {
    role: "Admin",
    icon: Settings,
    color: "teal",
    features: [
      {
        name: "Dashboard",
        route: "/dashboard/admin",
        description: "Platform overview",
        icon: LayoutDashboard,
      },
      {
        name: "Instructors",
        route: "/dashboard/admin/instructors",
        description: "Approve & manage",
        icon: GraduationCap,
      },
      {
        name: "All Courses",
        route: "/dashboard/admin/courses",
        description: "Course management",
        icon: BookOpen,
      },
      {
        name: "Settings",
        route: "/dashboard/admin/settings",
        description: "Configuration",
        icon: Settings,
      },
    ],
  },

  instructor: {
    role: "Instructor",
    icon: GraduationCap,
    color: "emerald",
    features: [
      {
        name: "Dashboard",
        route: "/dashboard/instructor",
        description: "Your overview",
        icon: LayoutDashboard,
      },
      {
        name: "My Courses",
        route: "/dashboard/instructor/courses",
        description: "Manage courses",
        icon: BookOpen,
      },
      {
        name: "Create Course",
        route: "/dashboard/instructor/create",
        description: "Add new course",
        icon: PlusCircle,
      },
      {
        name: "Profile",
        route: "/dashboard/instructor/profile",
        description: "Your settings",
        icon: User,
      },
    ],
  },

  learner: {
    role: "Learner",
    icon: BookOpen,
    color: "green",
    features: [
      {
        name: "Dashboard",
        route: "/dashboard/learner",
        description: "Learning overview",
        icon: LayoutDashboard,
      },
      {
        name: "My Learning",
        route: "/dashboard/learner/my-learning",
        description: "Enrolled courses",
        icon: GraduationCap,
      },
      {
        name: "Profile",
        route: "/dashboard/learner/profile",
        description: "Account settings",
        icon: User,
      },
    ],
  },
} as const;

type RoleKey = keyof typeof sidebarFeatures;

const roleColors = {
  admin: {
    bg: "bg-teal-100",
    text: "text-teal-700",
    activeBg: "bg-teal-50",
    activeBorder: "border-teal-500",
    activeText: "text-teal-700",
    buttonActive: "bg-teal-600",
  },
  instructor: {
    bg: "bg-emerald-100",
    text: "text-emerald-700",
    activeBg: "bg-emerald-50",
    activeBorder: "border-emerald-500",
    activeText: "text-emerald-700",
    buttonActive: "bg-emerald-600",
  },
  learner: {
    bg: "bg-green-100",
    text: "text-green-700",
    activeBg: "bg-green-50",
    activeBorder: "border-green-500",
    activeText: "text-green-700",
    buttonActive: "bg-green-600",
  },
};

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const role: RoleKey = (user?.role as RoleKey) || "learner";
  const current = sidebarFeatures[role];
  const colors = roleColors[role];

  return (
    <aside className="w-64 shrink-0">
      <div className="sticky top-20 flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        {/* Role Selector */}
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            View As <span className="text-black font-semibold">{current.role ? current.role.toUpperCase() : ""}</span>
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1">
          {current.features.map((feature, index) => {
            const Icon = feature.icon;
            const href = feature.route;
            const isDashboardItem = index === 0;

            const isActive =
              pathname === feature.route ||
              (!isDashboardItem && pathname.startsWith(`${feature.route}/`));
            return (
              <Link
                key={feature.route}
                href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${isActive
                  ? `${colors.activeBg} ${colors.activeText} border-l-2 ${colors.activeBorder} -ml-px`
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
              >
                <Icon className={`h-4.5 w-4.5 ${isActive ? colors.activeText : "text-gray-400"}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{feature.name}</p>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-3 border-t border-gray-100">
          <button
            type="button"
            onClick={async () => {
              await logout();
              router.push("/");
            }}
            className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <LogOut className="h-4.5 w-4.5" />
            <span className="text-sm font-medium">Sign Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
}

