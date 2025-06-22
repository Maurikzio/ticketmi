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
import { cloneElement, useState } from "react";
import SubmitButton from "./form/submit-button";
import Form from "./form/form";

interface UseConfirmDialogProps {
  action: () => Promise<{ message: string, status: string }>,
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
            <Form action={action}>
              <SubmitButton label="Confirm" pendingLabel="Deleting" />
            </Form>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
  return [dialogTrigger, dialog]
}

export default useConfirmDialog;
