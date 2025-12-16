export default function LearnerMyLearningPage() {
  const activeCourses = [
    {
      id: "course-1",
      title: "Introduction to Artificial Intelligence",
      instructor: "Arjun Singh",
      progressPercent: 45,
      nextLesson: "Search algorithms and problem solving",
    },
    {
      id: "course-2",
      title: "React Fundamentals with TypeScript",
      instructor: "Riya Sharma",
      progressPercent: 80,
      nextLesson: "State management patterns",
    },
  ];

  const upcomingDeadlines = [
    {
      id: "dl-1",
      courseTitle: "Introduction to Artificial Intelligence",
      label: "Quiz on Week 2 content",
      due: "Tomorrow",
    },
    {
      id: "dl-2",
      courseTitle: "React Fundamentals with TypeScript",
      label: "Project: Build a course catalog UI",
      due: "In 5 days",
    },
  ];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-xl font-semibold text-gray-900">My learning</h1>
        <p className="mt-1 text-sm text-gray-600">
          Resume your in-progress courses and keep an eye on upcoming work.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="lg:col-span-2 space-y-3">
          <h2 className="text-sm font-semibold text-gray-900">In-progress courses</h2>
          {activeCourses.map((course) => (
            <article
              key={course.id}
              className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{course.title}</h3>
                  <p className="text-xs text-gray-500">By {course.instructor}</p>
                  <p className="mt-1 text-xs text-gray-600">
                    Next up: {course.nextLesson}
                  </p>
                </div>
                <div className="mt-2 w-full sm:mt-0 sm:w-48">
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>Progress</span>
                    <span>{course.progressPercent}%</span>
                  </div>
                  <div className="mt-1 h-1.5 w-full rounded-full bg-gray-100">
                    <div
                      className="h-1.5 rounded-full bg-emerald-500"
                      style={{ width: `${course.progressPercent}%` }}
                    />
                  </div>
                  <button className="mt-2 w-full rounded border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-100">
                    Go to course
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-gray-900">Upcoming</h2>
          <div className="space-y-2 text-sm">
            {upcomingDeadlines.map((item) => (
              <div
                key={item.id}
                className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2"
              >
                <p className="text-xs font-medium text-gray-500">{item.due}</p>
                <p className="mt-0.5 text-sm font-semibold text-gray-900">
                  {item.label}
                </p>
                <p className="mt-0.5 text-xs text-gray-600">
                  {item.courseTitle}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
