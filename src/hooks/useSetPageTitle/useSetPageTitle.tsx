import { PageTitle } from "data/constants";
import { useLayoutEffect } from "react";

export function useSetPageTitle(title: PageTitle) {
  useLayoutEffect(() => {
    document.title = title;
  }, [title]);
}
