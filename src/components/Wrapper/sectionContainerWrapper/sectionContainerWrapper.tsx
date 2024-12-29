import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export function SectionContainerWrapper({ children, className = "" }: Props) {
  return <section className={className}>{children}</section>;
}
