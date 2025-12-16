"use client";

import { useAuth } from "@/hooks/useAuth";

export default function LearnerProfilePage() {
  const { user } = useAuth();

  const learner = {
    name: user?.name || "Learner",
    email: user?.email || "-",
    memberSince: "March 2024",
    learningGoal: "Transition into an AI/ML role",
    totalLearningHours: 72,
    interests: ["Artificial Intelligence", "Machine Learning", "Frontend"],
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-xl font-semibold text-gray-900">Learner profile</h1>
        <p className="mt-1 text-sm text-gray-600">
          Review your learning preferences and personal details.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-3">
        <section className="md:col-span-2 rounded-lg border border-gray-200 bg-gray-50 px-4 py-4">
          <h2 className="text-sm font-semibold text-gray-900">Basic information</h2>
          <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-gray-500">Full name</dt>
              <dd className="mt-0.5 font-medium text-gray-900">{learner.name}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Email address</dt>
              <dd className="mt-0.5 font-medium text-gray-900 break-all">{learner.email}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Member since</dt>
              <dd className="mt-0.5 font-medium text-gray-900">{learner.memberSince}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Learning goal</dt>
              <dd className="mt-0.5 font-medium text-gray-900">{learner.learningGoal}</dd>
            </div>
          </dl>
        </section>

        <section className="rounded-lg border border-gray-200 bg-white px-4 py-4 text-sm">
          <h2 className="text-sm font-semibold text-gray-900">Learning summary</h2>
          <div className="mt-4 space-y-3">
            <div>
              <p className="text-gray-500">Total learning time</p>
              <p className="mt-0.5 text-lg font-semibold text-gray-900">
                {learner.totalLearningHours} hours
              </p>
            </div>
            <div>
              <p className="text-gray-500">Topics of interest</p>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {learner.interests.map((interest) => (
                  <span
                    key={interest}
                    className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
