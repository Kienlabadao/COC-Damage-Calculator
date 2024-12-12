import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export function SectionContainer({ children, className = "false" }: Props) {
  return <section className={className}>{children}</section>;
}
