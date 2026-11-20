import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Resets scroll position on route change, unless the URL has a hash
// (in which case HomePage's own hash-scroll effect handles it).
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
