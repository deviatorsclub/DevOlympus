import { prisma } from "@/prisma";
import UserDashboard from "./UserDashboard";
import { UserWithTeam } from "@/types/user-data";

export default async function Page() {
  const users: UserWithTeam[] = await prisma.user.findMany({
    include: {
      team: {
        include: {
          members: true,
        },
      },
    },
  });

  return (
    <div className="bg-gray-900 text-gray-100 mt-20">
      <div className="max-w-screen-xl mx-auto p-4 md:p-6">
        <UserDashboard initialUsers={users} />
      </div>
    </div>
  );
}
