
import { TriangleAlert } from "lucide-react";

interface PlaceholderProps {
  label: string;
  icon?: React.ReactElement; // it cannot be null
  button?: React.ReactNode; // it can be null
}

const Placeholder = ({
  label,
  icon = <TriangleAlert className="h-8 w-8" />,
  button = null
}: PlaceholderProps) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4">
      {icon}
      <h2 className="text-lg text-center">{label}</h2>
      {button}
    </div>
  )
};

export default Placeholder;
