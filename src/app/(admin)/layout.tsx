import { auth } from "@/lib/authOptions";
import { notFound } from "next/navigation";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (await auth())?.user ? children : notFound();
}
