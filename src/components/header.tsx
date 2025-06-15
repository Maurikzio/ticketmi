import { homePath, signInPath, signUpPath, ticketsPath } from "@/paths";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button"
import { SquareChartGantt } from "lucide-react";
import ThemeSwitcher from "@/components/theme/theme-switcher";

const Header = () => {
  return (
    <nav
      className="
        supports-backdrop-blur:bg-background/60
        fixed left-0 right-0 top-0 z-20
        border-b bg-background/95 backdrop-blur
        w-full flex py-2.5 px-5 justify-between
      "
    >
      <div>
        {/* <Button asChild variant="outline">
              <Link href={homePath}>Home</Link>
            </Button> */}
        <Link href={homePath} className={buttonVariants({ variant: "ghost" })}>
          <SquareChartGantt />
          <h1 className=" text-lg font-bold">TicketMi</h1>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <ThemeSwitcher />
        <Link href={ticketsPath} className={buttonVariants({ variant: "default" })}>Tickets</Link>
        <Link href={signUpPath} className={buttonVariants({ variant: "outline" })}>Sign Up</Link>
        <Link href={signInPath} className={buttonVariants({ variant: "outline" })}>Log In</Link>
      </div>
    </nav>
  )
};

export default Header;
