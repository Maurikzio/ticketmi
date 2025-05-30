import Link from "next/link";

export default async function Homepage() {
  return (
    <div className="min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)]">
      <h2>Home Page</h2>
      <Link href="/tickets">Go to Tickets!</Link>
    </div>
  );
}
