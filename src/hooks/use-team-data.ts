import { API_URL } from "@/lib/constant";
import { TeamsData } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import ky from "ky";

export function useTeamsData() {
  return useQuery({
    queryKey: ["teams"],
    queryFn: () => ky.get(API_URL.teams).json<TeamsData[]>(),
    // initialData, // Received from Server Component via context
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}
