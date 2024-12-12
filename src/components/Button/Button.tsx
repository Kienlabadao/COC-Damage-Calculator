import { BS_COLOR, BSColor } from "data/constants";
import { ReactNode } from "react";

interface Props {
  color?: BSColor;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

const DEFAULT_COLOR: BSColor = BS_COLOR.Gray;

export function Button({
  children,
  color,
  onClick,
  className = "",
  ...rest
}: Props) {
  return (
    <button
      type="button"
      className={`btn btn-${color || DEFAULT_COLOR}${
        className ? ` ${className}` : ""
      }`}
      onClick={() => {
        onClick?.();
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
