import Link from "next/link";
import { 
	Star, 
	Users, 
	BookOpen, 
	PlayCircle, 
	Award,
	CheckCircle,
	Globe,
	Calendar,
	ChevronRight,
	Heart,
	Share2,
	Download,
	MessageCircle
} from "lucide-react";

export default function CourseDetailPage() {
	return (
		<div className="bg-gray-50 min-h-screen">
			{/* Course Header */}
			<section className="bg-linear-to-br from-gray-900 to-gray-800 text-white">
				<div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
					<div className="grid gap-8 lg:grid-cols-3">
						{/* Left Content */}
						<div className="lg:col-span-2">
							{/* Breadcrumb */}
							<nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
								<Link href="/courses" className="hover:text-white transition-colors">
									Courses
								</Link>
								<ChevronRight className="h-4 w-4" />
								<span className="text-gray-300">Web Development</span>
							</nav>

							<div className="inline-flex items-center gap-2 rounded-full bg-green-600/20 px-3 py-1 text-sm font-medium text-green-400 mb-4">
								<span className="flex h-2 w-2 rounded-full bg-green-400" />
								Bestseller
							</div>

							<h1 className="text-3xl font-bold sm:text-4xl mb-4">
								Complete Web Development Bootcamp 2024
							</h1>

							<p className="text-lg text-gray-300 mb-6 max-w-2xl">
								Learn HTML, CSS, JavaScript, React, Node.js, MongoDB and more. Build real-world projects and become a full-stack web developer.
							</p>

							{/* Stats Row */}
							<div className="flex flex-wrap items-center gap-4 mb-6">
								<div className="flex items-center gap-1">
									<Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
									<span className="font-semibold">4.8</span>
									<span className="text-gray-400">(125,234 ratings)</span>
								</div>
								<span className="text-gray-500">•</span>
								<span className="text-gray-300">450,000 students enrolled</span>
							</div>

							{/* Instructor */}
							<div className="flex items-center gap-3 mb-6">
								<div className="h-10 w-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
									AY
								</div>
								<div>
									<p className="text-sm text-gray-400">Created by</p>
									<p className="font-medium">Dr. Angela Yu</p>
								</div>
							</div>

							{/* Meta Info */}
							<div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
								<span className="flex items-center gap-1.5">
									<Calendar className="h-4 w-4" />
									Last updated 12/2024
								</span>
								<span className="flex items-center gap-1.5">
									<Globe className="h-4 w-4" />
									English
								</span>
								<span className="flex items-center gap-1.5">
									<Award className="h-4 w-4" />
									Certificate included
								</span>
							</div>
						</div>

						{/* Right - Course Card */}
						<div className="lg:row-start-1">
							<div className="sticky top-24 rounded-xl bg-white shadow-2xl overflow-hidden">
								{/* Video Preview */}
								<div className="relative aspect-video bg-linear-to-br from-green-100 to-emerald-50 flex items-center justify-center">
									<button className="flex h-16 w-16 items-center justify-center rounded-full bg-green-600 text-white shadow-lg hover:bg-green-700 transition-colors">
										<PlayCircle className="h-8 w-8" />
									</button>
									<span className="absolute bottom-3 left-3 rounded bg-black/70 px-2 py-1 text-xs text-white">
										Preview this course
									</span>
								</div>

								<div className="p-6">
									{/* Price */}
									<div className="flex items-baseline gap-3 mb-4">
										<span className="text-3xl font-bold text-gray-900">$89.99</span>
										<span className="text-lg text-gray-400 line-through">$199.99</span>
										<span className="rounded bg-green-100 px-2 py-0.5 text-sm font-semibold text-green-700">
											55% off
										</span>
									</div>

									<p className="text-sm text-red-600 font-medium mb-4">
										⏰ 2 days left at this price!
									</p>

									{/* CTA Buttons */}
									<button className="w-full rounded-lg bg-green-600 py-3.5 text-base font-semibold text-white shadow-lg shadow-green-600/30 hover:bg-green-700 transition-colors mb-3">
										Enroll Now
									</button>

									<button className="w-full rounded-lg border-2 border-gray-300 py-3 text-base font-semibold text-gray-700 hover:border-green-600 hover:text-green-600 transition-colors mb-4">
										Add to Cart
									</button>

									<p className="text-xs text-gray-500 text-center mb-4">
										30-Day Money-Back Guarantee
									</p>

									{/* Quick Actions */}
									<div className="flex justify-center gap-4 pt-4 border-t border-gray-100">
										<button className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-green-600 transition-colors">
											<Heart className="h-4 w-4" />
											Wishlist
										</button>
										<button className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-green-600 transition-colors">
											<Share2 className="h-4 w-4" />
											Share
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Course Content */}
			<section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
				<div className="grid gap-8 lg:grid-cols-3">
					<div className="lg:col-span-2 space-y-8">
						{/* What You'll Learn */}
						<div className="rounded-xl border border-gray-200 bg-white p-6">
							<h2 className="text-xl font-bold text-gray-900 mb-6">What you&apos;ll learn</h2>
							<div className="grid gap-3 sm:grid-cols-2">
								{[
									"Build real-world web applications from scratch",
									"Master HTML5, CSS3, and modern JavaScript",
									"Create responsive designs for all devices",
									"Work with React and build dynamic UIs",
									"Develop backend APIs with Node.js and Express",
									"Manage databases with MongoDB",
									"Deploy applications to the cloud",
									"Implement authentication and security",
								].map((item, index) => (
									<div key={index} className="flex items-start gap-3">
										<CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
										<span className="text-sm text-gray-700">{item}</span>
									</div>
								))}
							</div>
						</div>

						{/* Course Content */}
						<div className="rounded-xl border border-gray-200 bg-white p-6">
							<div className="flex items-center justify-between mb-6">
								<h2 className="text-xl font-bold text-gray-900">Course Content</h2>
								<span className="text-sm text-gray-500">65 lessons • 52 hours total</span>
							</div>

							{/* Sections */}
							<div className="space-y-3">
								{[
									{ title: "Introduction to Web Development", lessons: 8, duration: "2h 30m" },
									{ title: "HTML5 Fundamentals", lessons: 12, duration: "4h 15m" },
									{ title: "CSS3 & Modern Styling", lessons: 15, duration: "6h 45m" },
									{ title: "JavaScript Essentials", lessons: 18, duration: "8h 30m" },
									{ title: "React.js Deep Dive", lessons: 12, duration: "7h 20m" },
								].map((section, index) => (
									<div 
										key={index} 
										className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50/50 transition-colors cursor-pointer"
									>
										<div className="flex items-center gap-3">
											<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 text-green-600 text-sm font-semibold">
												{index + 1}
											</div>
											<div>
												<p className="font-medium text-gray-900">{section.title}</p>
												<p className="text-xs text-gray-500">{section.lessons} lessons • {section.duration}</p>
											</div>
										</div>
										<ChevronRight className="h-5 w-5 text-gray-400" />
									</div>
								))}
							</div>

							<button className="mt-4 w-full py-3 text-sm font-semibold text-green-600 hover:text-green-700 transition-colors">
								Show all sections
							</button>
						</div>

						{/* Requirements */}
						<div className="rounded-xl border border-gray-200 bg-white p-6">
							<h2 className="text-xl font-bold text-gray-900 mb-4">Requirements</h2>
							<ul className="space-y-2">
								{[
									"No programming experience needed - I'll teach you everything",
									"A computer with internet access",
									"Eagerness to learn and build amazing projects",
								].map((req, index) => (
									<li key={index} className="flex items-start gap-2 text-sm text-gray-700">
										<span className="text-green-600 mt-1">•</span>
										{req}
									</li>
								))}
							</ul>
						</div>

						{/* Instructor */}
						<div className="rounded-xl border border-gray-200 bg-white p-6">
							<h2 className="text-xl font-bold text-gray-900 mb-6">Instructor</h2>
							<div className="flex items-start gap-4">
								<div className="h-20 w-20 rounded-full bg-linear-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-2xl font-bold shrink-0">
									AY
								</div>
								<div>
									<h3 className="text-lg font-semibold text-gray-900">Dr. Angela Yu</h3>
									<p className="text-sm text-gray-500 mb-3">Developer & Lead Instructor</p>
									<div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
										<span className="flex items-center gap-1">
											<Star className="h-4 w-4 text-yellow-400" />
											4.8 Instructor Rating
										</span>
										<span className="flex items-center gap-1">
											<Award className="h-4 w-4 text-green-600" />
											125K Reviews
										</span>
										<span className="flex items-center gap-1">
											<Users className="h-4 w-4 text-blue-600" />
											2.5M Students
										</span>
									</div>
									<p className="text-sm text-gray-600">
										I&apos;m Angela, a developer with a passion for teaching. I&apos;ve helped over 2 million students learn to code and change their lives.
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Sidebar */}
					<div className="space-y-6">
						{/* Course Includes */}
						<div className="rounded-xl border border-gray-200 bg-white p-6">
							<h3 className="font-semibold text-gray-900 mb-4">This course includes:</h3>
							<ul className="space-y-3">
								{[
									{ icon: PlayCircle, text: "52 hours on-demand video" },
									{ icon: Download, text: "85 downloadable resources" },
									{ icon: BookOpen, text: "15 coding exercises" },
									{ icon: MessageCircle, text: "Q&A support" },
									{ icon: Award, text: "Certificate of completion" },
									{ icon: Globe, text: "Full lifetime access" },
								].map((item, index) => {
									const Icon = item.icon;
									return (
										<li key={index} className="flex items-center gap-3 text-sm text-gray-600">
											<Icon className="h-5 w-5 text-green-600" />
											{item.text}
										</li>
									);
								})}
							</ul>
						</div>

						{/* Related Skills */}
						<div className="rounded-xl border border-gray-200 bg-white p-6">
							<h3 className="font-semibold text-gray-900 mb-4">Skills you&apos;ll gain</h3>
							<div className="flex flex-wrap gap-2">
								{["HTML", "CSS", "JavaScript", "React", "Node.js", "MongoDB", "Git", "REST APIs"].map((skill) => (
									<span 
										key={skill} 
										className="rounded-full bg-green-50 border border-green-200 px-3 py-1 text-sm text-green-700"
									>
										{skill}
									</span>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
