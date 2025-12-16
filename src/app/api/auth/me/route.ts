import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

const JWT_SECRET = process.env.JWT_SECRET;

interface JwtPayload {
	userId: string;
	role: string;
}

export async function GET() {
	try {
		const cookieStore = await cookies();
		const token = cookieStore.get("auth_token")?.value;

		if (!token) {
			return NextResponse.json(
				{ message: "Not authenticated" },
				{ status: 401 }
			);
		}

		if (!JWT_SECRET) {
			console.error("ME_ERROR: JWT_SECRET is not configured");
			return NextResponse.json(
				{ message: "Server configuration error" },
				{ status: 500 }
			);
		}

		let decoded: JwtPayload;
		try {
			decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
		} catch {
			return NextResponse.json(
				{ message: "Invalid or expired token" },
				{ status: 401 }
			);
		}

		await connectDB();

		const user = await User.findById(decoded.userId);

		if (!user) {
			return NextResponse.json(
				{ message: "User not found" },
				{ status: 404 }
			);
		}

		return NextResponse.json({
			user: {
				id: user._id,
				name: user.name,
				email: user.email,
				role: user.role,
			},
		});
	} catch (error) {
		console.error("ME_ERROR:", error);
		return NextResponse.json(
			{ message: "Internal server error" },
			{ status: 500 }
		);
	}
}

