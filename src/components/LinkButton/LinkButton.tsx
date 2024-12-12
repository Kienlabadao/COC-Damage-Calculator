import { ReactNode } from "react";
import { BS_COLOR, BSColor } from "data/constants";

interface Props {
  children: ReactNode;
  color?: BSColor;
  link?: string;
  openInNewTab?: boolean;
}

const DEFAULT_COLOR: BSColor = BS_COLOR.Gray;

export function LinkButton({
  children,
  color,
  link,
  openInNewTab = false,
}: Props) {
  return (
    <a
      href={link}
      className={`btn btn-${color || DEFAULT_COLOR}`}
      {...(openInNewTab ? { target: "_blank" } : {})}
    >
      {children}
    </a>
  );
}
