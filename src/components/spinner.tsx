import { Loader } from "lucide-react";

const Spinner = () => {
  return (
    <div className="flex-1 flex items-center justify-center">
      <Loader className="h-16 w-16 animate-spin" />
    </div>
  )
};

export default Spinner;
