import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import clsx from "clsx"

interface TextFieldProps {
  id: string
  type?:string
  label: string
  placeholder?: string
  className?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  autoComplete?: string
}

export const TextField = ({
  id,
  type="",
  label,
  placeholder = "",
  className,
  autoComplete = "off",
  value,
  onChange,
}: TextFieldProps) => {
  return (
    <div className={clsx("flex flex-col gap-2", className)}>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
