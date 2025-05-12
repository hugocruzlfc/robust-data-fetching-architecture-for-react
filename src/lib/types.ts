import { Prisma } from "./generated/prisma";

export function getTeamsDataSelect() {
  return {
    id: true,
    name: true,
    description: true,
    members: {
      select: {
        id: true,
        name: true,
        email: true,
      },
    },
  } satisfies Prisma.TeamSelect;
}

export type TeamsData = Prisma.TeamGetPayload<{
  select: ReturnType<typeof getTeamsDataSelect>;
}>;

export interface OrganizationContextValue {
  teams: TeamsData[] | undefined;
  isLoadingTeams: boolean;
  error: Error | null;
}

export function getUserDataSelect() {
  return {
    id: true,
    name: true,
    email: true,
    team: {
      select: {
        id: true,
        name: true,
        description: true,
      },
    },
  } satisfies Prisma.UserSelect;
}

export type UserData = Prisma.UserGetPayload<{
  select: ReturnType<typeof getUserDataSelect>;
}>;
