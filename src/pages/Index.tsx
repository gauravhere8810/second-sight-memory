import { useState, useEffect } from "react";
import VisionLayer from "@/components/VisionLayer";
import HUDOverlay from "@/components/HUDOverlay";
import MemoryCard from "@/components/MemoryCard";
import LiveSubtitles from "@/components/LiveSubtitles";
import DebugPanel from "@/components/DebugPanel";
import { useToast } from "@/hooks/use-toast";
import { useSpeechRecognition } from "@/hooks/use-speech-recognition";
import { summarizeTranscript } from "@/lib/groq";
import { supabase } from "@/lib/supabase";

const MOCK_PERSON = {
  name: "Jake",
  relation: "Your Son",
  lastContext:
    "Visited last week. You talked about his hackathon project — he built an AR app to help people with memory. He brought your favorite cookies.",
  confidence: 94,
};

const Index = () => {
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [currentSummary, setCurrentSummary] = useState<string | null>(null);
  const [lastMemorySummary, setLastMemorySummary] = useState<string | null>(MOCK_PERSON.lastContext);
  const [showCard, setShowCard] = useState(false);

  const { toast } = useToast();
  const speech = useSpeechRecognition();

  const fetchLastMemory = async () => {
    try {
      const { data, error } = await supabase
        .from('memories')
        .select('summary, created_at')
        .eq('person_name', MOCK_PERSON.name)
        .order('created_at', { ascending: false })
        .limit(1);

      if (error) throw error;

      if (data && data.length > 0) {
        setLastMemorySummary(data[0].summary);
        localStorage.setItem(`last_memory_${MOCK_PERSON.name}`, data[0].summary);
        console.log("Last memory fetched from Supabase:", data[0].summary);
      }
    } catch (error) {
      console.warn("Supabase unreachable, using local fallback:", error);
      const localFallback = localStorage.getItem(`last_memory_${MOCK_PERSON.name}`);
      if (localFallback) {
        setLastMemorySummary(localFallback);
      }
    }
  };

  useEffect(() => {
    fetchLastMemory();
  }, []);

  const handleSimulateRecognize = () => {
    fetchLastMemory();
    setIsRecognizing(true);
    setShowCard(true);
    setCurrentSummary(null);
    speech.start();
  };

  const handleSimulateEnd = async () => {
    const finalTranscript = speech.transcript;
    speech.stop();
    setIsRecognizing(false);
    setIsSummarizing(true);

    toast({
      title: "🧠 Analyzing Conversation...",
      description: "Groq is generating a summary of your talk with " + MOCK_PERSON.name,
    });

    try {
      const summary = await summarizeTranscript(finalTranscript);
      setCurrentSummary(summary);
      setIsSummarizing(false);

      try {
        const { error } = await supabase
          .from('memories')
          .insert([
            {
              transcript: finalTranscript,
              summary: summary,
              person_name: MOCK_PERSON.name,
              confidence: MOCK_PERSON.confidence
            }
          ]);

        if (error) throw error;

        toast({
          title: "💾 Memory Secured",
          description: "Summary stored in your neural archive.",
        });
      } catch (dbError) {
        console.error("Supabase storage failed, saving locally:", dbError);
        localStorage.setItem(`last_memory_${MOCK_PERSON.name}`, summary);
        setLastMemorySummary(summary);
        toast({
          title: "📴 Offline Mode",
          description: "Supabase is down. Memory saved locally on this device.",
        });
      }

      setTimeout(() => {
        setShowCard(prev => prev && currentSummary === summary ? false : prev);
      }, 15000);

    } catch (error) {
      console.error("Summary Generation Error:", error);
      setIsSummarizing(false);
      toast({
        title: "❌ Analysis Error",
        description: "Failed to process the summary with Groq.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-background">
      <VisionLayer />
      <HUDOverlay />

      <MemoryCard
        visible={showCard}
        name={MOCK_PERSON.name}
        relation={MOCK_PERSON.relation}
        lastContext={lastMemorySummary || MOCK_PERSON.lastContext}
        confidence={MOCK_PERSON.confidence}
        summary={currentSummary}
        isSummarizing={isSummarizing}
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
