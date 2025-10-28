import { Volume2, Copy, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Translation } from "./TranslatorInterface";
import { useState } from "react";
import { toast } from "sonner";

interface TranslationResultProps {
  translation: Translation;
}

export const TranslationResult = ({ translation }: TranslationResultProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(translation.translatedText);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const playAudio = () => {
    const utterance = new SpeechSynthesisUtterance(translation.translatedText);
    utterance.lang = getLanguageCode(translation.targetLanguage);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <Card className="p-6 space-y-6 bg-gradient-subtle backdrop-blur-sm border-border shadow-card">
      {/* Header with badges */}
      <div className="flex flex-wrap items-center gap-3">
        <Badge className="bg-accent/20 text-accent border-accent/30">
          Accent: {translation.accent}
        </Badge>
        <Badge className="bg-success/20 text-success border-success/30">
          Confidence: {translation.confidence.toFixed(1)}%
        </Badge>
      </div>

      {/* Source Text */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Original ({translation.sourceLanguage.toUpperCase()})
        </h3>
        <p className="text-lg text-foreground">
          {translation.sourceText}
        </p>
      </div>

      {/* Divider */}
      <div className="h-px bg-border" />

      {/* Translated Text */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Translation ({translation.targetLanguage.toUpperCase()})
        </h3>
        <p className="text-xl font-medium text-foreground">
          {translation.translatedText}
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button
          onClick={playAudio}
          variant="outline"
          className="flex-1 border-border hover:bg-secondary"
        >
          <Volume2 className="w-4 h-4 mr-2" />
          Play Audio
        </Button>
        <Button
          onClick={copyToClipboard}
          variant="outline"
          className="flex-1 border-border hover:bg-secondary"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </>
          )}
        </Button>
      </div>

      {/* Confidence Meter */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Accuracy</span>
          <span>{translation.confidence.toFixed(1)}%</span>
        </div>
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-accent transition-all duration-500"
            style={{ width: `${translation.confidence}%` }}
          />
        </div>
      </div>
    </Card>
  );
};

const getLanguageCode = (lang: string): string => {
  const codes: Record<string, string> = {
    es: "es-ES",
    fr: "fr-FR",
    de: "de-DE",
    it: "it-IT",
    pt: "pt-PT",
    hi: "hi-IN",
    zh: "zh-CN",
    ja: "ja-JP",
    ar: "ar-SA",
  };
  return codes[lang] || "en-US";
};
