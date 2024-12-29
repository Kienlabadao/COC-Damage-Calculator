import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export function ContentContainerWrapper({ children, className = "" }: Props) {
  return (
    <section
      className={`card-custom card-custom__main shadow p-4 my-5 ${className}`}
    >
      {children}
    </section>
  );
}
