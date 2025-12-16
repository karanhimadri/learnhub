import { NextRequest, NextResponse } from "next/server";

export async function GET() {
	return NextResponse.json({
		message: "Courses endpoint is configured",
		courses: [],
	});
}

export async function POST(req: NextRequest) {
	try {
		const body = await req.json().catch(() => null as unknown);

		return NextResponse.json({
			message: "Course creation placeholder",
			input: body,
		});
	} catch (error) {
		console.error("COURSES_ROUTE_ERROR", error);
		return NextResponse.json(
			{ message: "Failed to handle courses request" },
			{ status: 500 }
		);
	}
}
