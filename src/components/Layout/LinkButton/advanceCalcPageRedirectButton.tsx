import { LinkButton } from "components/UI";
import { BS_COLOR, PAGE_URLS } from "data/constants";

export function AdvanceCalcPageRedirectButton() {
  return (
    <LinkButton color={BS_COLOR.Gray} link={PAGE_URLS.AdvanceCalcPage}>
      Visit
    </LinkButton>
  );
}
