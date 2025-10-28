import { useEffect, useRef } from "react";

interface WaveformVisualizerProps {
  isRecording: boolean;
  audioLevel: number;
}

export const WaveformVisualizer = ({ isRecording, audioLevel }: WaveformVisualizerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw waveform
    const barCount = 60;
    const barWidth = width / barCount;
    const centerY = height / 2;

    for (let i = 0; i < barCount; i++) {
      const barHeight = isRecording 
        ? Math.random() * (audioLevel / 100) * height * 0.8
        : height * 0.1;
      
      const x = i * barWidth;
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, "hsl(243, 75%, 59%)");
      gradient.addColorStop(1, "hsl(187, 95%, 43%)");
      
      ctx.fillStyle = gradient;
      ctx.fillRect(x, centerY - barHeight / 2, barWidth - 2, barHeight);
    }
  }, [isRecording, audioLevel]);

  return (
    <div className="relative rounded-xl overflow-hidden bg-secondary/50 p-8">
      <canvas 
        ref={canvasRef}
        width={800}
        height={200}
        className="w-full h-40"
      />
      {!isRecording && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-sm text-muted-foreground">
            Click "Start Recording" to begin
          </p>
        </div>
      )}
    </div>
  );
};
