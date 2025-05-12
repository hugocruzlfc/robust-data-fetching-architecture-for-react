"server-only";
import prisma from "@/lib/prisma-client";
import { getTeamsDataSelect } from "@/lib/types";
import { TeamValues } from "@/lib/validations";

export function getTeamsWithUsers() {
  return prisma.team.findMany({
    select: getTeamsDataSelect(),
  });
}

export function getTeamById(id: number) {
  return prisma.team.findUnique({
    where: { id },
    select: getTeamsDataSelect(),
  });
}

export function createTeam({ name, description, members }: TeamValues) {
  return prisma.team.create({
    data: {
      name,
      description,
      members: {
        connect: members?.map((member) => ({ id: Number(member) })),
      },
    },
    include: {
      members: true, // Include members in the response
    },
  });
}

export function deleteTeam(id: number) {
  return prisma.team.delete({
    where: { id },
  });
}
