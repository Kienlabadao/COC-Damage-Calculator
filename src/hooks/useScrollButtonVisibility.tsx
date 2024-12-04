import { useEffect, useState } from "react";
import { SCROLL_POS_THRESHOLD } from "assets/data/config";
import { getCurrentScrollPos, getPageHeight } from "utils/pageUtils";

// Helper function to calculate and set visibility
function updateScrollButtonVisibility(
  setShowBackToTop: React.Dispatch<React.SetStateAction<boolean>>,
  setShowBackToBottom: React.Dispatch<React.SetStateAction<boolean>>
) {
  const currentScrollPos = getCurrentScrollPos();
  const pageHeight = getPageHeight();

  setShowBackToTop(currentScrollPos > SCROLL_POS_THRESHOLD);
  setShowBackToBottom(currentScrollPos < pageHeight - SCROLL_POS_THRESHOLD);
}

export function useScrollButtonVisibility() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showBackToBottom, setShowBackToBottom] = useState(false);

  useEffect(() => {
    // Initial visibility check when the component is first rendered
    updateScrollButtonVisibility(setShowBackToTop, setShowBackToBottom);

    // Event listener for scroll events
    const handleScroll = () => {
      updateScrollButtonVisibility(setShowBackToTop, setShowBackToBottom);
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array to ensure this effect only runs once

  return [showBackToTop, showBackToBottom] as const;
}
