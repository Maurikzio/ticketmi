import { homePath } from "@/paths";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button"
import { SquareChartGantt } from "lucide-react";
import ThemeSwitcher from "@/components/theme/theme-switcher";
import AuthButton from "./auth-button";

const Header = () => {
  //TIP for flick header when fetching user data
  // animate the header from top
  // But we show not render the whole header until we have user data

  return (
    <nav
      className="
        animate-header-from-top
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
        <AuthButton />
      </div>
    </nav>
  )
};

export default Header;
