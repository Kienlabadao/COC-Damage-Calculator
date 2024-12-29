import { ReactNode } from "react";
import { BS_COLOR, BSColor } from "data/constants";

function convertBSColor(bsColor: BSColor): string {
  return bsColor !== BS_COLOR.None ? `btn-${bsColor}` : "";
}

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
  const buttonColor = convertBSColor(color);

  return (
    <a
      href={link}
      className={`btn ${buttonColor}`}
      {...(openInNewTab ? { target: "_blank" } : {})}
    >
      {children}
    </a>
  );
}
