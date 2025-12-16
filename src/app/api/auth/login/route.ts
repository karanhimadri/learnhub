import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req: Request) {
	try {
		const { email, password } = await req.json();

		if (!email || !password) {
			return Response.json(
				{ message: "Email and password are required" },
				{ status: 400 }
			);
		}

		await connectDB();

		const user = await User.findOne({ email }).select("+password");

		if (!user || !user.password) {
			return Response.json(
				{ message: "Invalid email or password" },
				{ status: 401 }
			);
		}

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			return Response.json(
				{ message: "Invalid email or password" },
				{ status: 401 }
			);
		}

		if (!JWT_SECRET) {
			console.error("LOGIN_ERROR: JWT_SECRET is not configured");
			return Response.json(
				{ message: "Server configuration error. Please try again later." },
				{ status: 500 }
			);
		}

		const token = jwt.sign(
			{ userId: user._id, role: user.role },
			JWT_SECRET,
			{ expiresIn: "7d" }
		);

		const response = NextResponse.json({
			message: "Login successful",
			user: {
				id: user._id,
				name: user.name,
				email: user.email,
				role: user.role,
			},
		});

		response.cookies.set({
			name: "auth_token",
			value: token,
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			path: "/",
			maxAge: 60 * 60 * 24 * 7,
		});

		return response;
	} catch (error) {
		console.error("LOGIN_ERROR:", error);
		return Response.json(
			{ message: "Internal server error" },
			{ status: 500 }
		);
	}
}

