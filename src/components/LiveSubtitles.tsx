import { Mic } from "lucide-react";
import { useEffect, useState } from "react";

interface LiveSubtitlesProps {
  visible: boolean;
  text: string;
}

const LiveSubtitles = ({ visible, text }: LiveSubtitlesProps) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (!visible || !text) {
      setDisplayedText("");
      return;
    }

    setDisplayedText("");
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 35);

    return () => clearInterval(interval);
  }, [visible, text]);

  if (!visible) return null;

  return (
    <div className="animate-fade-up pointer-events-none fixed bottom-16 left-1/2 z-30 w-[90%] max-w-2xl -translate-x-1/2 md:bottom-20">
      <div className="hud-panel rounded-sm px-4 py-3">
        <div className="mb-1 flex items-center gap-2">
          <Mic className="h-3 w-3 animate-pulse-glow text-destructive" />
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
            Live Transcript
          </span>
        </div>
        <p className="text-sm leading-relaxed text-foreground md:text-base">
          {displayedText}
          <span
            className="ml-0.5 inline-block h-4 w-0.5 bg-primary"
            style={{ animation: "typewriter-blink 0.8s infinite" }}
          />
        </p>
      </div>
    </div>
  );
};

export default LiveSubtitles;
