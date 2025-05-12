import { useTeamsData } from "@/hooks/use-team-data";
import { Team } from "@/lib/generated/prisma";
import { createContext, use } from "react";

interface OrganizationContextValue {
  teams: Team[] | undefined;
  isLoadingTeams: boolean;
  error: Error | null;
}

const OrganizationContext = createContext<OrganizationContextValue | null>(
  null
);

export function OrganizationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: teams, isLoading, error } = useTeamsData();

  return (
    <OrganizationContext value={{ teams, isLoadingTeams: isLoading, error }}>
      {children}
    </OrganizationContext>
  );
}

export function useOrganization() {
  const context = use(OrganizationContext);
  if (!context) {
    throw new Error("useOrganization must be used within OrganizationProvider");
  }
  return context;
}
