import { useEffect, useState } from "react";

export function usePersistedState<T>(
  getOrStoreValue: () => T,
  storeValue: (newItem: T) => void
) {
  const [value, setValue] = useState(() => {
    return getOrStoreValue();
  });

  useEffect(() => {
    storeValue(value);
  }, [value]);

  return [value, setValue] as const;
}
