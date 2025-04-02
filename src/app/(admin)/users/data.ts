"use server";

import { prisma } from "@/prisma";
import { UserWithTeam } from "@/types/user-data";

export async function getData() {
  const users: UserWithTeam[] = await prisma.user.findMany({
    include: {
      team: {
        include: {
          members: true,
        },
      },
    },
  });
  return users;
}
