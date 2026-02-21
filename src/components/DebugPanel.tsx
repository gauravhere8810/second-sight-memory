import { Button } from "@/components/ui/button";
import { Scan, XCircle, ChevronUp, ChevronDown } from "lucide-react";
import { useState } from "react";

interface DebugPanelProps {
  onSimulateRecognize: () => void;
  onSimulateEnd: () => void;
  isRecognizing: boolean;
}

const DebugPanel = ({ onSimulateRecognize, onSimulateEnd, isRecognizing }: DebugPanelProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="pointer-events-auto fixed bottom-3 left-3 z-40 md:bottom-6 md:left-6">
      <button
        onClick={() => setExpanded(!expanded)}
        className="mb-2 flex items-center gap-1 rounded-sm border border-border/50 bg-muted/50 px-2 py-1 text-[10px] uppercase tracking-wider text-muted-foreground backdrop-blur-sm transition-colors hover:border-primary/50 hover:text-primary"
      >
        {expanded ? <ChevronDown className="h-3 w-3" /> : <ChevronUp className="h-3 w-3" />}
        DEBUG
      </button>

      {expanded && (
        <div className="hud-panel animate-fade-up flex flex-col gap-2 rounded-sm p-3">
          <Button
            size="sm"
            onClick={onSimulateRecognize}
            disabled={isRecognizing}
            className="gap-2 border border-primary/30 bg-primary/10 text-xs text-primary hover:bg-primary/20"
          >
            <Scan className="h-3.5 w-3.5" />
            Simulate Recognizing Jake
          </Button>
          <Button
            size="sm"
            onClick={onSimulateEnd}
            disabled={!isRecognizing}
            className="gap-2 border border-destructive/30 bg-destructive/10 text-xs text-destructive hover:bg-destructive/20"
          >
            <XCircle className="h-3.5 w-3.5" />
            Simulate End Conversation
          </Button>
        </div>
      )}
    </div>
  );
};

export default DebugPanel;
