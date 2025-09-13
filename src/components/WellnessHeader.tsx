import { Heart, Brain } from "lucide-react";

export const WellnessHeader = () => {
  return (
    <header className="bg-gradient-primary backdrop-blur-sm border-b border-white/20">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-primary-foreground">
              <Brain className="h-8 w-8" />
              <Heart className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary-foreground">
                MindfulMoments
              </h1>
              <p className="text-primary-foreground/80 text-sm">
                Your daily wellness companion
              </p>
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-primary-foreground/90 text-sm">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long',
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};