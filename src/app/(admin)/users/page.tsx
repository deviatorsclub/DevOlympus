import { prisma } from "@/prisma";
import UserDashboard from "./UserDashboard";

export default async function Page() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      lastLogin: true,
      isAdmin: true,
      canEditData: true,
      loggedInTimes: true,
      isBlocked: true,
      team: {
        select: {
          id: true,
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
