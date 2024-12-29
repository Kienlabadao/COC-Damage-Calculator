import { ReactNode } from "react";
import { Collapse } from "react-bootstrap";
import { useCollapseContainerContext } from "./collapseContainerContext";

interface Props {
  children: ReactNode;
}

export function CollapseContainerContent({ children }: Props) {
  const { isOpen, isContentLoaded } = useCollapseContainerContext();

  return (
    <Collapse in={isOpen}>
      <div>{isContentLoaded && children}</div>
    </Collapse>
  );
}
