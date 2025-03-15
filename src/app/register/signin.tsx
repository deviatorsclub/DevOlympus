"use client";

import { signIn, signOut } from "next-auth/react";
import React from "react";

export function LoginButton() {
  return (
    <div>
      <button
        onClick={() => signIn("google")}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Sign in
      </button>
    </div>
  );
}

export function LogoutButton() {
  return (
    <div>
      <button
        onClick={() => signOut()}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Sign out
      </button>
    </div>
  );
}
