import { Mic, Globe2, Volume2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Hero = ({ onGetStarted }: { onGetStarted: () => void }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-20">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-card" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.1),transparent_50%)]" />
      
      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur-sm border border-border">
          <Sparkles className="w-4 h-4 text-accent" />
          <span className="text-sm text-muted-foreground">Powered by Advanced AI</span>
        </div>

        {/* Main heading */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          <span className="bg-gradient-primary bg-clip-text text-transparent">
            AI-Driven Translation
          </span>
          <br />
          <span className="text-foreground">with Accent Recognition</span>
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Real-time speech translation that understands your accent. 
          Speak naturally, translate accurately.
        </p>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto pt-8">
          <div className="flex flex-col items-center gap-3 p-6 rounded-xl bg-card/30 backdrop-blur-sm border border-border">
            <div className="p-3 rounded-lg bg-gradient-primary">
              <Mic className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="font-semibold text-foreground">Accent Detection</h3>
            <p className="text-sm text-muted-foreground">Recognizes 20+ accents</p>
          </div>

          <div className="flex flex-col items-center gap-3 p-6 rounded-xl bg-card/30 backdrop-blur-sm border border-border">
            <div className="p-3 rounded-lg bg-gradient-accent">
              <Globe2 className="w-6 h-6 text-accent-foreground" />
            </div>
            <h3 className="font-semibold text-foreground">Real-time Translation</h3>
            <p className="text-sm text-muted-foreground">50+ languages supported</p>
          </div>

          <div className="flex flex-col items-center gap-3 p-6 rounded-xl bg-card/30 backdrop-blur-sm border border-border">
            <div className="p-3 rounded-lg bg-gradient-primary">
              <Volume2 className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="font-semibold text-foreground">Adaptive Voice</h3>
            <p className="text-sm text-muted-foreground">Natural pronunciation</p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="pt-8">
          <Button 
            size="lg"
            onClick={onGetStarted}
            className="bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg px-8 py-6 h-auto"
          >
            <Mic className="w-5 h-5 mr-2" />
            Start Translating
          </Button>
        </div>
      </div>
    </section>
  );
};
