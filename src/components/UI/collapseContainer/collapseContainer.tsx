import { ReactNode, useState } from "react";
import { CollapseContainerContext } from "./collapseContainerContext";

interface Props {
  id: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export const CollapseContainer = ({
  id,
  children,
  defaultOpen = false,
}: Props) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [isContentLoaded, setIsContentLoaded] = useState(defaultOpen);

  function handleCollapse() {
    if (!isContentLoaded) {
      setIsContentLoaded(true);
    }
    setIsOpen(!isOpen);
  }

  return (
    <CollapseContainerContext.Provider
      value={{ id, isOpen, isContentLoaded, handleCollapse }}
    >
      {children}
    </CollapseContainerContext.Provider>
  );
};
