import { createContext, useContext } from "react";
import { Size } from "./gameDataImageDisplayer";

interface GameDataImageDisplayerContextProps {
  size: Size;
}

export const GameDataImageDisplayerContext = createContext<
  GameDataImageDisplayerContextProps | undefined
>(undefined);

export function useGameDataImageDisplayerContext() {
  const context = useContext(GameDataImageDisplayerContext);

  if (context === undefined) {
    throw new Error(
      "useGameDataImageDisplayerContext.ERROR: useGameDataImageDisplayerContext must be used within a GameDataImageDisplayerProvider"
    );
  }

  return context;
}
