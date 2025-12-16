"use client";

import { useEffect, useMemo, useState, FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  CourseProvider,
  useCourse,
  InstructorCourse,
  UpdateCourseInput,
} from "@/hooks/useCourse";
import { CheckCircle2, Loader2, ArrowLeft } from "lucide-react";

function parseSkillsToString(skills: string[] | undefined) {
  return (skills || []).join(", ");
}

function parseSkillsFromString(value: string): string[] {
  return value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function CourseEditor() {
  const router = useRouter();
  const params = useParams<{ courseId: string }>();
  const courseId = params?.courseId;

  const {
    fetchInstructorCourse,
    updateInstructorCourse,
    error,
  } = useCourse();

  const [initialCourse, setInitialCourse] = useState<InstructorCourse | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState<"Beginner" | "Intermediate" | "Advanced">(
    "Beginner"
  );
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("0");
  const [skillsInput, setSkillsInput] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  useEffect(() => {
    if (!courseId) return;

    let cancelled = false;

    const load = async () => {
      try {
        const course = await fetchInstructorCourse(courseId);
        if (cancelled) return;

        setInitialCourse(course);
        setTitle(course.title);
        setCategory(course.category);
        setLevel(course.level);
        setDuration(course.duration);
        setPrice(String(course.price));
        setSkillsInput(parseSkillsToString(course.skills));
        setIsPublic(course.isPublic);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [courseId, fetchInstructorCourse]);

  const hasChanges = useMemo(() => {
    if (!initialCourse) return false;

    const numericPrice = Number(price);

    return (
      title !== initialCourse.title ||
      category !== initialCourse.category ||
      level !== initialCourse.level ||
      duration !== initialCourse.duration ||
      !Object.is(numericPrice, initialCourse.price) ||
      isPublic !== initialCourse.isPublic ||
      parseSkillsFromString(skillsInput).join(",") !==
        (initialCourse.skills || []).join(",")
    );
  }, [
    initialCourse,
    title,
    category,
    level,
    duration,
    price,
    isPublic,
    skillsInput,
  ]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSuccess(null);

    if (!initialCourse || !courseId) return;

    if (!hasChanges) {
      return;
    }

    const updates: UpdateCourseInput = {};

    if (title !== initialCourse.title) updates.title = title;
    if (category !== initialCourse.category) updates.category = category;
    if (level !== initialCourse.level) updates.level = level;
    if (duration !== initialCourse.duration) updates.duration = duration;

    const numericPrice = Number(price);
    if (!Object.is(numericPrice, initialCourse.price)) {
      updates.price = Number.isNaN(numericPrice) ? initialCourse.price : numericPrice;
    }

    const nextSkills = parseSkillsFromString(skillsInput);
    if (nextSkills.join(",") !== (initialCourse.skills || []).join(",")) {
      updates.skills = nextSkills;
    }

    if (isPublic !== initialCourse.isPublic) updates.isPublic = isPublic;

    if (Object.keys(updates).length === 0) return;

    setSaving(true);
    try {
      const updated = await updateInstructorCourse(courseId, updates);
      setInitialCourse(updated);
      setSuccess("Course updated successfully");
    } finally {
      setSaving(false);
    }
  };

  if (!courseId) {
    return (
      <p className="text-sm text-red-600">Course id is missing in the URL.</p>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Loader2 className="h-4 w-4 animate-spin" />
        Loading course…
      </div>
    );
  }

  if (!initialCourse) {
    return (
      <p className="text-sm text-red-600">Course not found or you do not have access.</p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Edit course</h1>
          <p className="mt-1 text-sm text-gray-600">
            Update course details. Only changed fields will be saved.
          </p>
        </div>
        <button
          type="button"
          onClick={() => router.push("/dashboard/instructor/courses")}
          className="inline-flex items-center gap-1 rounded border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:border-gray-500"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to courses
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold uppercase tracking-wide text-gray-700">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-gray-700">
            Category
          </label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-gray-700">
            Level
          </label>
          <select
            value={level}
            onChange={(e) =>
              setLevel(e.target.value as "Beginner" | "Intermediate" | "Advanced")
            }
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-gray-700">
            Duration label
          </label>
          <input
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
            placeholder="e.g. 1 - 4 Weeks"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-gray-700">
            Price (INR)
          </label>
          <input
            type="number"
            min={0}
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold uppercase tracking-wide text-gray-700">
            Skills (comma separated)
          </label>
          <textarea
            value={skillsInput}
            onChange={(e) => setSkillsInput(e.target.value)}
            rows={2}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
          />
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-gray-100 pt-4">
        <label className="flex items-center gap-2 text-xs text-gray-700">
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
          />
          Make course public (visible to learners)
        </label>

        <button
          type="submit"
          disabled={saving || !hasChanges}
          className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {saving ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Saving...
            </>
          ) : (
            "Save changes"
          )}
        </button>
      </div>

      {error && (
        <p className="text-xs font-semibold text-red-600">{error}</p>
      )}

      {success && (
        <p className="flex items-center gap-1 text-xs font-semibold text-green-700">
          <CheckCircle2 className="h-3.5 w-3.5" />
          {success}
        </p>
      )}
    </form>
  );
}

export default function InstructorCoursePage() {
  return (
    <CourseProvider>
      <CourseEditor />
    </CourseProvider>
  );
}
