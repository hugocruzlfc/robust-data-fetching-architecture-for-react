import { getTeams } from "@/data-layer/teams";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const teams = await getTeams();
    return Response.json(teams, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
