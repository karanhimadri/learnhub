import { NextResponse } from "next/server";

export async function POST() {
	try {
		const response = NextResponse.json({
			message: "Logged out successfully",
		});

		response.cookies.set({
			name: "auth_token",
			value: "",
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			path: "/",
			maxAge: 0,
		});

		return response;
	} catch (error) {
		console.error("LOGOUT_ERROR", error);
		return NextResponse.json(
			{ message: "Failed to logout" },
			{ status: 500 }
		);
	}
}

