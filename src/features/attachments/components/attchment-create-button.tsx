'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AttachmentEntity } from "@prisma/client";
import { PaperclipIcon } from "lucide-react";
import { useState } from "react";
import AttachmentCreateForm from "./attachment-create-form";
import SubmitButton from "@/components/form/submit-button-iconed";

interface AttachmentCreateButtonProps {
  entityId: string;
  entity: AttachmentEntity;
  refreshComments: () => void;
}

const AttachmentCreateButton = ({ entityId, entity, refreshComments }: AttachmentCreateButtonProps) => {
  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
    setOpen(false);
    refreshComments()
  }

  const handleCancel = () => {
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <PaperclipIcon className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Files(s)</DialogTitle>
          <DialogDescription>Attach images or PDFs</DialogDescription>
        </DialogHeader>
        <AttachmentCreateForm
          entity={entity}
          entityId={entityId}
          buttons={
            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleCancel}>Cancel</Button>
              <SubmitButton label="Upload" />
            </DialogFooter>
          }
          onSuccess={handleSuccess}
        />
      </DialogContent>
    </Dialog>
  )
};

export default AttachmentCreateButton;
