"use client";

import { useTeamMutations } from "@/hooks/use-team-mutations";
import { TeamsData } from "@/lib/types";

// TeamList.tsx - Using Layer 3 mutations

interface TeamCardProps {
  team: TeamsData;
}

export function TeamCard({ team }: TeamCardProps) {
  const { deleteTeam, isDeleting } = useTeamMutations();

  return (
    <div className="p-4 border border-gray-200 rounded-lg mb-4">
      <h3 className="text-lg font-semibold">{team.name}</h3>
      <p className="text-gray-600">Members: {team.members.length}</p>
      <button
        onClick={() => deleteTeam(Number(team.id))}
        disabled={isDeleting}
        className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
      >
        {isDeleting ? "Deleting..." : "Delete Team"}
      </button>
    </div>
  );
}
