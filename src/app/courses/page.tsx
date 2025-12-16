import CourseCard from "@/components/CourseCard";

const SAMPLE_COURSES = [
	{
		id: 1,
		title: "Introduction to Artificial Intelligence (AI)",
		instructor: "Arjun Singh",
		skills: [
			"Responsible AI",
			"Generative AI",
			"Natural Language Processing",
			"Robotics",
			"Business Logic",
			"Risk Mitigation",
		],
		level: "Beginner" as const,
		category: "Artificial Intelligence",
		duration: "1 - 4 Weeks",
		price: 0,
		rating: 4.7,
		ratingCount: 22000,
	},
	{
		id: 2,
		title: "Full-Stack Web Development with React & Node.js",
		instructor: "Riya Sharma",
		skills: [
			"HTML",
			"CSS",
			"JavaScript",
			"React",
			"Node.js",
			"REST APIs",
		],
		level: "Beginner" as const,
		category: "Web Development",
		duration: "3 - 6 Months",
		price: 79.99,
		rating: 4.8,
		ratingCount: 18000,
	},
	{
		id: 3,
		title: "Machine Learning Specialization",
		instructor: "Neha Patel",
		skills: [
			"Supervised Learning",
			"Unsupervised Learning",
			"Model Deployment",
			"TensorFlow",
			"Model Evaluation",
		],
		level: "Intermediate" as const,
		category: "Data Science",
		duration: "2 - 5 Months",
		price: 99.99,
		rating: 4.9,
		ratingCount: 32000,
	},
	{
		id: 4,
		title: "Cloud Computing with AWS",
		instructor: "Rahul Mehta",
		skills: [
			"AWS Fundamentals",
			"Cloud Architecture",
			"Security Best Practices",
			"Scalability",
		],
		level: "Intermediate" as const,
		category: "Cloud Computing",
		duration: "1 - 3 Months",
		price: 89.99,
		rating: 4.6,
		ratingCount: 15000,
	},
	{
		id: 5,
		title: "UI/UX Design Foundations",
		instructor: "Ananya Rao",
		skills: [
			"User Research",
			"Wireframing",
			"Prototyping",
			"Figma",
			"Design Systems",
		],
		level: "Beginner" as const,
		category: "Design",
		duration: "1 - 3 Months",
		price: 0,
		rating: 4.7,
		ratingCount: 12000,
	},
	{
		id: 6,
		title: "DevOps on Kubernetes",
		instructor: "Vikram Das",
		skills: [
			"Kubernetes",
			"Docker",
			"CI/CD Pipelines",
			"Monitoring",
		],
		level: "Advanced" as const,
		category: "DevOps",
		duration: "4 - 8 Weeks",
		price: 119.99,
		rating: 4.5,
		ratingCount: 8000,
	},
];

export default function CoursesPage() {
	return (
		<div className="bg-gray-50 min-h-screen">
			<section className="border-b border-gray-200 bg-white">
				<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
					<h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
						Explore Courses
					</h1>
					<p className="mt-2 max-w-2xl text-sm text-gray-600">
						Learn in-demand skills from top universities and industry leaders.
						Courses are structured into beginner, intermediate, and advanced levels
						to match your learning journey.
					</p>
				</div>
			</section>

			<section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
				<div className="mb-4 text-xs font-medium uppercase tracking-wide text-gray-500">
					Showing {SAMPLE_COURSES.length} courses
				</div>

				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{SAMPLE_COURSES.map((course) => (
						<CourseCard key={course.id} {...course} />
					))}
				</div>
			</section>
		</div>
	);
}

