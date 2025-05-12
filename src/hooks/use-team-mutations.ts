// Layer 3: Mutations with optimism
import { createTeam, deleteTeam } from "@/data-layer/teams";
import { Team } from "@/lib/generated/prisma";
import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";

export function useTeamMutations() {
  const queryClient = useQueryClient();

  const queryKey: QueryKey = ["teams"];

  const createTeamMutation = useMutation({
    mutationFn: createTeam,
    onMutate: async (newTeam) => {
      await queryClient.cancelQueries({ queryKey });

      const previousState = queryClient.getQueryData<Team[]>(queryKey);

      queryClient.setQueryData<Team[]>(queryKey, (old) => {
        if (!old) return [];
        return [...old, { ...newTeam, id: Math.random() }];
      });

      return { previousState };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(queryKey, context?.previousState);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const deleteTeamMutation = useMutation({
    mutationFn: deleteTeam,
    onMutate: async (teamId) => {
      await queryClient.cancelQueries({ queryKey });

      const previousState = queryClient.getQueryData<Team[]>(queryKey);

      queryClient.setQueryData<Team[]>(queryKey, (old) => {
        if (!old) return [];
        return old.filter((team) => team.id !== teamId);
      });
      return { previousState };
    },
    onError: (err, teamId, context) => {
      queryClient.setQueryData<Team[]>(queryKey, context?.previousState);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return {
    createTeam: createTeamMutation.mutate,
    deleteTeam: deleteTeamMutation.mutate,
    isCreating: createTeamMutation.isPending,
    isDeleting: deleteTeamMutation.isPending,
  };
}
