import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    // 1️⃣ Basic validation (never trust client)
    if (!name || !email || !password) {
      return Response.json(
        { message: "Name, email and password are required" },
        { status: 400 }
      );
    }

    await connectDB();

    // 2️⃣ Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return Response.json(
        { message: "User already exists with this email" },
        { status: 409 }
      );
    }

    // 3️⃣ Hash password (bcrypt)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4️⃣ Save user in DB
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "learner",
    });

    if (!JWT_SECRET) {
      console.error("REGISTER_ERROR: JWT_SECRET is not configured");
      return Response.json(
        { message: "Server configuration error. Please try again later." },
        { status: 500 }
      );
    }

    // 5️⃣ Create JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 6️⃣ Create response and set auth cookie
    const response = NextResponse.json({
      message: "User registered & logged in",
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
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    // 7️⃣ Return response
    return response;
  } catch (error) {
    console.error("REGISTER_ERROR:", error);
    return Response.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
