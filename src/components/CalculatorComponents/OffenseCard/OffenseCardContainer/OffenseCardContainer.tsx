import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function OffenseCardContainer({ children }: Props) {
  return (
    <div className="col card-custom card-custom__object text-center">
      {children}
    </div>
  );
}
