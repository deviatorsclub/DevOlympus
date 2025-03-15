import { auth } from "@/lib/authOptions";
import HeaderClient from "./HeaderClient";

export default async function Header() {
  const session = await auth();
  return <HeaderClient initialSession={session} />;
}
