import Link from "next/link";
import { ticketsPath } from "@/paths";

export default async function Homepage() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)] flex-1 flex flex-col gap-y-8">
      <div className="">
        <h2 className="text-3xl font-bold tracking-tight">Home Page</h2>
        <p className="text-sm">Your home place to start</p>
      </div>
      <div className="flex-1 flex flex-col items-center">
        <Link href={ticketsPath}>Go to Tickets!</Link>
      </div>
    </div>
  );
}
