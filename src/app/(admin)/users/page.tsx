"use server";

import UserDashboard from "./UserDashboard";
import { UserWithTeam } from "@/types/user-data";

import { getData } from "./data";

export default async function Page() {
  const users: UserWithTeam[] = await getData();

  return (
    <div className="mt-20">
      <div className="max-w-screen-2xl mx-auto p-4 md:p-6">
        <UserDashboard initialUsers={users} />
      </div>
    </div>
  );
}
