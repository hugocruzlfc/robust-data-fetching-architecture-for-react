// Layer 3: Mutations with optimism
import { createTeam, deleteTeam } from "@/data-layer/teams";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useTeamMutations() {
  const queryClient = useQueryClient();

  const createTeamMutation = useMutation({
    mutationFn: createTeam,
    onMutate: async (newTeam) => {
      await queryClient.cancelQueries({ queryKey: ["teams"] });
      const currentTeams = queryClient.getQueryData(["teams"]);
      queryClient.setQueryData(["teams"], (old) => [
        ...old,
        { ...newTeam, id: `temp-${Date.now()}` },
      ]);
      return { currentTeams };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(["teams"], context?.currentTeams);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["teams"] });
    },
  });

  const deleteTeamMutation = useMutation({
    mutationFn: deleteTeam,
    onMutate: async (teamId) => {
      await queryClient.cancelQueries({ queryKey: ["teams"] });
      const currentTeams = queryClient.getQueryData(["teams"]);
      queryClient.setQueryData(["teams"], (old) =>
        old.filter((team) => team.id !== teamId)
      );
      return { currentTeams };
    },
    onError: (err, teamId, context) => {
      queryClient.setQueryData(["teams"], context?.currentTeams);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["teams"] });
    },
  });

  return {
    createTeam: createTeamMutation.mutate,
    deleteTeam: deleteTeamMutation.mutate,
    isCreating: createTeamMutation.isPending,
    isDeleting: deleteTeamMutation.isPending,
  };
}
