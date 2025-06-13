import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "./ui/button";
import { cloneElement, useState } from "react";

interface UseConfirmDialogProps {
  action: () => Promise<void>;
  trigger: React.ReactElement<{ onClick?: React.MouseEventHandler }>
  title?: string;
  description?: string;
}

const useConfirmDialog = ({
  action,
  trigger,
  title = "Are you absolutely sure?",
  description = "This action cannot be undone. Make sure you understand the consequences"
}: UseConfirmDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // const dialogTrigger = <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>;
  const dialogTrigger = cloneElement(trigger, {
    onClick: () => setIsOpen((state) => !state),
  });
  const dialog = (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <form action={action}>
              <Button type="submit">
                Confirm
              </Button>
            </form>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
  return [dialogTrigger, dialog]
}

export default useConfirmDialog;
