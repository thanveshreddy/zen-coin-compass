import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Lightbulb, 
  Activity, 
  Coffee, 
  Moon, 
  Heart, 
  Zap,
  TreePine,
  Headphones,
  Book
} from "lucide-react";

interface MoodEntry {
  date: string;
  mood: number;
  energy: number;
  stress: number;
  sleep: number;
  academicStress: number;
  socialConnection: number;
}

interface WellnessRecommendationsProps {
  recentMood: MoodEntry | null;
  moodHistory: MoodEntry[];
}

interface Recommendation {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  priority: number;
}

export const WellnessRecommendations = ({ recentMood, moodHistory }: WellnessRecommendationsProps) => {
  const getRecommendations = (): Recommendation[] => {
    const recommendations: Recommendation[] = [];
    const avgMood = moodHistory.length > 0 
      ? moodHistory.reduce((sum, entry) => sum + entry.mood, 0) / moodHistory.length 
      : 3;
    const avgEnergy = moodHistory.length > 0 
      ? moodHistory.reduce((sum, entry) => sum + entry.energy, 0) / moodHistory.length 
      : 3;
    const avgStress = moodHistory.length > 0 
      ? moodHistory.reduce((sum, entry) => sum + entry.stress, 0) / moodHistory.length 
      : 3;
    const avgSleep = moodHistory.length > 0 
      ? moodHistory.reduce((sum, entry) => sum + entry.sleep, 0) / moodHistory.length 
      : 3;
    const avgAcademicStress = moodHistory.length > 0 
      ? moodHistory.reduce((sum, entry) => sum + entry.academicStress, 0) / moodHistory.length 
      : 3;
    const avgSocialConnection = moodHistory.length > 0 
      ? moodHistory.reduce((sum, entry) => sum + entry.socialConnection, 0) / moodHistory.length 
      : 3;

    // Mood-based recommendations
    if (avgMood < 3) {
      recommendations.push({
        id: 'mood-boost',
        title: 'Practice Gratitude',
        description: 'Write down 3 things you\'re grateful for today. This simple practice can significantly improve your mood.',
        icon: <Heart className="h-5 w-5" />,
        category: 'Mood',
        priority: 1
      });
    }

    // Energy-based recommendations
    if (avgEnergy < 3) {
      recommendations.push({
        id: 'energy-boost',
        title: 'Take a Power Walk',
        description: 'A 10-15 minute walk outdoors can naturally boost your energy levels and improve focus.',
        icon: <Activity className="h-5 w-5" />,
        category: 'Energy',
        priority: 1
      });
    }

    // Stress-based recommendations
    if (avgStress > 3) {
      recommendations.push({
        id: 'stress-relief',
        title: 'Deep Breathing Exercise',
        description: 'Try the 4-7-8 technique: Inhale for 4, hold for 7, exhale for 8. Repeat 4 times.',
        icon: <TreePine className="h-5 w-5" />,
        category: 'Stress',
        priority: 1
      });
    }

    // Sleep-based recommendations
    if (avgSleep < 3) {
      recommendations.push({
        id: 'sleep-improvement',
        title: 'Better Sleep Hygiene',
        description: 'Create a bedtime routine: dim lights 1 hour before bed, avoid screens, and keep a consistent schedule.',
        icon: <Moon className="h-5 w-5" />,
        category: 'Sleep',
        priority: 1
      });
    }

    // Academic stress recommendations
    if (avgAcademicStress > 3) {
      recommendations.push({
        id: 'study-break',
        title: 'Take Study Breaks',
        description: 'Use the Pomodoro technique: 25 minutes focused study, then 5-minute break.',
        icon: <Book className="h-5 w-5" />,
        category: 'Academic',
        priority: 1
      });
    }

    // Social connection recommendations
    if (avgSocialConnection < 3) {
      recommendations.push({
        id: 'social-connection',
        title: 'Reach Out to Friends',
        description: 'Send a message to a friend or family member. Human connection boosts wellbeing.',
        icon: <Heart className="h-5 w-5" />,
        category: 'Social',
        priority: 1
      });
    }

    // General wellness recommendations
    recommendations.push(
      {
        id: 'hydration',
        title: 'Stay Hydrated',
        description: 'Drink a glass of water now. Proper hydration supports both mental and physical wellbeing.',
        icon: <Coffee className="h-5 w-5" />,
        category: 'Health',
        priority: 2
      },
      {
        id: 'sleep',
        title: 'Optimize Your Sleep',
        description: 'Aim for 7-9 hours of quality sleep. Consider a consistent bedtime routine.',
        icon: <Moon className="h-5 w-5" />,
        category: 'Sleep',
        priority: 2
      },
      {
        id: 'mindfulness',
        title: 'Mindful Moment',
        description: 'Take 5 minutes to practice mindfulness or meditation using a guided app.',
        icon: <Headphones className="h-5 w-5" />,
        category: 'Mindfulness',
        priority: 2
      },
      {
        id: 'learning',
        title: 'Learn Something New',
        description: 'Engage your mind with a new skill, book, or interesting article for mental stimulation.',
        icon: <Book className="h-5 w-5" />,
        category: 'Growth',
        priority: 3
      }
    );

    return recommendations.sort((a, b) => a.priority - b.priority).slice(0, 6);
  };

  const recommendations = getRecommendations();

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Mood': return 'bg-primary/10 text-primary';
      case 'Energy': return 'bg-success/10 text-success';
      case 'Stress': return 'bg-accent/10 text-accent';
      case 'Sleep': return 'bg-secondary/20 text-secondary-foreground';
      case 'Academic': return 'bg-destructive/10 text-destructive';
      case 'Social': return 'bg-chart-3/20 text-chart-3';
      case 'Health': return 'bg-wellness/20 text-wellness-foreground';
      case 'Mindfulness': return 'bg-calm/20 text-calm-foreground';
      case 'Growth': return 'bg-muted/50 text-muted-foreground';
      default: return 'bg-muted/50 text-muted-foreground';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {recommendations.map((rec) => (
        <Card key={rec.id} className="bg-gradient-card backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-full bg-primary/10">
                  {rec.icon}
                </div>
                <Badge variant="outline" className={getCategoryColor(rec.category)}>
                  {rec.category}
                </Badge>
              </div>
            </div>
            <CardTitle className="text-lg leading-tight">{rec.title}</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              {rec.description}
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full hover:bg-primary/5"
            >
              <Lightbulb className="h-4 w-4 mr-2" />
              Try This
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};