"use client";
import { useTeamsData } from "@/hooks/use-team-data";
import { OrganizationContextValue } from "@/lib/types";
import { createContext, use } from "react";

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
