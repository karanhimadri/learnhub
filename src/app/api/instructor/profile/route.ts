import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { connectDB } from "@/lib/mongodb";
import { verifyToken } from "@/lib/auth";
import User from "@/models/User";

export async function PATCH(req: NextRequest) {
	try {
		await connectDB();

		const authHeader = req.headers.get("authorization") || "";
		const token = authHeader.startsWith("Bearer ")
			? authHeader.slice(7)
			: req.cookies.get("auth_token")?.value;

		if (!token) {
			return NextResponse.json(
				{ message: "Unauthorized" },
				{ status: 401 }
			);
		}

		const user = verifyToken(token);

		if (!user || user.role !== "instructor") {
			return NextResponse.json(
				{ message: "Only instructors can update their profile" },
				{ status: 403 }
			);
		}

		const body = await req.json().catch(() => null);

		if (!body) {
			return NextResponse.json(
				{ message: "Invalid JSON body" },
				{ status: 400 }
			);
		}

		const { currentPassword, newPassword } = body as {
			currentPassword?: string;
			newPassword?: string;
		};

		if (!currentPassword || !newPassword) {
			return NextResponse.json(
				{ message: "Current and new password are required" },
				{ status: 400 }
			);
		}

		if (newPassword.length < 6) {
			return NextResponse.json(
				{ message: "New password must be at least 6 characters" },
				{ status: 400 }
			);
		}

		const dbUser = await User.findById(user.userId).select("+password");

		if (!dbUser || !dbUser.password) {
			return NextResponse.json(
				{ message: "User not found" },
				{ status: 404 }
			);
		}

		const isMatch = await bcrypt.compare(currentPassword, dbUser.password);

		if (!isMatch) {
			return NextResponse.json(
				{ message: "Current password is incorrect" },
				{ status: 400 }
			);
		}

		const hashedPassword = await bcrypt.hash(newPassword, 10);
		dbUser.password = hashedPassword;
		await dbUser.save();

		return NextResponse.json(
			{ message: "Password updated successfully" },
			{ status: 200 }
		);
	} catch (error) {
		console.error("INSTRUCTOR_PROFILE_UPDATE_ERROR", error);
		return NextResponse.json(
			{ message: "Failed to update profile" },
			{ status: 500 }
		);
	}
}

