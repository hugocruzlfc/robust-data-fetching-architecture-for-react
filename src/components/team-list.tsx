"use client";

import { useOrganization } from "./organization-context";

export function TeamList() {
  // Data from Layer 2 context
  const { teams, isLoadingTeams, error } = useOrganization();

  if (error || !teams) {
    return <ErrorState message="Failed to load teams" />;
  }

  if (isLoadingTeams) {
    return <LoadingState />;
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
