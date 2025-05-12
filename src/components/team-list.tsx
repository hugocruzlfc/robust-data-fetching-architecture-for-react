"use client";

import { useOrganization } from "./organization-context";
import { TeamCard } from "./team-card";

export function TeamList() {
  // Data from Layer 2 context
  const { teams, isLoadingTeams, error } = useOrganization();

  if (error || !teams) {
    return null; // add error handling here
  }

  if (isLoadingTeams) {
    return null; // add loading skeleton here
  }

  return (
    <div className="grid grid-cols-1  md:grid-cols-3 gap-4">
      {teams.map((team) => (
        <TeamCard
          key={team.id}
          team={team}
        />
      ))}
    </div>
  );
}
