import { useState, useEffect } from "react";
import { MoodSelector } from "@/components/MoodSelector";
import { MoodTrendChart } from "@/components/MoodTrendChart";
import { WellnessRecommendations } from "@/components/WellnessRecommendations";
import { WellnessHeader } from "@/components/WellnessHeader";
import { Card } from "@/components/ui/card";

interface MoodEntry {
  date: string;
  mood: number;
  energy: number;
  stress: number;
}

const Index = () => {
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [todaysMood, setTodaysMood] = useState<MoodEntry | null>(null);

  useEffect(() => {
    // Load existing mood data from localStorage
    const savedEntries = localStorage.getItem('moodEntries');
    if (savedEntries) {
      setMoodEntries(JSON.parse(savedEntries));
    }

    // Check if today's mood is already recorded
    const today = new Date().toISOString().split('T')[0];
    const todaysEntry = JSON.parse(savedEntries || '[]').find(
      (entry: MoodEntry) => entry.date === today
    );
    setTodaysMood(todaysEntry || null);
  }, []);

  const handleMoodSubmit = (mood: number, energy: number, stress: number) => {
    const today = new Date().toISOString().split('T')[0];
    const newEntry: MoodEntry = { date: today, mood, energy, stress };
    
    const updatedEntries = moodEntries.filter(entry => entry.date !== today);
    updatedEntries.push(newEntry);
    
    setMoodEntries(updatedEntries);
    setTodaysMood(newEntry);
    localStorage.setItem('moodEntries', JSON.stringify(updatedEntries));
  };

  return (
    <div className="min-h-screen bg-gradient-wellness">
      <WellnessHeader />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Daily Check-in Section */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-foreground">
              How are you feeling today?
            </h1>
            <p className="text-muted-foreground">
              Take a moment to check in with yourself
            </p>
          </div>
          
          <Card className="bg-gradient-card backdrop-blur-sm border-0 shadow-lg">
            <MoodSelector 
              onMoodSubmit={handleMoodSubmit}
              todaysMood={todaysMood}
            />
          </Card>
        </section>

        {/* Mood Trends Section */}
        {moodEntries.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground">
              Your Wellness Journey
            </h2>
            
            <Card className="bg-gradient-card backdrop-blur-sm border-0 shadow-lg">
              <MoodTrendChart entries={moodEntries} />
            </Card>
          </section>
        )}

        {/* Wellness Recommendations */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">
            Personalized Wellness Tips
          </h2>
          
          <WellnessRecommendations 
            recentMood={todaysMood}
            moodHistory={moodEntries}
          />
        </section>
      </main>
    </div>
  );
};

export default Index;