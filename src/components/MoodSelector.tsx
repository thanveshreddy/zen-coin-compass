import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";

interface MoodSelectorProps {
  onMoodSubmit: (mood: number, energy: number, stress: number) => void;
  todaysMood: { mood: number; energy: number; stress: number } | null;
}

const moodEmojis = ["😢", "😟", "😐", "🙂", "😊"];
const moodLabels = ["Very Low", "Low", "Neutral", "Good", "Great"];

export const MoodSelector = ({ onMoodSubmit, todaysMood }: MoodSelectorProps) => {
  const [mood, setMood] = useState(todaysMood?.mood || 3);
  const [energy, setEnergy] = useState(todaysMood?.energy || 3);
  const [stress, setStress] = useState(todaysMood?.stress || 3);

  const handleSubmit = () => {
    onMoodSubmit(mood, energy, stress);
  };

  if (todaysMood) {
    return (
      <CardContent className="p-8 text-center space-y-4">
        <div className="flex items-center justify-center gap-2 text-success">
          <CheckCircle className="h-6 w-6" />
          <span className="font-medium">Check-in Complete!</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">Mood</p>
            <div className="text-4xl">{moodEmojis[todaysMood.mood - 1]}</div>
            <Badge variant="secondary">{moodLabels[todaysMood.mood - 1]}</Badge>
          </div>
          
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">Energy</p>
            <div className="text-2xl font-semibold text-primary">{todaysMood.energy}/5</div>
            <Badge variant="outline">Energy Level</Badge>
          </div>
          
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">Stress</p>
            <div className="text-2xl font-semibold text-accent">{todaysMood.stress}/5</div>
            <Badge variant="outline">Stress Level</Badge>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground mt-4">
          Come back tomorrow for your next check-in
        </p>
      </CardContent>
    );
  }

  return (
    <CardContent className="p-8 space-y-8">
      {/* Mood Selection */}
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-medium mb-2">Overall Mood</h3>
          <div className="flex justify-center items-center gap-4 mb-4">
            {moodEmojis.map((emoji, index) => (
              <button
                key={index}
                onClick={() => setMood(index + 1)}
                className={`text-4xl p-2 rounded-full transition-all duration-200 ${
                  mood === index + 1 
                    ? 'bg-primary/20 scale-110 shadow-lg' 
                    : 'hover:bg-muted/50 hover:scale-105'
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
          <Badge variant="secondary" className="text-sm">
            {moodLabels[mood - 1]}
          </Badge>
        </div>
      </div>

      {/* Energy Level */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Energy Level</h3>
          <span className="text-sm text-muted-foreground">{energy}/5</span>
        </div>
        <Slider
          value={[energy]}
          onValueChange={(value) => setEnergy(value[0])}
          max={5}
          min={1}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Exhausted</span>
          <span>Energized</span>
        </div>
      </div>

      {/* Stress Level */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Stress Level</h3>
          <span className="text-sm text-muted-foreground">{stress}/5</span>
        </div>
        <Slider
          value={[stress]}
          onValueChange={(value) => setStress(value[0])}
          max={5}
          min={1}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Very Calm</span>
          <span>Very Stressed</span>
        </div>
      </div>

      <Button 
        onClick={handleSubmit}
        className="w-full bg-gradient-primary hover:opacity-90 text-primary-foreground"
        size="lg"
      >
        Complete Today's Check-in
      </Button>
    </CardContent>
  );
};