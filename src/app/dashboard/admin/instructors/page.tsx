"use client";

import { useState, type FormEvent } from "react";
import { ShieldCheck, Mail, Lock, User, KeyRound, CheckCircle2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function AdminInstructorsPage() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [generated, setGenerated] = useState<{ email: string; password: string } | null>(null);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!name.trim()) {
			toast.error("Instructor name is required");
			return;
		}

		if (!email.trim()) {
			toast.error("Email is required");
			return;
		}

		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			toast.error("Enter a valid email address");
			return;
		}

		if (!password.trim()) {
			toast.error("Password is required");
			return;
		}

		if (password.length < 8) {
			toast.error("Password must be at least 8 characters");
			return;
		}

		setLoading(true);

		try {
			const res = await fetch("/api/admin/instructors", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ name, email, password }),
			});

			const data = await res.json().catch(() => null);

			if (!res.ok) {
				toast.error(data?.message || "Failed to create instructor");
				return;
			}

			toast.success("Instructor credentials created");
			setGenerated({ email, password });
			setName("");
			setEmail("");
			setPassword("");
		} catch {
			toast.error("Something went wrong. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
						<ShieldCheck className="h-6 w-6 text-green-600" />
						Create Instructor Credentials
					</h1>
					<p className="mt-1 text-sm text-gray-600">
						Generate secure login credentials for new instructors. Accounts use the same user model,
						with role automatically set to <span className="font-semibold">instructor</span>.
					</p>
				</div>
			</div>

			<div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm max-w-xl">
				<form onSubmit={handleSubmit} className="space-y-5">
					<div>
						<label className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-gray-700">
							<User className="h-3.5 w-3.5 text-green-600" />
							Instructor name
						</label>
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
							placeholder="Jane Smith"
						/>
					</div>

					<div>
						<label className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-gray-700">
							<Mail className="h-3.5 w-3.5 text-green-600" />
							Instructor email
						</label>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
							placeholder="instructor@example.com"
						/>
					</div>

					<div>
						<label className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-gray-700">
							<Lock className="h-3.5 w-3.5 text-green-600" />
							Temporary password
						</label>
						<input
							type="text"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
							placeholder="Generate a secure password"
						/>
						<p className="mt-1 text-xs text-gray-500">
							Share this password with the instructor. They can change it after first login.
						</p>
					</div>

					<button
						type="submit"
						disabled={loading}
						className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white hover:bg-green-700 disabled:opacity-70 disabled:cursor-not-allowed"
					>
						{loading ? "Creating..." : "Create Instructor"}
						<KeyRound className="h-4 w-4" />
					</button>
				</form>

				{generated && (
					<div className="mt-6 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-900">
						<div className="flex items-center gap-2 font-semibold mb-1">
							<CheckCircle2 className="h-4 w-4" />
							Credentials generated
						</div>
						<p className="text-xs text-green-800 mb-2">
							Share these credentials securely with the instructor.
						</p>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
							<div className="rounded border border-green-200 bg-white px-3 py-2">
								<span className="block text-[10px] font-semibold uppercase tracking-wide text-gray-500">
									Email
								</span>
								<span className="break-all text-gray-900">{generated.email}</span>
							</div>
							<div className="rounded border border-green-200 bg-white px-3 py-2">
								<span className="block text-[10px] font-semibold uppercase tracking-wide text-gray-500">
									Password
								</span>
								<span className="break-all text-gray-900">{generated.password}</span>
							</div>
						</div>
					</div>
				)}
			</div>

			<Toaster position="top-center" />
		</div>
	);
}

