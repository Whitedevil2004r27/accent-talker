import { useState, useRef, useEffect } from "react";
import { Mic, MicOff, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { WaveformVisualizer } from "./WaveformVisualizer";
import { Translation } from "./TranslatorInterface";
import { toast } from "sonner";

interface RecorderPanelProps {
  onTranslationComplete: (translation: Translation) => void;
  isProcessing: boolean;
  setIsProcessing: (processing: boolean) => void;
}

export const RecorderPanel = ({ onTranslationComplete, isProcessing, setIsProcessing }: RecorderPanelProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [targetLanguage, setTargetLanguage] = useState("es");
  const [audioLevel, setAudioLevel] = useState(0);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Check if browser supports speech recognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      
      recognitionRef.current.onresult = async (event: any) => {
        const transcript = event.results[0][0].transcript;
        const confidence = event.results[0][0].confidence;
        
        setIsProcessing(true);
        
        // Simulate translation and accent detection
        setTimeout(() => {
          const translation: Translation = {
            id: Date.now().toString(),
            sourceText: transcript,
            translatedText: simulateTranslation(transcript, targetLanguage),
            sourceLanguage: "en",
            targetLanguage,
            accent: detectAccent(),
            confidence: confidence * 100,
            timestamp: new Date(),
          };
          
          onTranslationComplete(translation);
          toast.success("Translation completed!");
        }, 1500);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        setIsRecording(false);
        setIsProcessing(false);
        toast.error("Error: " + event.error);
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    }
  }, [targetLanguage, onTranslationComplete, setIsProcessing]);

  const startRecording = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
        setIsRecording(true);
        // Simulate audio levels
        const interval = setInterval(() => {
          setAudioLevel(Math.random() * 100);
        }, 100);
        
        recognitionRef.current.onend = () => {
          clearInterval(interval);
          setIsRecording(false);
          setAudioLevel(0);
        };
      } catch (error) {
        console.error("Error starting recognition:", error);
        toast.error("Failed to start recording. Please check microphone permissions.");
      }
    } else {
      toast.error("Speech recognition not supported in this browser.");
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop();
    }
  };

  return (
    <Card className="p-6 space-y-6 bg-card/50 backdrop-blur-sm border-border shadow-card">
      {/* Language Selector */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Languages className="w-5 h-5" />
          <span className="text-sm font-medium">Translate to:</span>
        </div>
        <Select value={targetLanguage} onValueChange={setTargetLanguage}>
          <SelectTrigger className="w-[180px] bg-secondary border-border">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="es">Spanish</SelectItem>
            <SelectItem value="fr">French</SelectItem>
            <SelectItem value="de">German</SelectItem>
            <SelectItem value="it">Italian</SelectItem>
            <SelectItem value="pt">Portuguese</SelectItem>
            <SelectItem value="hi">Hindi</SelectItem>
            <SelectItem value="zh">Chinese</SelectItem>
            <SelectItem value="ja">Japanese</SelectItem>
            <SelectItem value="ar">Arabic</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Waveform Visualizer */}
      <WaveformVisualizer isRecording={isRecording} audioLevel={audioLevel} />

      {/* Record Button */}
      <div className="flex justify-center">
        {!isRecording ? (
          <Button
            size="lg"
            onClick={startRecording}
            disabled={isProcessing}
            className="bg-gradient-primary hover:shadow-glow transition-all duration-300 h-16 px-8 text-lg"
          >
            <Mic className="w-6 h-6 mr-2" />
            Start Recording
          </Button>
        ) : (
          <Button
            size="lg"
            onClick={stopRecording}
            variant="destructive"
            className="h-16 px-8 text-lg animate-pulse-glow"
          >
            <MicOff className="w-6 h-6 mr-2" />
            Stop Recording
          </Button>
        )}
      </div>

      {isProcessing && (
        <div className="text-center text-sm text-muted-foreground">
          Processing your speech...
        </div>
      )}
    </Card>
  );
};

// Helper functions for simulation
const simulateTranslation = (text: string, targetLang: string): string => {
  const translations: Record<string, string> = {
    es: "Traducción simulada al español",
    fr: "Traduction simulée en français",
    de: "Simulierte Übersetzung auf Deutsch",
    it: "Traduzione simulata in italiano",
    pt: "Tradução simulada para português",
    hi: "अनुवाद सिमुलेटेड हिंदी में",
    zh: "模拟中文翻译",
    ja: "日本語への模擬翻訳",
    ar: "ترجمة محاكاة باللغة العربية",
  };
  return translations[targetLang] || text;
};

const detectAccent = (): string => {
  const accents = [
    "American English",
    "British English", 
    "Indian English",
    "Australian English",
    "Canadian English",
  ];
  return accents[Math.floor(Math.random() * accents.length)];
};
