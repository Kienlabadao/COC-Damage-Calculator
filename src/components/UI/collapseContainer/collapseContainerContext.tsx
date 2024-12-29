import { createContext, useContext } from "react";

interface CollapseContainerContextProps {
  id: string;
  isOpen: boolean;
  isContentLoaded: boolean;
  handleCollapse(): void;
}

export const CollapseContainerContext = createContext<
  CollapseContainerContextProps | undefined
>(undefined);

export function useCollapseContainerContext() {
  const context = useContext(CollapseContainerContext);

  if (context === undefined) {
    throw new Error(
      "useCollapseContainerContext.ERROR: useCollapseContainerContext must be used within a CollapseContainerProvider"
    );
  }

  return context;
}
