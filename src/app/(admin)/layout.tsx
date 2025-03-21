import { auth } from "@/lib/authOptions";
import { notFound } from "next/navigation";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  console.log("Session in layout:", session);

  return session?.user ? children : notFound();
}
