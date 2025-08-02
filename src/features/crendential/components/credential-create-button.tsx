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
// import { createInvitation } from "../actions/create-invitation";
// import { InvitationFormState } from "../definitions";
import SubmitButton from "@/components/form/submit-button-iconed";
import { CredentialFormState } from "../definitions";
import { CreateCredential } from "../actions/create-credential";

type InvitationCreateButtonProps = {
  organizationId: string;
};

const CredentialCreateButton = ({ organizationId }: InvitationCreateButtonProps) => {
  const [open, setOpen] = useState(false);
  const initialState: CredentialFormState = { message: "", errors: {}, status: "idle" }
  const [actionState, action] = useActionState(
    CreateCredential.bind(null, organizationId),
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
  }, [actionState])


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <DialogTrigger asChild>
          <Button>
            <LucidePlus className="w-4 h-4" />
            Create Credential
          </Button>
        </DialogTrigger>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Credential</DialogTitle>
          <DialogDescription>
            Create a new API secret for your organization
          </DialogDescription>
        </DialogHeader>
        <form action={action}>
          <div className="grid gap-4 py-4">
            <div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input name="name" id="name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div />
                <div className="col-span-3">
                  {actionState.errors?.name ? (
                    <p className='text-sm text-red-500'>
                      {actionState.errors.name?.[0]}
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
            <SubmitButton label="Create" />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
};

export { CredentialCreateButton };
