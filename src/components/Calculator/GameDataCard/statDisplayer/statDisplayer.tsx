import { TextFormatter } from "components/UI";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  label?: string;
}

export function StatDisplayer({ children, label }: Props) {
  return (
    <div className="d-flex justify-content-center align-items-center column-gap-1">
      {label && <TextFormatter content={label} />}
      {children}
    </div>
  );
}
