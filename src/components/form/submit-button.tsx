import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
  label: string;
  pendingLabel: string;
}

const SubmitButton = ({ label, pendingLabel }: SubmitButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending}>
      {pending ? (
        <>
          <LoaderCircle className="h-4 w-4 animate-spin mr-4" />
          {pendingLabel}
        </>
      ) : label}
    </Button>
  )
}

export default SubmitButton;
