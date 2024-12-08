import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function MainContainer({ children }: Props) {
  return <main className="container-fluid pb-5">{children}</main>;
}
