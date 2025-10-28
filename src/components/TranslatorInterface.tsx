import { useState } from "react";
import { RecorderPanel } from "./RecorderPanel";
import { TranslationResult } from "./TranslationResult";
import { TranslationHistory } from "./TranslationHistory";

export interface Translation {
  id: string;
  sourceText: string;
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
  accent: string;
  confidence: number;
  timestamp: Date;
}

export const TranslatorInterface = () => {
  const [currentTranslation, setCurrentTranslation] = useState<Translation | null>(null);
  const [history, setHistory] = useState<Translation[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleTranslationComplete = (translation: Translation) => {
    setCurrentTranslation(translation);
    setHistory(prev => [translation, ...prev]);
    setIsProcessing(false);
  };

  return (
    <section className="min-h-screen px-4 py-12">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            AI Translator
          </h2>
          <p className="text-muted-foreground">
            Speak naturally and let AI handle the rest
          </p>
        </div>

        {/* Main Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Recorder */}
          <div className="lg:col-span-2 space-y-6">
            <RecorderPanel 
              onTranslationComplete={handleTranslationComplete}
              isProcessing={isProcessing}
              setIsProcessing={setIsProcessing}
            />
            
            {currentTranslation && (
              <TranslationResult translation={currentTranslation} />
            )}
          </div>

          {/* Right: History */}
          <div className="lg:col-span-1">
            <TranslationHistory history={history} />
          </div>
        </div>
      </div>
    </section>
  );
};
