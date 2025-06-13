interface FormProps {
  action: () => void;
  children: React.ReactNode
}

const Form = ({ action, children }: FormProps) => {
  return (
    <form action={action} className="flex flex-col gap-2">
      {children}
    </form>
  )
}

export default Form;
