import { ReactNode } from "react";

export interface Props {
  children: ReactNode;
}

export function HeaderOverlayWrapper({ children }: Props) {
  return <div className="object-container__header">{children}</div>;
}
