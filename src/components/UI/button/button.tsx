import { BS_COLOR, BSColor } from "data/constants";
import { ReactNode } from "react";

function convertBSColor(bsColor: BSColor): string {
  return bsColor !== BS_COLOR.None ? `btn-${bsColor}` : "";
}

interface Props {
  children: ReactNode;
  color?: BSColor;
  onClick?: () => void;
  className?: string;
}

export function Button({
  children,
  color = BS_COLOR.Gray,
  onClick,
  className = "",
  ...rest
}: Props) {
  function handleClick() {
    onClick?.();
  }
  const buttonColor = convertBSColor(color);

  return (
    <button
      type="button"
      className={`btn ${buttonColor} ${className}`}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </button>
  );
}
