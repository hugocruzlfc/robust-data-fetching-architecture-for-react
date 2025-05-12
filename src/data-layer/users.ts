import prisma from "@/lib/prisma-client";
import { getUserDataSelect } from "@/lib/types";

export function getUserById(userId: number) {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: getUserDataSelect(),
  });
}
