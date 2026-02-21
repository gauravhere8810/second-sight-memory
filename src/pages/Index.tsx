import { useState, useEffect } from "react";
import VisionLayer from "@/components/VisionLayer";
import HUDOverlay from "@/components/HUDOverlay";
import MemoryCard from "@/components/MemoryCard";
import LiveSubtitles from "@/components/LiveSubtitles";
import DebugPanel from "@/components/DebugPanel";
import { useToast } from "@/hooks/use-toast";
import { useSpeechRecognition } from "@/hooks/use-speech-recognition";

const MOCK_PERSON = {
  name: "Jake",
  relation: "Your Son",
  lastContext:
    "Visited last week. You talked about his hackathon project — he built an AR app to help people with memory. He brought your favorite cookies.",
  confidence: 94,
};

const Index = () => {
  const [isRecognizing, setIsRecognizing] = useState(false);
  const { toast } = useToast();
  const speech = useSpeechRecognition();

  const handleSimulateRecognize = () => {
    setIsRecognizing(true);
    speech.start();
  };

  const handleSimulateEnd = () => {
    speech.stop();
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

      <LiveSubtitles
        visible={isRecognizing}
        transcript={speech.transcript}
        interimTranscript={speech.interimTranscript}
        isListening={speech.isListening}
        isSupported={speech.isSupported}
      />

      <DebugPanel
        onSimulateRecognize={handleSimulateRecognize}
        onSimulateEnd={handleSimulateEnd}
        isRecognizing={isRecognizing}
      />
    </div>
  );
};

export default Index;
