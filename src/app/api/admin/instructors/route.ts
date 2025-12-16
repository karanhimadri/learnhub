import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

const JWT_SECRET = process.env.JWT_SECRET;

interface JwtPayload {
	userId: string;
	role: "admin" | "instructor" | "learner";
}

export async function POST(req: Request) {
	try {
		// 1️⃣ Auth check - only admins can create instructors
		const cookieStore = await cookies();
		const token = cookieStore.get("auth_token")?.value;

		if (!token) {
			return NextResponse.json(
				{ message: "Not authenticated" },
				{ status: 401 }
			);
		}

		if (!JWT_SECRET) {
			console.error("ADMIN_INSTRUCTORS_ERROR: JWT_SECRET is not configured");
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

		if (decoded.role !== "admin") {
			return NextResponse.json(
				{ message: "Only admins can create instructors" },
				{ status: 403 }
			);
		}

		// 2️⃣ Parse body
		const { name, email, password } = await req.json();

		if (!name || !email || !password) {
			return NextResponse.json(
				{ message: "Name, email and password are required" },
				{ status: 400 }
			);
		}

		await connectDB();

		// 3️⃣ Check for existing user with same email
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return NextResponse.json(
				{ message: "User already exists with this email" },
				{ status: 409 }
			);
		}

		// 4️⃣ Hash password & create instructor
		const hashedPassword = await bcrypt.hash(password, 10);

		const instructor = await User.create({
			name,
			email,
			password: hashedPassword,
			role: "instructor",
		});

		return NextResponse.json(
			{
				message: "Instructor created successfully",
				user: {
					id: instructor._id,
					name: instructor.name,
					email: instructor.email,
					role: instructor.role,
				},
			},
			{ status: 201 }
		);
	} catch (error) {
		console.error("ADMIN_INSTRUCTORS_ERROR:", error);
		return NextResponse.json(
			{ message: "Internal server error" },
			{ status: 500 }
		);
	}
}

