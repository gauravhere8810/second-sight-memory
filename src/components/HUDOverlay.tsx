import { Clock, Wifi, Shield } from "lucide-react";
import { useEffect, useState } from "react";

const HUDOverlay = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = time.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const formattedDate = time.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="pointer-events-none fixed inset-0 z-20">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 pt-3 md:px-6 md:pt-4">
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-primary md:h-5 md:w-5" />
          <span className="font-display text-xs font-bold tracking-widest text-primary text-glow-cyan md:text-sm">
            SECONDSIGHT
          </span>
          <span className="ml-2 text-[10px] text-muted-foreground">v1.0</span>
        </div>

        {/* Right: Status */}
        <div className="flex items-center gap-3 text-[10px] text-muted-foreground md:gap-4 md:text-xs">
          <div className="flex items-center gap-1">
            <Wifi className="h-3 w-3 text-secondary" />
            <span className="text-secondary">ONLINE</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span className="font-mono">{formattedTime}</span>
          </div>
          <span className="hidden font-mono sm:inline">{formattedDate}</span>
        </div>
      </div>

      {/* Corner brackets - decorative */}
      <div className="absolute left-4 top-12 h-16 w-16 border-l-2 border-t-2 border-primary/30 md:left-6 md:top-14 md:h-24 md:w-24" />
      <div className="absolute bottom-4 left-4 h-16 w-16 border-b-2 border-l-2 border-primary/30 md:bottom-6 md:left-6 md:h-24 md:w-24" />
      <div className="absolute right-4 top-12 h-16 w-16 border-r-2 border-t-2 border-primary/30 md:right-6 md:top-14 md:h-24 md:w-24" />

      {/* Center crosshair */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative h-12 w-12 md:h-16 md:w-16">
          <div className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-primary/40" />
          <div className="absolute bottom-0 left-1/2 h-3 w-px -translate-x-1/2 bg-primary/40" />
          <div className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-primary/40" />
          <div className="absolute right-0 top-1/2 h-px w-3 -translate-y-1/2 bg-primary/40" />
          <div className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/60" />
        </div>
      </div>
    </div>
  );
};

export default HUDOverlay;
