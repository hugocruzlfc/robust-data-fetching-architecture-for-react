"use server";

import { deleteTeam } from "@/data-layer/teams";

export async function deleteTeamAction(id: number) {
  // Here validate the user auth

  return await deleteTeam(id);
}
