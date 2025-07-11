"use client"

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
import { cloneElement, useActionState, useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface UseConfirmDialogProps {
  action: () => Promise<{ message?: string, status?: string }>,
  // trigger: (isPending: boolean) => React.ReactElement<{ onClick?: React.MouseEventHandler }>
  trigger: React.ReactElement<{ onClick?: React.MouseEventHandler }> | ((isPending: boolean) => React.ReactElement<{ onClick?: React.MouseEventHandler }>);
  title?: string;
  description?: string;
  onSuccessAction?: () => void;
}

const useConfirmDialog = ({
  action,
  trigger,
  title = "Are you absolutely sure?",
  description = "This action cannot be undone. Make sure you understand the consequences",
  onSuccessAction,
}: UseConfirmDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const [actionState, formAction, isPending] = useActionState(action, { message: "", status: "" });
  const toastRef = useRef<string | number | null>(null)

  const dialogTrigger = cloneElement(
    typeof trigger === "function" ? trigger(isPending) : trigger,
    { onClick: () => setIsOpen((state) => !state) }
  );

  useEffect(() => {
    if (actionState.status === "success") {
      if (typeof onSuccessAction === "function") {
        toast.success(actionState.message || "Success!");
        onSuccessAction()
      }
      setIsOpen(false)
    } else if (actionState.status === "error") {
      toast.error(actionState.message || "Something went wrong");
    }
    // TODO: intentar memoizing callback
    // onSuccessAction in dependecy array is making this effect to re-run and producing double toast!!
  }, [actionState, onSuccessAction])

  useEffect(() => {
    // .dismiss() necesita una referencia del toast que queremos ocultar, por esa razon usamos useRef
    if (isPending) {
      toastRef.current = toast.loading("Deleting....")
    } else if (toastRef.current) {
      toast.dismiss(toastRef.current)
    }

    return () => {
      /**
       * Si se usa un redirect al eliminar un record el toast.loading() seguira siendo renderizado
       * ya que toast.dismiss no sabe cual es la refercia por que el componente ya fue unmounted
       * por lo que conn el cleant/unmount return del useEffect podemos usar .dismiss()
       */
      if (toastRef.current) {
        toast.dismiss(toastRef.current)
      }
    }
  }, [isPending])

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
            <form action={formAction}>
              <Button>Confirm</Button>
            </form>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
  return [dialogTrigger, dialog]
}

export default useConfirmDialog;
