import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function DefenseCardWrapper({ children }: Props) {
  return (
    <div>
      <div className="card-custom card-custom__object card-custom__object--defense shadow p-3">
        {children}
      </div>
    </div>
  );
}
