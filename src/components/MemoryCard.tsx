import { User, Heart, MessageSquare, CalendarDays } from "lucide-react";

interface MemoryCardProps {
  visible: boolean;
  name: string;
  relation: string;
  lastContext: string;
  confidence: number;
}

const MemoryCard = ({ visible, name, relation, lastContext, confidence }: MemoryCardProps) => {
  if (!visible) return null;

  return (
    <div className="animate-slide-in-right pointer-events-auto fixed right-3 top-20 z-30 w-72 md:right-6 md:top-24 md:w-80">
      <div className="hud-panel corner-bracket relative rounded-sm p-4">
        {/* Header */}
        <div className="mb-3 flex items-center gap-2 border-b border-border/50 pb-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-primary/50 bg-primary/10">
            <User className="h-4 w-4 text-primary" />
          </div>
          <div>
            <div className="font-display text-xs tracking-wider text-muted-foreground">
              PERSON IDENTIFIED
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-secondary" />
              <span className="text-[10px] text-secondary">
                {confidence}% MATCH
              </span>
            </div>
          </div>
        </div>

        {/* Name */}
        <div className="mb-3">
          <h2 className="font-display text-2xl font-bold text-primary text-glow-cyan">
            {name}
          </h2>
        </div>

        {/* Relation */}
        <div className="mb-3 flex items-center gap-2">
          <Heart className="h-3.5 w-3.5 text-secondary" />
          <span className="text-sm font-medium text-secondary text-glow-green">
            {relation}
          </span>
        </div>

        {/* Last Context */}
        <div className="mb-2 rounded-sm border border-border/30 bg-muted/30 p-3">
          <div className="mb-1 flex items-center gap-1.5">
            <CalendarDays className="h-3 w-3 text-muted-foreground" />
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Last Memory
            </span>
          </div>
          <p className="text-xs leading-relaxed text-foreground/80">
            {lastContext}
          </p>
        </div>

        {/* Conversation indicator */}
        <div className="flex items-center gap-1.5 pt-1">
          <MessageSquare className="h-3 w-3 animate-pulse-glow text-primary" />
          <span className="text-[10px] text-primary">
            RECORDING CONVERSATION...
          </span>
        </div>
      </div>
    </div>
  );
};

export default MemoryCard;
