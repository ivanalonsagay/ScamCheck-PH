import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

function PageTransition() {
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
    }, 420);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/95 text-white">
      <div className="text-center">
        <img
          src={logo}
          alt="ScamCheck PH logo"
          className="mx-auto mb-4 h-20 w-20 animate-pulse rounded-2xl object-contain"
        />
        <div className="mx-auto mb-4 h-2 w-56 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-2/3 animate-loader rounded-full bg-blue-400" />
        </div>
        <p className="text-sm font-semibold text-blue-100">Loading ScamCheck PH...</p>
      </div>
    </div>
  );
}

export default PageTransition;
