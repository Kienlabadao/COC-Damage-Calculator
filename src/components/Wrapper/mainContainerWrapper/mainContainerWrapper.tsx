import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export function MainContainerWrapper({ children, className = "" }: Props) {
  return (
    <main className={`container-fluid pb-5 ${className}`}>{children}</main>
  );
}
