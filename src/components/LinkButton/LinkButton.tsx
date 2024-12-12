import { ReactNode } from "react";
import { BS_COLOR, BSColor } from "data/constants";

interface Props {
  children: ReactNode;
  color?: BSColor;
  link?: string;
  openInNewTab?: boolean;
}

export function LinkButton({
  children,
  color = BS_COLOR.Gray,
  link,
  openInNewTab = false,
}: Props) {
  return (
    <a
      href={link}
      className={`btn${color !== BS_COLOR.None ? ` btn-${color}` : ""}`}
      {...(openInNewTab ? { target: "_blank" } : {})}
    >
      {children}
    </a>
  );
}
