import Link from "next/link";
import { GraduationCap, Linkedin, Github, Mail } from "lucide-react";

const footerLinks = {
	platform: [
		{ label: "Browse Courses", href: "/courses" },
		{ label: "Become an Instructor", href: "/register" },
		{ label: "For Enterprises", href: "#" },
		{ label: "Mobile App", href: "#" },
	],
	resources: [
		{ label: "Help Center", href: "#" },
		{ label: "Blog", href: "#" },
		{ label: "Community", href: "#" },
		{ label: "Webinars", href: "#" },
	],
	company: [
		{ label: "About Us", href: "#" },
		{ label: "Careers", href: "#" },
		{ label: "Press", href: "#" },
		{ label: "Contact", href: "#" },
	],
	legal: [
		{ label: "Privacy Policy", href: "#" },
		{ label: "Terms of Service", href: "#" },
		{ label: "Cookie Policy", href: "#" },
		{ label: "Accessibility", href: "#" },
	],
};

export default function Footer() {
	return (
		<footer className="bg-gray-900 text-gray-300">
			{/* Main Footer */}
			<div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
				<div className="grid gap-12 md:grid-cols-2 lg:grid-cols-6">
					{/* Brand / Author Column */}
					<div className="lg:col-span-2">
						<Link href="/" className="flex items-center gap-3 mb-6">
							<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-green-500 to-emerald-600">
								<GraduationCap className="h-6 w-6 text-white" />
							</div>
							<span className="text-xl font-bold text-white">LearnHub</span>
						</Link>
						<p className="text-sm text-gray-400 leading-relaxed mb-3 max-w-xs">
							A modern course management platform built with Next.js, tailored for learners, instructors and admins.
						</p>
						<p className="text-sm text-gray-400 mb-4">
							Designed & developed by <span className="font-semibold text-gray-100">Himadri Karan</span>.
						</p>
						<div className="flex flex-wrap gap-3 mb-4 text-sm text-gray-300">
							<span className="inline-flex items-center gap-2">
								<Mail className="h-4 w-4 text-green-400" />
								<a
									href="mailto:himadrikaran516@gmail.com"
									className="hover:text-green-400 transition-colors"
								>
									himadrikaran516@gmail.com
								</a>
							</span>
						</div>
						<div className="flex gap-4">
							<a
								href="https://github.com/karanhimadri"
								target="_blank"
								rel="noreferrer"
								className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-800 text-gray-400 hover:bg-green-600 hover:text-white transition-colors"
							>
								<Github className="h-5 w-5" />
							</a>
							<a
								href="https://linkedin.com/in/himadrikaran"
								target="_blank"
								rel="noreferrer"
								className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-800 text-gray-400 hover:bg-green-600 hover:text-white transition-colors"
							>
								<Linkedin className="h-5 w-5" />
							</a>
						</div>
					</div>

					{/* Platform Links */}
					<div>
						<h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
							Platform
						</h3>
						<ul className="space-y-3">
							{footerLinks.platform.map((link) => (
								<li key={link.label}>
									<Link href={link.href} className="text-sm text-gray-400 hover:text-green-400 transition-colors">
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Resources Links */}
					<div>
						<h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
							Resources
						</h3>
						<ul className="space-y-3">
							{footerLinks.resources.map((link) => (
								<li key={link.label}>
									<Link href={link.href} className="text-sm text-gray-400 hover:text-green-400 transition-colors">
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Company Links */}
					<div>
						<h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
							Company
						</h3>
						<ul className="space-y-3">
							{footerLinks.company.map((link) => (
								<li key={link.label}>
									<Link href={link.href} className="text-sm text-gray-400 hover:text-green-400 transition-colors">
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Legal Links */}
					<div>
						<h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
							Legal
						</h3>
						<ul className="space-y-3">
							{footerLinks.legal.map((link) => (
								<li key={link.label}>
									<Link href={link.href} className="text-sm text-gray-400 hover:text-green-400 transition-colors">
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>

			{/* Bottom Bar */}
			<div className="border-t border-gray-800">
				<div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
					<div className="flex flex-col md:flex-row items-center justify-between gap-4">
						<p className="text-sm text-gray-500 text-center md:text-left">
							© {new Date().getFullYear()} LearnHub. Crafted by <span className="font-medium text-gray-300">Himadri Karan</span>.
						</p>
						<div className="flex flex-wrap items-center justify-center md:justify-end gap-4 text-sm text-gray-500">
							<span className="flex items-center gap-2">
								<Mail className="h-4 w-4" />
								<a
									href="mailto:himadrikaran516@gmail.com"
									className="hover:text-green-400 transition-colors"
								>
									himadrikaran516@gmail.com
								</a>
							</span>
							<span className="flex items-center gap-2">
								<Github className="h-4 w-4" />
								<a
									href="https://github.com/karanhimadri"
									target="_blank"
									rel="noreferrer"
									className="hover:text-green-400 transition-colors"
								>
									GitHub
								</a>
							</span>
							<span className="flex items-center gap-2">
								<Linkedin className="h-4 w-4" />
								<a
									href="https://linkedin.com/in/himadrikaran"
									target="_blank"
									rel="noreferrer"
									className="hover:text-green-400 transition-colors"
								>
									LinkedIn
								</a>
							</span>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
