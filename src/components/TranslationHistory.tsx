import { Clock, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Translation } from "./TranslatorInterface";
import { Badge } from "@/components/ui/badge";

interface TranslationHistoryProps {
  history: Translation[];
}

export const TranslationHistory = ({ history }: TranslationHistoryProps) => {
  if (history.length === 0) {
    return (
      <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Clock className="w-12 h-12 text-muted-foreground mb-4" />
          <h3 className="font-semibold text-foreground mb-2">No History Yet</h3>
          <p className="text-sm text-muted-foreground">
            Your translations will appear here
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm border-border h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          <Clock className="w-5 h-5 text-accent" />
          Recent Translations
        </h3>
        <Badge variant="secondary">{history.length}</Badge>
      </div>

      <ScrollArea className="h-[600px] pr-4">
        <div className="space-y-4">
          {history.map((item) => (
            <Card 
              key={item.id}
              className="p-4 bg-secondary/50 border-border hover:bg-secondary/70 transition-colors cursor-pointer"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm text-foreground line-clamp-2">
                    {item.sourceText}
                  </p>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-6 w-6 shrink-0"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
                
                <p className="text-xs text-muted-foreground line-clamp-1">
                  → {item.translatedText}
                </p>
                
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Badge variant="outline" className="text-xs">
                    {item.accent}
                  </Badge>
                  <span>•</span>
                  <span>{item.confidence.toFixed(0)}%</span>
                  <span>•</span>
                  <span>{formatTime(item.timestamp)}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};

const formatTime = (date: Date): string => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  
  return date.toLocaleDateString();
};
