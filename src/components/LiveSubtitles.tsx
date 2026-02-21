import { Mic, MicOff } from "lucide-react";

interface LiveSubtitlesProps {
  visible: boolean;
  transcript: string;
  interimTranscript: string;
  isListening: boolean;
  isSupported: boolean;
}

const LiveSubtitles = ({
  visible,
  transcript,
  interimTranscript,
  isListening,
  isSupported,
}: LiveSubtitlesProps) => {
  if (!visible) return null;

  const displayText = transcript + interimTranscript;
  const hasContent = displayText.trim().length > 0;

  return (
    <div className="animate-fade-up pointer-events-none fixed bottom-16 left-1/2 z-30 w-[90%] max-w-2xl -translate-x-1/2 md:bottom-20">
      <div className="hud-panel rounded-sm px-4 py-3">
        <div className="mb-1 flex items-center gap-2">
          {isListening ? (
            <Mic className="h-3 w-3 animate-pulse-glow text-destructive" />
          ) : (
            <MicOff className="h-3 w-3 text-muted-foreground" />
          )}
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
            {!isSupported
              ? "Speech Recognition Not Supported"
              : isListening
              ? "Live Transcript"
              : "Microphone Inactive"}
          </span>
        </div>
        <p className="text-sm leading-relaxed text-foreground md:text-base">
          {hasContent ? (
            <>
              {transcript}
              <span className="text-primary/60">{interimTranscript}</span>
            </>
          ) : (
            <span className="text-muted-foreground/50 italic">
              {isListening ? "Listening..." : "Waiting for audio..."}
            </span>
          )}
          {isListening && (
            <span
              className="ml-0.5 inline-block h-4 w-0.5 bg-primary"
              style={{ animation: "typewriter-blink 0.8s infinite" }}
            />
          )}
        </p>
      </div>
    </div>
  );
};

export default LiveSubtitles;
