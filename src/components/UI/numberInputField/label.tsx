import { useNumberInputFieldContext } from "./numberInputFieldContext";

interface Props {
  content: string;
  className?: string;
}

export function Label({ content, className = "" }: Props) {
  const { id } = useNumberInputFieldContext();

  return (
    <label htmlFor={id} className={`form-label ${className}`}>
      {content}
    </label>
  );
}
