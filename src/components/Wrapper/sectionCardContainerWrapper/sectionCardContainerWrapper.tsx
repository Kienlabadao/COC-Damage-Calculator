import { ReactNode } from "react";
import { SectionContainerWrapper } from "../sectionContainerWrapper";

interface Props {
  children: ReactNode;
  className?: string;
}

export function SectionCardContainerWrapper({
  children,
  className = "",
}: Props) {
  return (
    <SectionContainerWrapper className={`card-custom p-4 shadow ${className}`}>
      {children}
    </SectionContainerWrapper>
  );
}
