import { ReactNode } from "react";
import { NumberInputFieldContext } from "./numberInputFieldContext";

interface Props {
  id: string;
  children: ReactNode;
}

export function NumberInputField({ id, children }: Props) {
  return (
    <NumberInputFieldContext.Provider value={{ id }}>
      {children}
    </NumberInputFieldContext.Provider>
  );
}
