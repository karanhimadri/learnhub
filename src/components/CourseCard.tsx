import Link from "next/link";
import { Star } from "lucide-react";

type CourseCardProps = {
  id: number | string;
  title: string;
  instructor: string;
  skills: string[];
  level: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  duration: string;
  price: number;
  rating?: number;
  ratingCount?: number;
};

function formatReviewCount(count: number): string {
  if (count >= 1_000_000) {
    return `${(count / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  }
  if (count >= 1_000) {
    return `${Math.round(count / 100) / 10}K`;
  }
  return count.toString();
}

function getInitials(name: string): string {
  if (!name) return "";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

export default function CourseCard(props: CourseCardProps) {
  const {
    id,
    title,
    instructor,
    skills,
    level,
    duration,
    rating,
    ratingCount,
  } = props;

  const displayRating = rating ?? 4.7;
  const displayRatingCount = formatReviewCount(ratingCount ?? 22000);
  const initials = getInitials(instructor);

  const skillsPreview = skills.slice(0, 6).join(", ");

  return (
    <Link href={`/courses/${id}`} className="group block h-full">
      <article className="flex min-h-56 h-full flex-col justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-green-500 hover:shadow-md">
        {/* Top content */}
        <div>
          {/* Instructor */}
          <div className="mb-2 flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded bg-green-600 text-[11px] font-semibold uppercase text-white">
              {initials}
            </div>
            <p className="truncate text-xs font-medium text-gray-700">
              {instructor}
            </p>
          </div>

          {/* Title */}
          <h3 className="mb-2 line-clamp-2 text-sm font-semibold leading-snug text-gray-900 group-hover:text-green-700">
            {title}
          </h3>

          {/* Skills */}
          {skillsPreview && (
            <p className="mt-2 line-clamp-2 text-xs text-gray-600">
              <span className="font-medium text-gray-700">
                Skills you&apos;ll gain:
              </span>{" "}
              {skillsPreview}
            </p>
          )}
        </div>

        {/* Bottom meta */}
        <div className="mt-4 space-y-1 text-xs">
          {/* Rating */}
          <div className="flex items-center gap-2 whitespace-nowrap">
            <span className="inline-flex items-center gap-1 text-gray-900">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">
                {displayRating.toFixed(1)}
              </span>
            </span>

            <span className="text-gray-400">•</span>

            <span className="text-gray-600">
              {displayRatingCount} reviews
            </span>

            {/* Accessibility text */}
            <span className="sr-only">
              {displayRating.toFixed(1)} out of 5 stars
            </span>
          </div>

          {/* Course meta */}
          <div className="font-medium text-gray-700">
            {level} · Course · {duration}
          </div>
        </div>
      </article>
    </Link>
  );
}
