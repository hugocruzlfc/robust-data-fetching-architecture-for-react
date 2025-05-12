import { getTeamById } from "@/data-layer/teams";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ teamId: string }> }
) {
  try {
    const { teamId } = await params;

    const team = await getTeamById(Number(teamId));

    if (!team) {
      return Response.json({ error: "Team not found" }, { status: 404 });
    }

    return Response.json(team, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
