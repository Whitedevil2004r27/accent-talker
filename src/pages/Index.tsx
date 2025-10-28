import { useState } from "react";
import { Hero } from "@/components/Hero";
import { TranslatorInterface } from "@/components/TranslatorInterface";

const Index = () => {
  const [showTranslator, setShowTranslator] = useState(false);

  return (
    <main className="min-h-screen bg-background">
      {!showTranslator ? (
        <Hero onGetStarted={() => setShowTranslator(true)} />
      ) : (
        <TranslatorInterface />
      )}
    </main>
  );
};

export default Index;
