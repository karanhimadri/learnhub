import Link from "next/link";
import Image from "next/image";
import { BookOpen, Users, Award, PlayCircle, ChevronRight, Star, Clock, BarChart3 } from "lucide-react";

export default function HomePage() {
	return (
		<div className="bg-white">
			{/* Hero Section */}
			<section className="relative overflow-hidden bg-linear-to-br from-green-50 via-white to-emerald-50">
				<div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-30" />
				<div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
					<div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
						<div className="space-y-8">
							<div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
								<span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
								Trusted by 50,000+ learners worldwide
							</div>
							
							<h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
								Learn Without{" "}
								<span className="text-green-600">Limits</span>
							</h1>
							
							<p className="max-w-xl text-lg text-gray-600 leading-relaxed">
								Discover courses taught by industry experts. Whether you&apos;re a learner seeking knowledge, 
								an instructor sharing expertise, or an admin managing your organization — LearnHub has you covered.
							</p>

							<div className="flex flex-wrap gap-4">
								<Link
									href="/courses"
									className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-green-600/30 transition-all hover:bg-green-700 hover:shadow-xl hover:shadow-green-600/40"
								>
									Browse Courses
									<ChevronRight className="h-5 w-5" />
								</Link>
								<Link
									href="/register"
									className="inline-flex items-center gap-2 rounded-lg border-2 border-gray-300 bg-white px-6 py-3 text-base font-semibold text-gray-700 transition-all hover:border-green-600 hover:text-green-600"
								>
									<PlayCircle className="h-5 w-5" />
									Start Teaching
								</Link>
							</div>

							<div className="flex flex-wrap gap-8 pt-4">
								<div className="flex items-center gap-3">
									<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
										<BookOpen className="h-6 w-6 text-green-600" />
									</div>
									<div>
										<p className="text-2xl font-bold text-gray-900">500+</p>
										<p className="text-sm text-gray-500">Courses</p>
									</div>
								</div>
								<div className="flex items-center gap-3">
									<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
										<Users className="h-6 w-6 text-green-600" />
									</div>
									<div>
										<p className="text-2xl font-bold text-gray-900">50K+</p>
										<p className="text-sm text-gray-500">Learners</p>
									</div>
								</div>
								<div className="flex items-center gap-3">
									<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
										<Award className="h-6 w-6 text-green-600" />
									</div>
									<div>
										<p className="text-2xl font-bold text-gray-900">200+</p>
										<p className="text-sm text-gray-500">Instructors</p>
									</div>
								</div>
							</div>
						</div>

						{/* Hero Image/Card */}
						<div className="relative">
							<div className="absolute -inset-4 rounded-2xl bg-linear-to-r from-green-400 to-emerald-400 opacity-20 blur-2xl" />
							<div className="relative rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl">
								<div className="mb-4 flex items-center justify-between">
									<span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
										Popular Course
									</span>
									<div className="flex items-center gap-1">
										<Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
										<span className="text-sm font-medium">4.9</span>
									</div>
								</div>
									<div className="relative mb-4 aspect-video overflow-hidden rounded-lg">
										<Image
											src="/web-development-coding-programming.webp"
											alt="Web development coding and programming"
											fill
											priority
											className="object-cover"
										/>
									</div>
								
								<h3 className="text-lg font-semibold text-gray-900 mb-2">
									Complete Web Development Bootcamp
								</h3>
								<p className="text-sm text-gray-600 mb-4">
									Master HTML, CSS, JavaScript, React, Node.js and more
								</p>
								
								<div className="flex items-center justify-between pt-4 border-t border-gray-100">
									<div className="flex items-center gap-2">
										<div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center text-white text-xs font-bold">
											SS
										</div>
										<span className="text-sm text-gray-600">Susanta Saha</span>
									</div>
									<div className="flex items-center gap-1 text-sm text-gray-500">
										<Clock className="h-4 w-4" />
										<span>40 hours</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* User Roles Section */}
			<section className="bg-white py-20">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
							Built for Everyone
						</h2>
						<p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
							Whether you want to learn, teach, or manage — our platform adapts to your needs
						</p>
					</div>

					<div className="grid gap-8 md:grid-cols-3">
						{/* Learner Card */}
						<div className="group relative rounded-2xl border border-gray-200 bg-white p-8 transition-all hover:border-green-500 hover:shadow-xl">
							<div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-green-100 text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
								<BookOpen className="h-7 w-7" />
							</div>
							<h3 className="text-xl font-bold text-gray-900 mb-3">For Learners</h3>
							<p className="text-gray-600 mb-6">
								Access world-class courses, track your progress, earn certificates, and advance your career with in-demand skills.
							</p>
							<ul className="space-y-3 text-sm text-gray-600">
								<li className="flex items-center gap-2">
									<span className="h-1.5 w-1.5 rounded-full bg-green-500" />
									Personalized learning paths
								</li>
								<li className="flex items-center gap-2">
									<span className="h-1.5 w-1.5 rounded-full bg-green-500" />
									Progress tracking & analytics
								</li>
								<li className="flex items-center gap-2">
									<span className="h-1.5 w-1.5 rounded-full bg-green-500" />
									Certificates upon completion
								</li>
							</ul>
							<Link 
								href="/register" 
								className="mt-6 inline-flex items-center text-green-600 font-semibold hover:text-green-700"
							>
								Start Learning <ChevronRight className="h-4 w-4 ml-1" />
							</Link>
						</div>

						{/* Instructor Card */}
						<div className="group relative rounded-2xl border border-gray-200 bg-white p-8 transition-all hover:border-green-500 hover:shadow-xl">
							<div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
								<Users className="h-7 w-7" />
							</div>
							<h3 className="text-xl font-bold text-gray-900 mb-3">For Instructors</h3>
							<p className="text-gray-600 mb-6">
								Create and publish courses, engage with students, track performance, and earn by sharing your expertise.
							</p>
							<ul className="space-y-3 text-sm text-gray-600">
								<li className="flex items-center gap-2">
									<span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
									Easy course builder
								</li>
								<li className="flex items-center gap-2">
									<span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
									Student engagement tools
								</li>
								<li className="flex items-center gap-2">
									<span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
									Revenue & analytics dashboard
								</li>
							</ul>
							<Link 
								href="/register" 
								className="mt-6 inline-flex items-center text-emerald-600 font-semibold hover:text-emerald-700"
							>
								Start Teaching <ChevronRight className="h-4 w-4 ml-1" />
							</Link>
						</div>

						{/* Admin Card */}
						<div className="group relative rounded-2xl border border-gray-200 bg-white p-8 transition-all hover:border-green-500 hover:shadow-xl">
							<div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-teal-100 text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-colors">
								<BarChart3 className="h-7 w-7" />
							</div>
							<h3 className="text-xl font-bold text-gray-900 mb-3">For Admins</h3>
							<p className="text-gray-600 mb-6">
								Manage users, oversee courses, configure settings, and get comprehensive insights into platform performance.
							</p>
							<ul className="space-y-3 text-sm text-gray-600">
								<li className="flex items-center gap-2">
									<span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
									User & role management
								</li>
								<li className="flex items-center gap-2">
									<span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
									Platform-wide analytics
								</li>
								<li className="flex items-center gap-2">
									<span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
									Course approval workflow
								</li>
							</ul>
							<Link 
								href="/register" 
								className="mt-6 inline-flex items-center text-teal-600 font-semibold hover:text-teal-700"
							>
								Manage Platform <ChevronRight className="h-4 w-4 ml-1" />
							</Link>
						</div>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="bg-gray-50 py-20">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<span className="inline-block rounded-full bg-green-100 px-4 py-1.5 text-sm font-medium text-green-700 mb-4">
							Why Choose Us
						</span>
						<h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
							Everything You Need to Succeed
						</h2>
						<p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
							Powerful features designed to make learning and teaching seamless
						</p>
					</div>

					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
						<div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
							<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
								<BookOpen className="h-6 w-6 text-green-600" />
							</div>
							<h3 className="font-semibold text-gray-900 mb-2">Rich Content</h3>
							<p className="text-sm text-gray-600">
								Video lessons, quizzes, assignments, and downloadable resources
							</p>
						</div>

						<div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
							<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
								<BarChart3 className="h-6 w-6 text-green-600" />
							</div>
							<h3 className="font-semibold text-gray-900 mb-2">Progress Tracking</h3>
							<p className="text-sm text-gray-600">
								Detailed analytics and progress reports for learners and instructors
							</p>
						</div>

						<div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
							<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
								<Award className="h-6 w-6 text-green-600" />
							</div>
							<h3 className="font-semibold text-gray-900 mb-2">Certificates</h3>
							<p className="text-sm text-gray-600">
								Earn verified certificates to showcase your achievements
							</p>
						</div>

						<div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
							<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
								<Users className="h-6 w-6 text-green-600" />
							</div>
							<h3 className="font-semibold text-gray-900 mb-2">Community</h3>
							<p className="text-sm text-gray-600">
								Connect with peers, join discussions, and collaborate on projects
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="bg-linear-to-br from-green-600 to-emerald-700 py-20">
				<div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
					<h2 className="text-3xl font-bold text-white sm:text-4xl">
						Ready to Start Your Learning Journey?
					</h2>
					<p className="mt-4 text-lg text-green-100 max-w-2xl mx-auto">
						Join thousands of learners and instructors who are already transforming their careers with LearnHub.
					</p>
					<div className="mt-8 flex flex-wrap justify-center gap-4">
						<Link
							href="/register"
							className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 text-base font-semibold text-green-700 shadow-lg transition-all hover:bg-gray-50 hover:shadow-xl"
						>
							Get Started Free
							<ChevronRight className="h-5 w-5" />
						</Link>
						<Link
							href="/courses"
							className="inline-flex items-center gap-2 rounded-lg border-2 border-white/30 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur transition-all hover:bg-white/20"
						>
							Explore Courses
						</Link>
					</div>
				</div>
			</section>
		</div>
	);
}
