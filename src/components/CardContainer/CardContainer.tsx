import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function CardContainer({ children }: Props) {
  return (
    <main className="card-custom card-custom__maincard-custom card-custom__main p-4 shadow">
      {children}
    </main>
  );
}
