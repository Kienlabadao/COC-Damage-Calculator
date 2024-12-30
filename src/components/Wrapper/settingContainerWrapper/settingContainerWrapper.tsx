import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export function SettingContainerWrapper({ children, className = "" }: Props) {
  return <div className={`setting-container ${className}`}>{children}</div>;
}
