import { scrollUp, scrollDown } from "utils/scrollUtils";

import { useScrollButtonVisibility } from "hooks/useScrollButtonVisibility";

export function AutoScrollToggler() {
  const [showBackToTop, showBackToBottom] = useScrollButtonVisibility();

  return (
    <>
      {showBackToTop && (
        <button
          className="btn btn__scroll btn__scroll--up btn-secondary position-fixed"
          onClick={scrollUp}
        >
          <i className="fa-solid fa-arrow-up fa-2x"></i>
        </button>
      )}

      {showBackToBottom && (
        <button
          className="btn btn__scroll btn__scroll--down btn-secondary position-fixed"
          onClick={scrollDown}
        >
          <i className="fa-solid fa-arrow-down fa-2x"></i>
        </button>
      )}
    </>
  );
}
