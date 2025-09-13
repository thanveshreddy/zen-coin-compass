import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MoodEntry {
  date: string;
  mood: number;
  energy: number;
  stress: number;
  sleep: number;
  academicStress: number;
  socialConnection: number;
}

interface MoodTrendChartProps {
  entries: MoodEntry[];
}

export const MoodTrendChart = ({ entries }: MoodTrendChartProps) => {
  // Sort entries by date and format for chart
  const chartData = entries
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(-30) // Show last 30 days
    .map(entry => ({
      ...entry,
      displayDate: new Date(entry.date).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      })
    }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.dataKey.charAt(0).toUpperCase() + entry.dataKey.slice(1)}: {entry.value}/5
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <CardHeader>
        <CardTitle className="text-xl">Wellness Trends (Last 30 Days)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="displayDate" 
                tick={{ fontSize: 12 }}
                tickLine={{ stroke: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis 
                domain={[1, 5]} 
                tick={{ fontSize: 12 }}
                tickLine={{ stroke: 'hsl(var(--muted-foreground))' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="mood" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                name="Mood"
              />
              <Line 
                type="monotone" 
                dataKey="energy" 
                stroke="hsl(var(--success))" 
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--success))', strokeWidth: 2, r: 4 }}
                name="Energy"
              />
              <Line 
                type="monotone" 
                dataKey="stress" 
                stroke="hsl(var(--accent))" 
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--accent))', strokeWidth: 2, r: 4 }}
                name="Stress"
              />
              <Line 
                type="monotone" 
                dataKey="sleep" 
                stroke="hsl(var(--chart-3))" 
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--chart-3))', strokeWidth: 2, r: 3 }}
                name="Sleep"
              />
              <Line 
                type="monotone" 
                dataKey="academicStress" 
                stroke="hsl(var(--destructive))" 
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--destructive))', strokeWidth: 2, r: 3 }}
                name="Academic Stress"
              />
              <Line 
                type="monotone" 
                dataKey="socialConnection" 
                stroke="hsl(var(--chart-5))" 
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--chart-5))', strokeWidth: 2, r: 3 }}
                name="Social Connection"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-6 pt-6 border-t border-border">
          <div className="text-center space-y-1">
            <p className="text-sm text-muted-foreground">Avg Mood</p>
            <p className="text-xl font-semibold text-primary">
              {(entries.reduce((sum, entry) => sum + entry.mood, 0) / entries.length).toFixed(1)}/5
            </p>
          </div>
          <div className="text-center space-y-1">
            <p className="text-sm text-muted-foreground">Avg Energy</p>
            <p className="text-xl font-semibold text-success">
              {(entries.reduce((sum, entry) => sum + entry.energy, 0) / entries.length).toFixed(1)}/5
            </p>
          </div>
          <div className="text-center space-y-1">
            <p className="text-sm text-muted-foreground">Avg Stress</p>
            <p className="text-xl font-semibold text-accent">
              {(entries.reduce((sum, entry) => sum + entry.stress, 0) / entries.length).toFixed(1)}/5
            </p>
          </div>
          <div className="text-center space-y-1">
            <p className="text-sm text-muted-foreground">Avg Sleep</p>
            <p className="text-xl font-semibold text-chart-3">
              {(entries.reduce((sum, entry) => sum + entry.sleep, 0) / entries.length).toFixed(1)}/5
            </p>
          </div>
          <div className="text-center space-y-1">
            <p className="text-sm text-muted-foreground">Academic</p>
            <p className="text-xl font-semibold text-destructive">
              {(entries.reduce((sum, entry) => sum + entry.academicStress, 0) / entries.length).toFixed(1)}/5
            </p>
          </div>
          <div className="text-center space-y-1">
            <p className="text-sm text-muted-foreground">Social</p>
            <p className="text-xl font-semibold text-chart-5">
              {(entries.reduce((sum, entry) => sum + entry.socialConnection, 0) / entries.length).toFixed(1)}/5
            </p>
          </div>
        </div>
      </CardContent>
    </>
  );
};