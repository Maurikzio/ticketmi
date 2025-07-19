"use client";

import { LucidePlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { createInvitation } from "../actions/create-invitation";
import { InvitationFormState } from "../definitions";
import SubmitButton from "@/components/form/submit-button-iconed";

type InvitationCreateButtonProps = {
  organizationId: string;
};

const InvitationCreateButton = ({ organizationId }: InvitationCreateButtonProps) => {
  const [open, setOpen] = useState(false);
  const initialState: InvitationFormState = { message: "", errors: {}, status: "idle" }
  const [actionState, action] = useActionState(
    createInvitation.bind(null, organizationId),
    initialState
  );

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (actionState.status === 'success') {
      toast.success(actionState.message)
      handleClose()
      // router.push("/tickets");
    } else if (actionState.status === "error") {
      toast.error(actionState.message)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionState])


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <DialogTrigger asChild>
          <Button>
            <LucidePlus className="w-4 h-4" />
            Invite Member
          </Button>
        </DialogTrigger>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite Member</DialogTitle>
          <DialogDescription>
            Invite a user by email to your organization
          </DialogDescription>
        </DialogHeader>
        <form action={action}>
          <div className="grid gap-4 py-4">
            <div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input name="email" id="email" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div />
                <div className="col-span-3">
                  {actionState.errors?.email ? (
                    <p className='text-sm text-red-500'>
                      {actionState.errors.email?.[0]}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <SubmitButton label="Invite" />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
};

export { InvitationCreateButton };
