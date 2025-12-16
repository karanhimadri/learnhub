import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	try {
		const body = await req.json().catch(() => null as unknown);

		return NextResponse.json({
			message: "AI endpoint placeholder",
			input: body,
		});
	} catch (error) {
		console.error("AI_ROUTE_ERROR", error);
		return NextResponse.json(
			{ message: "Failed to handle AI request" },
			{ status: 500 }
		);
	}
}

export async function GET() {
	return NextResponse.json({
		message: "AI endpoint is configured",
	});
}
