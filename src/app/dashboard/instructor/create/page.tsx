"use client";

import { FormEvent, useState } from "react";
import { CourseProvider, useCourse } from "@/hooks/useCourse";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const LEVELS = ["Beginner", "Intermediate", "Advanced"] as const;

function CreateCourseForm() {
  const { createCourse, creating, error } = useCourse();
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [skillsInput, setSkillsInput] = useState("");
  const [level, setLevel] = useState<(typeof LEVELS)[number]>("Beginner");
  const [category, setCategory] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("0");
  const [isPublic, setIsPublic] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSuccess(null);

    const skills = skillsInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const numericPrice = Number(price);

    await createCourse({
      title,
      instructor: user?.name ?? "",
      skills,
      level,
      category,
      duration,
      price: Number.isNaN(numericPrice) ? 0 : numericPrice,
      isPublic,
    });

    setSuccess("Course created successfully");
    setTitle("");
    setSkillsInput("");
    setCategory("");
    setDuration("");
    setPrice("0");
    setIsPublic(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-gray-900">Create a new course</h1>
        <p className="mt-1 text-sm text-gray-600">
          Define the course details. You can manage visibility later from your instructor dashboard.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold uppercase tracking-wide text-gray-700">
            Course title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
            placeholder="e.g. Introduction to Artificial Intelligence (AI)"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-gray-700">
            Instructor name
          </label>
          <input
            type="text"
            value={user?.name ?? ""}
            readOnly
            required
            className="mt-1 w-full rounded-lg border border-gray-300 bg-gray-100 px-3 py-2 text-sm text-gray-700"
            placeholder="Instructor name"
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
            placeholder="e.g. Artificial Intelligence"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-gray-700">
            Level
          </label>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value as (typeof LEVELS)[number])}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
          >
            {LEVELS.map((lvl) => (
              <option key={lvl} value={lvl}>
                {lvl}
              </option>
            ))}
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
          <p className="mt-1 text-xs text-gray-500">Set 0 for a free course.</p>
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
            placeholder="e.g. Responsible AI, Generative AI, NLP, Robotics"
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
          disabled={creating}
          className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {creating ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Creating...
            </>
          ) : (
            "Create course"
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

export default function CreateCoursePage() {
  return (
    <CourseProvider>
      <CreateCourseForm />
    </CourseProvider>
  );
}
