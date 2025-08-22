import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Target, 
  TrendingUp, 
  BookOpen, 
  MessageSquare, 
  Award,
  Calendar,
  CheckCircle,
  ArrowRight,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { ParsedProfile } from './UploadPanel';
import { UserPreferences } from './AlignmentWizard';

interface DashboardProps {
  profile: ParsedProfile;
  preferences: UserPreferences;
  selectedCareer: any;
  onRetakeInterview: () => void;
  onExploreCareer: () => void;
  onGenerateRoadmap: () => void;
}

export const Dashboard = ({ 
  profile, 
  preferences, 
  selectedCareer,
  onRetakeInterview,
  onExploreCareer,
  onGenerateRoadmap
}: DashboardProps) => {
  const [roadmapProgress] = useState(65); // Mock progress
  const [readinessScore] = useState(78); // Mock score

  const missingSkills = [
    'Advanced React Patterns',
    'System Design',
    'GraphQL',
    'Testing Frameworks',
    'Performance Optimization'
  ];

  const recentAchievements = [
    { title: 'Completed Profile Analysis', date: 'Today', type: 'milestone' },
    { title: 'Selected Career Path', date: 'Today', type: 'goal' },
    { title: 'Started Learning Plan', date: 'Today', type: 'progress' }
  ];

  const weeklyTasks = [
    { title: 'Complete React Hooks tutorial', completed: true, duration: '2 hours' },
    { title: 'Build portfolio project', completed: false, duration: '4 hours' },
    { title: 'Practice coding interview', completed: false, duration: '1 hour' },
    { title: 'Read system design article', completed: false, duration: '30 mins' }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Welcome to Your <span className="gradient-text">Career Dashboard</span>
        </h1>
        <p className="text-muted-foreground">
          Track your progress and take the next step in your journey
        </p>
      </div>

      {/* Current Goal Card */}
      <Card className="glass-card border-none bg-gradient-to-r from-accent/20 to-accent/10">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                  <Target className="h-6 w-6 text-background" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Current Goal</h3>
                  <p className="text-muted-foreground">Your chosen career path</p>
                </div>
              </div>
              <h2 className="text-2xl font-bold gradient-text mb-2">{selectedCareer?.title || 'Frontend Developer'}</h2>
              <p className="text-muted-foreground">
                {selectedCareer?.whyFit || 'Building user interfaces with modern technologies'}
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-mentra-cyan">{readinessScore}%</div>
              <div className="text-sm text-muted-foreground">Career Ready</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Readiness Score */}
        <Card className="glass-card border-none">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5 text-mentra-cyan" />
              Readiness Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">{readinessScore}%</span>
                <Badge variant="secondary" className="bg-gradient-primary text-background">
                  Strong
                </Badge>
              </div>
              <Progress value={readinessScore} className="h-2" />
              <p className="text-sm text-muted-foreground">
                You're closer than you think! Focus on the missing skills below.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Roadmap Progress */}
        <Card className="glass-card border-none">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <BookOpen className="h-5 w-5 text-mentra-green" />
              Roadmap Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">{roadmapProgress}%</span>
                <Badge variant="outline">Week 2 of 4</Badge>
              </div>
              <Progress value={roadmapProgress} className="h-2" />
              <p className="text-sm text-muted-foreground">
                Great momentum! Keep up the consistent progress.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Commitment */}
        <Card className="glass-card border-none">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calendar className="h-5 w-5 text-mentra-purple" />
              Weekly Goal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">{preferences.weeklyCommitment}h</span>
                <Badge variant="outline">7h completed</Badge>
              </div>
              <Progress value={(7 / preferences.weeklyCommitment) * 100} className="h-2" />
              <p className="text-sm text-muted-foreground">
                On track to meet your weekly learning goal.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Skills Gap */}
        <Card className="glass-card border-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-mentra-cyan" />
              Skills to Focus On
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {missingSkills.slice(0, 4).map((skill, index) => (
                <div key={skill} className="flex items-center justify-between">
                  <span className="text-sm">{skill}</span>
                  <Badge variant="outline" className="text-xs">
                    Priority {index + 1}
                  </Badge>
                </div>
              ))}
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full mt-4"
                onClick={onGenerateRoadmap}
              >
                View Learning Plan
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* This Week's Tasks */}
        <Card className="glass-card border-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-mentra-green" />
              This Week's Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {weeklyTasks.map((task, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                    task.completed 
                      ? 'bg-mentra-green border-mentra-green' 
                      : 'border-muted-foreground'
                  }`}>
                    {task.completed && <CheckCircle className="h-3 w-3 text-background" />}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                      {task.title}
                    </p>
                    <p className="text-xs text-muted-foreground">{task.duration}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Achievements */}
        <Card className="glass-card border-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-mentra-purple" />
              Recent Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentAchievements.map((achievement, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    achievement.type === 'milestone' ? 'bg-mentra-cyan' :
                    achievement.type === 'goal' ? 'bg-mentra-green' : 'bg-mentra-purple'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{achievement.title}</p>
                    <p className="text-xs text-muted-foreground">{achievement.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="glass-card border-none">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <Button 
              onClick={onRetakeInterview}
              className="bg-gradient-primary text-background hover:opacity-90"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Practice Interview
            </Button>
            
            <Button 
              variant="outline" 
              onClick={onExploreCareer}
              className="glass-card"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Explore Other Careers
            </Button>
            
            <Button 
              variant="outline" 
              onClick={onGenerateRoadmap}
              className="glass-card"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Update Roadmap
            </Button>
            
            <Button 
              variant="outline" 
              className="glass-card"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Study Time
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};