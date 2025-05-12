"use client";
// TeamList.tsx - Using Layer 3 mutations

interface TeamCardProps {
  team: {
    id: string;
    name: string;
    members: string[];
  };
}

export function TeamCard({ team }: TeamCardProps) {
  const { deleteTeam, isDeleting } = useTeamMutations();

  return (
    <div className="p-4 border border-gray-200 rounded-lg mb-4">
      <h3 className="text-lg font-semibold">{team.name}</h3>
      <p className="text-gray-600">Members: {team.members.length}</p>
      <button
        onClick={() => deleteTeam(team.id)}
        disabled={isDeleting}
        className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
      >
        {isDeleting ? "Deleting..." : "Delete Team"}
      </button>
    </div>
  );
}
