import { Separator } from "@/components/ui/separator";

interface HeadingProps {
  title: string;
  description?: string;
  actions?: React.ReactNode
}

const Heading = ({ title, description, actions }: HeadingProps) => {
  return (
    <>
      <div className="px-8 flex justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
          {description ? <p className="text-sm">{description}</p> : null}
        </div>
        <div className="flex gap-2">
          {actions}
        </div>
      </div>
      <Separator />
    </>
  )
};

export default Heading;
