"use server";

import { prisma } from "@/prisma";
import UserDashboard from "./UserDashboard";
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

export default async function Page() {
  const users: UserWithTeam[] = await getData();

  return (
    <div className="mt-20">
      <div className="max-w-screen-xl mx-auto p-4 md:p-6">
        <UserDashboard initialUsers={users} />
      </div>
    </div>
  );
}
