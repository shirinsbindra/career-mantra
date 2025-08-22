import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  CheckCircle, 
  Clock, 
  BookOpen, 
  Video, 
  FileText, 
  ExternalLink,
  RefreshCw,
  Calendar,
  Target,
  TrendingUp,
  Award,
  ArrowLeft,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';
import { ParsedProfile } from './UploadPanel';
import { UserPreferences } from './AlignmentWizard';

interface RoadmapProps {
  profile: ParsedProfile;
  preferences: UserPreferences;
  selectedCareer: any;
  onBack: () => void;
}

interface Task {
  id: string;
  title: string;
  description: string;
  duration: number; // minutes
  type: 'video' | 'reading' | 'practice' | 'project';
  resource: {
    title: string;
    url: string;
    provider: string;
    free: boolean;
  };
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  skills: string[];
}

interface DayPlan {
  day: number;
  date: string;
  theme: string;
  tasks: Task[];
  totalMinutes: number;
  completedTasks: number;
}

export const Roadmap = ({ profile, preferences, selectedCareer, onBack }: RoadmapProps) => {
  const [activeDay, setActiveDay] = useState(1);
  const [roadmapData, setRoadmapData] = useState<DayPlan[]>(generateRoadmap());
  const [studyTimer, setStudyTimer] = useState({ isRunning: false, minutes: 0 });

  function generateRoadmap(): DayPlan[] {
    const baseTasks: Omit<Task, 'id' | 'completed'>[] = [
      {
        title: "React Fundamentals Deep Dive",
        description: "Master component lifecycle, hooks, and state management",
        duration: 90,
        type: 'video',
        resource: {
          title: "React Official Tutorial",
          url: "https://react.dev/learn",
          provider: "React.dev",
          free: true
        },
        priority: 'high',
        skills: ['React', 'JavaScript', 'Components']
      },
      {
        title: "Build Todo App with Hooks",
        description: "Practice useState, useEffect, and custom hooks",
        duration: 120,
        type: 'project',
        resource: {
          title: "React Hooks Guide",
          url: "https://react.dev/reference/react",
          provider: "React.dev",
          free: true
        },
        priority: 'high',
        skills: ['React Hooks', 'State Management']
      },
      {
        title: "CSS Grid and Flexbox Mastery",
        description: "Modern layout techniques for responsive design",
        duration: 75,
        type: 'video',
        resource: {
          title: "CSS Grid Complete Guide",
          url: "https://css-tricks.com/snippets/css/complete-guide-grid/",
          provider: "CSS-Tricks",
          free: true
        },
        priority: 'medium',
        skills: ['CSS', 'Layout', 'Responsive Design']
      },
      {
        title: "JavaScript ES6+ Features",
        description: "Arrow functions, destructuring, async/await, modules",
        duration: 60,
        type: 'reading',
        resource: {
          title: "Modern JavaScript Tutorial",
          url: "https://javascript.info/",
          provider: "JavaScript.info",
          free: true
        },
        priority: 'high',
        skills: ['JavaScript', 'ES6+', 'Async Programming']
      },
      {
        title: "Git Version Control",
        description: "Branching, merging, collaboration workflows",
        duration: 45,
        type: 'practice',
        resource: {
          title: "Learn Git Branching",
          url: "https://learngitbranching.js.org/",
          provider: "Interactive Tutorial",
          free: true
        },
        priority: 'medium',
        skills: ['Git', 'Version Control', 'Collaboration']
      },
      {
        title: "Build Portfolio Website",
        description: "Showcase your skills with a personal portfolio",
        duration: 180,
        type: 'project',
        resource: {
          title: "Portfolio Best Practices",
          url: "https://www.freecodecamp.org/news/how-to-build-a-developer-portfolio-website/",
          provider: "freeCodeCamp",
          free: true
        },
        priority: 'high',
        skills: ['Portfolio', 'HTML/CSS', 'JavaScript']
      },
      {
        title: "API Integration with Fetch",
        description: "Consuming REST APIs and handling async data",
        duration: 90,
        type: 'practice',
        resource: {
          title: "Fetch API Tutorial",
          url: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
          provider: "MDN",
          free: true
        },
        priority: 'high',
        skills: ['APIs', 'Fetch', 'Async/Await']
      }
    ];

    const themes = [
      "Foundation Building",
      "React Mastery", 
      "Styling & Layout",
      "API Integration",
      "Project Development",
      "Advanced Patterns",
      "Portfolio & Deployment"
    ];

    return Array.from({ length: 7 }, (_, i) => {
      const day = i + 1;
      const tasksForDay = baseTasks.slice(i, i + 2).map(task => ({
        ...task,
        id: `day-${day}-task-${Math.random().toString(36).substr(2, 9)}`,
        completed: Math.random() > 0.7 // Some tasks randomly completed for demo
      }));

      const totalMinutes = tasksForDay.reduce((sum, task) => sum + task.duration, 0);
      const completedTasks = tasksForDay.filter(task => task.completed).length;

      return {
        day,
        date: new Date(Date.now() + day * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { 
          weekday: 'short', 
          month: 'short', 
          day: 'numeric' 
        }),
        theme: themes[i] || `Day ${day} Focus`,
        tasks: tasksForDay,
        totalMinutes,
        completedTasks
      };
    });
  }

  const toggleTaskCompletion = (dayIndex: number, taskId: string) => {
    const newRoadmap = [...roadmapData];
    const task = newRoadmap[dayIndex].tasks.find(t => t.id === taskId);
    if (task) {
      task.completed = !task.completed;
      newRoadmap[dayIndex].completedTasks = newRoadmap[dayIndex].tasks.filter(t => t.completed).length;
      setRoadmapData(newRoadmap);
    }
  };

  const regenerateRoadmap = () => {
    setRoadmapData(generateRoadmap());
  };

  const startStudyTimer = () => {
    setStudyTimer({ isRunning: true, minutes: 0 });
    // In a real app, you'd implement the actual timer logic
  };

  const pauseStudyTimer = () => {
    setStudyTimer(prev => ({ ...prev, isRunning: false }));
  };

  const resetStudyTimer = () => {
    setStudyTimer({ isRunning: false, minutes: 0 });
  };

  const totalProgress = roadmapData.reduce((acc, day) => {
    return acc + (day.completedTasks / day.tasks.length) * 100;
  }, 0) / roadmapData.length;

  const totalCompletedTasks = roadmapData.reduce((acc, day) => acc + day.completedTasks, 0);
  const totalTasks = roadmapData.reduce((acc, day) => acc + day.tasks.length, 0);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-4 w-4" />;
      case 'reading': return <FileText className="h-4 w-4" />;
      case 'practice': return <Target className="h-4 w-4" />;
      case 'project': return <Award className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'text-red-400';
      case 'reading': return 'text-blue-400';
      case 'practice': return 'text-green-400';
      case 'project': return 'text-purple-400';
      default: return 'text-gray-400';
    }
  };

  const currentDay = roadmapData[activeDay - 1];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack} className="glass-card">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold gradient-text">Learning Roadmap</h1>
            <p className="text-muted-foreground">
              Your personalized 7-day plan for {selectedCareer?.title || 'Frontend Developer'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={regenerateRoadmap} className="glass-card">
            <RefreshCw className="h-4 w-4 mr-2" />
            Regenerate Plan
          </Button>
        </div>
      </div>

      {/* Progress Overview */}
      <Card className="glass-card border-none bg-gradient-to-r from-accent/20 to-accent/10">
        <CardContent className="p-6">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">{Math.round(totalProgress)}%</div>
              <div className="text-sm text-muted-foreground">Overall Progress</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-mentra-green">{totalCompletedTasks}</div>
              <div className="text-sm text-muted-foreground">Tasks Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-mentra-cyan">{totalTasks - totalCompletedTasks}</div>
              <div className="text-sm text-muted-foreground">Tasks Remaining</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-mentra-purple">{preferences.weeklyCommitment}h</div>
              <div className="text-sm text-muted-foreground">Weekly Goal</div>
            </div>
          </div>
          <div className="mt-6">
            <Progress value={totalProgress} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Study Timer */}
      <Card className="glass-card border-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-mentra-cyan" />
            Study Timer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-2xl font-bold">
                {Math.floor(studyTimer.minutes / 60).toString().padStart(2, '0')}:
                {(studyTimer.minutes % 60).toString().padStart(2, '0')}
              </div>
              <div className="flex items-center gap-2">
                {!studyTimer.isRunning ? (
                  <Button size="sm" onClick={startStudyTimer} className="bg-gradient-primary text-background">
                    <Play className="h-4 w-4 mr-1" />
                    Start
                  </Button>
                ) : (
                  <Button size="sm" onClick={pauseStudyTimer} variant="outline">
                    <Pause className="h-4 w-4 mr-1" />
                    Pause
                  </Button>
                )}
                <Button size="sm" variant="outline" onClick={resetStudyTimer}>
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Badge variant="outline" className={studyTimer.isRunning ? 'bg-green-500/20 text-green-400' : ''}>
              {studyTimer.isRunning ? 'Active' : 'Inactive'}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="grid lg:grid-cols-4 gap-6">
        {/* Day Navigation */}
        <Card className="glass-card border-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-mentra-green" />
              Daily Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {roadmapData.map((day) => (
                <Button
                  key={day.day}
                  variant={activeDay === day.day ? "default" : "ghost"}
                  className={`w-full justify-start ${
                    activeDay === day.day 
                      ? 'bg-gradient-primary text-background' 
                      : 'glass-card hover:bg-accent/50'
                  }`}
                  onClick={() => setActiveDay(day.day)}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="text-left">
                      <div className="font-medium">Day {day.day}</div>
                      <div className="text-xs opacity-70">{day.date}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs">{day.completedTasks}/{day.tasks.length}</div>
                      <div className="w-16 h-1 bg-background/20 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-background/80 transition-all duration-300"
                          style={{ width: `${(day.completedTasks / day.tasks.length) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Day Details */}
        <div className="lg:col-span-3">
          <Card className="glass-card border-none">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Day {currentDay.day}: {currentDay.theme}</CardTitle>
                  <p className="text-muted-foreground">{currentDay.date}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">
                    {Math.round(currentDay.totalMinutes / 60 * 10) / 10} hours total
                  </div>
                  <Badge variant="outline">
                    {currentDay.completedTasks}/{currentDay.tasks.length} completed
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentDay.tasks.map((task) => (
                  <Card key={task.id} className={`border transition-all duration-200 ${
                    task.completed 
                      ? 'bg-accent/20 border-accent/40' 
                      : 'hover:bg-accent/10 border-border'
                  }`}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => toggleTaskCompletion(activeDay - 1, task.id)}
                          className={`p-1 h-6 w-6 rounded-full ${
                            task.completed 
                              ? 'bg-mentra-green hover:bg-mentra-green/80' 
                              : 'border-2 border-muted-foreground hover:border-mentra-green'
                          }`}
                        >
                          {task.completed && <CheckCircle className="h-4 w-4 text-background" />}
                        </Button>
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className={`font-semibold ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                                {task.title}
                              </h4>
                              <p className="text-sm text-muted-foreground mt-1">
                                {task.description}
                              </p>
                              
                              <div className="flex items-center gap-4 mt-3">
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <div className={getTypeColor(task.type)}>
                                    {getTypeIcon(task.type)}
                                  </div>
                                  {task.type}
                                </div>
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <Clock className="h-3 w-3" />
                                  {task.duration} min
                                </div>
                                <Badge 
                                  variant="outline" 
                                  className={
                                    task.priority === 'high' ? 'border-red-500 text-red-400' :
                                    task.priority === 'medium' ? 'border-yellow-500 text-yellow-400' :
                                    'border-green-500 text-green-400'
                                  }
                                >
                                  {task.priority}
                                </Badge>
                              </div>
                              
                              <div className="flex flex-wrap gap-1 mt-2">
                                {task.skills.map((skill) => (
                                  <Badge key={skill} variant="secondary" className="text-xs">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            
                            <div className="ml-4">
                              <Button
                                size="sm"
                                variant="outline"
                                asChild
                                className="glass-card"
                              >
                                <a 
                                  href={task.resource.url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2"
                                >
                                  <ExternalLink className="h-3 w-3" />
                                  {task.resource.provider}
                                </a>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};