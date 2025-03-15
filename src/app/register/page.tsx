import { auth } from "@/lib/authOptions";
import React from "react";
import { LoginButton, LogoutButton } from "./signin";
import { ADMIN_EMAILS } from "@/types/gloabals";

export default async function page() {
  const session = await auth();

  console.log({ session, ADMIN_EMAILS });

  return (
    <div className="h-screen flex justify-center items-center">
      {session ? (
        <>
          {session.user.email}
          <div className="text-green-500">You are logged in</div>
          {session?.user.isAdmin ? (
            <div className="text-green-500">You are an admin</div>
          ) : (
            <div className="text-red-500">You are not an admin</div>
          )}
          <LogoutButton />
        </>
      ) : (
        <LoginButton />
      )}
    </div>
  );
}
