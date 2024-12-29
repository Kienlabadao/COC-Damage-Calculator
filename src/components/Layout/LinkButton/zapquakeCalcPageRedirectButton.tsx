import { LinkButton } from "components/UI";
import { BS_COLOR, PAGE_URLS } from "data/constants";

export function ZapquakeCalcPageRedirectButton() {
  return (
    <LinkButton color={BS_COLOR.Gray} link={PAGE_URLS.ZapquakeCalcPage}>
      Visit
    </LinkButton>
  );
}
