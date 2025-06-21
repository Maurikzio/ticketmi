
import signOut from "@/features/auth/actions/sign-out";
import { Button } from "./ui/button";

const LogoutButton = () => {

  return (
    <form action={signOut}>
      <Button variant="outline">Logout</Button>
    </form>
  )
}

export default LogoutButton;
