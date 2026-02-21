import { useState } from "react";
import VisionLayer from "@/components/VisionLayer";
import HUDOverlay from "@/components/HUDOverlay";
import MemoryCard from "@/components/MemoryCard";
import LiveSubtitles from "@/components/LiveSubtitles";
import DebugPanel from "@/components/DebugPanel";
import { useToast } from "@/hooks/use-toast";

const MOCK_PERSON = {
  name: "Jake",
  relation: "Your Son",
  lastContext:
    "Visited last week. You talked about his hackathon project — he built an AR app to help people with memory. He brought your favorite cookies.",
  confidence: 94,
};

const MOCK_TRANSCRIPT = "Hey Dad, how are you? I brought some of those cookies you like. Remember the hackathon I told you about? We actually won! The judges loved our demo.";

const Index = () => {
  const [isRecognizing, setIsRecognizing] = useState(false);
  const { toast } = useToast();

  const handleSimulateRecognize = () => {
    setIsRecognizing(true);
  };

  const handleSimulateEnd = () => {
    toast({
      title: "💾 Saving to Memory...",
      description: "New conversation context has been stored.",
    });

    setIsRecognizing(false);
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-background">
      <VisionLayer />
      <HUDOverlay />

      <MemoryCard
        visible={isRecognizing}
        name={MOCK_PERSON.name}
        relation={MOCK_PERSON.relation}
        lastContext={MOCK_PERSON.lastContext}
        confidence={MOCK_PERSON.confidence}
      />

      <LiveSubtitles visible={isRecognizing} text={MOCK_TRANSCRIPT} />

      <DebugPanel
        onSimulateRecognize={handleSimulateRecognize}
        onSimulateEnd={handleSimulateEnd}
        isRecognizing={isRecognizing}
      />
    </div>
  );
};

export default Index;
