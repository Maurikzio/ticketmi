"use client";

import React from "react";
import { LucideLoaderCircle } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button, buttonVariants } from "../ui/button";
import { VariantProps } from "class-variance-authority";

type SubmitButtonProps = {
  label?: string;
  icon?: React.ReactElement<React.HTMLAttributes<HTMLElement>>
} & VariantProps<typeof buttonVariants>

const SubmitButton = ({
  label,
  icon,
  variant = "default",
  size = "default",
}: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit" variant={variant} size={size}>
      {pending ? (
        <LucideLoaderCircle className="h-4 w-4 animate-spin" />
      ) : icon ? (
        <>
          {React.cloneElement(icon, {
            className: "w-4 h-4",
          })}
        </>
      ) : null}
      {label}
    </Button>
  );
};

export default SubmitButton;
