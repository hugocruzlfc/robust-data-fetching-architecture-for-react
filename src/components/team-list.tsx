"use client";

import { useOrganization } from "./organization-context";
import { TeamCard } from "./team-card";

export function TeamList() {
  // Data from Layer 2 context
  const { teams, isLoadingTeams, error } = useOrganization();

  if (error || !teams) {
    return null;
  }

  if (isLoadingTeams) {
    return null;
  }

  return (
    <div>
      {teams.map((team) => (
        <TeamCard
          key={team.id}
          team={team}
        />
      ))}
    </div>
  );
}
