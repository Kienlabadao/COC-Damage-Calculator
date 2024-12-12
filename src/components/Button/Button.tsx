import { BS_COLOR, BSColor } from "data/constants";
import { ReactNode } from "react";

interface Props {
  color?: BSColor;
  children: ReactNode;
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
  return (
    <button
      type="button"
      className={`btn${color !== BS_COLOR.None ? ` btn-${color}` : ""}${
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
