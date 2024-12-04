import { ReactNode } from "react";
import { BSColor } from "assets/data/config";

interface Props {
  color?: BSColor;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

const DEFAULT_COLOR = BSColor.Gray;

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
