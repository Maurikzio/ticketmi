import Link from "next/link";
import { ticketsPath } from "@/paths";

export default async function Homepage() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <h2>Home Page</h2>
      <Link href={ticketsPath}>Go to Tickets!</Link>
    </div>
  );
}
