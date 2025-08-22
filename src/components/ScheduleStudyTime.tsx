import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Plus, 
  Edit, 
  Trash2, 
  ArrowLeft,
  Bell,
  Repeat,
  Target,
  BookOpen,
  CheckCircle,
  AlertCircle,
  Timer
} from 'lucide-react';
import { UserPreferences } from './AlignmentWizard';

interface ScheduleStudyTimeProps {
  preferences: UserPreferences;
  onBack: () => void;
}

interface StudySession {
  id: string;
  title: string;
  description: string;
  date: Date;
  startTime: string;
  endTime: string;
  duration: number; // minutes
  type: 'focused' | 'practice' | 'review' | 'project';
  priority: 'high' | 'medium' | 'low';
  recurring: 'none' | 'daily' | 'weekly' | 'weekdays';
  completed: boolean;
  skills: string[];
  reminders: boolean;
}

export const ScheduleStudyTime = ({ preferences, onBack }: ScheduleStudyTimeProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [sessions, setSessions] = useState<StudySession[]>(generateSampleSessions());
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSession, setNewSession] = useState<Partial<StudySession>>({
    title: '',
    description: '',
    startTime: '09:00',
    endTime: '10:30',
    type: 'focused',
    priority: 'medium',
    recurring: 'none',
    skills: [],
    reminders: true
  });

  function generateSampleSessions(): StudySession[] {
    const today = new Date();
    const sessions: StudySession[] = [];

    // Generate sessions for the next 7 days
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      // Morning session
      sessions.push({
        id: `session-${i}-morning`,
        title: 'Morning Focus Block',
        description: 'Deep work on React components and hooks',
        date: new Date(date),
        startTime: '09:00',
        endTime: '10:30',
        duration: 90,
        type: 'focused',
        priority: 'high',
        recurring: 'weekdays',
        completed: i < 2, // Mark first two as completed
        skills: ['React', 'JavaScript', 'Problem Solving'],
        reminders: true
      });

      // Evening session (every other day)
      if (i % 2 === 0) {
        sessions.push({
          id: `session-${i}-evening`,
          title: 'Practice & Review',
          description: 'Code challenges and reviewing completed tasks',
          date: new Date(date),
          startTime: '19:00',
          endTime: '20:00',
          duration: 60,
          type: 'practice',
          priority: 'medium',
          recurring: 'none',
          completed: i < 1,
          skills: ['Algorithms', 'Data Structures'],
          reminders: true
        });
      }
    }

    return sessions;
  }

  const toggleSessionCompletion = (sessionId: string) => {
    setSessions(sessions.map(session => 
      session.id === sessionId 
        ? { ...session, completed: !session.completed }
        : session
    ));
  };

  const deleteSession = (sessionId: string) => {
    setSessions(sessions.filter(session => session.id !== sessionId));
  };

  const addNewSession = () => {
    if (!newSession.title || !selectedDate) return;

    const session: StudySession = {
      id: `session-${Date.now()}`,
      title: newSession.title,
      description: newSession.description || '',
      date: selectedDate,
      startTime: newSession.startTime || '09:00',
      endTime: newSession.endTime || '10:30',
      duration: calculateDuration(newSession.startTime || '09:00', newSession.endTime || '10:30'),
      type: newSession.type || 'focused',
      priority: newSession.priority || 'medium',
      recurring: newSession.recurring || 'none',
      completed: false,
      skills: newSession.skills || [],
      reminders: newSession.reminders || true
    };

    setSessions([...sessions, session]);
    setShowAddForm(false);
    setNewSession({
      title: '',
      description: '',
      startTime: '09:00',
      endTime: '10:30',
      type: 'focused',
      priority: 'medium',
      recurring: 'none',
      skills: [],
      reminders: true
    });
  };

  const calculateDuration = (startTime: string, endTime: string): number => {
    const [startHour, startMin] = startTime.split(':').map(Number);
    const [endHour, endMin] = endTime.split(':').map(Number);
    return (endHour * 60 + endMin) - (startHour * 60 + startMin);
  };

  const getSessionsForDate = (date: Date) => {
    return sessions.filter(session => 
      session.date.toDateString() === date.toDateString()
    ).sort((a, b) => a.startTime.localeCompare(b.startTime));
  };

  const getUpcomingSessions = () => {
    const now = new Date();
    return sessions
      .filter(session => session.date >= now && !session.completed)
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .slice(0, 5);
  };

  const getWeeklyStats = () => {
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);

    const weekSessions = sessions.filter(session => 
      session.date >= weekStart && session.date <= weekEnd
    );

    const completed = weekSessions.filter(s => s.completed).length;
    const total = weekSessions.length;
    const totalMinutes = weekSessions.filter(s => s.completed).reduce((sum, s) => sum + s.duration, 0);

    return { completed, total, totalMinutes };
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'focused': return <Target className="h-4 w-4" />;
      case 'practice': return <BookOpen className="h-4 w-4" />;
      case 'review': return <CheckCircle className="h-4 w-4" />;
      case 'project': return <Edit className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'focused': return 'text-red-400 bg-red-400/20';
      case 'practice': return 'text-blue-400 bg-blue-400/20';
      case 'review': return 'text-green-400 bg-green-400/20';
      case 'project': return 'text-purple-400 bg-purple-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const selectedDateSessions = selectedDate ? getSessionsForDate(selectedDate) : [];
  const upcomingSessions = getUpcomingSessions();
  const weeklyStats = getWeeklyStats();

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack} className="glass-card">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold gradient-text">Study Schedule</h1>
            <p className="text-muted-foreground">
              Plan and track your learning sessions
            </p>
          </div>
        </div>
        <Button 
          onClick={() => setShowAddForm(true)} 
          className="bg-gradient-primary text-background"
        >
          <Plus className="h-4 w-4 mr-2" />
          Schedule Session
        </Button>
      </div>

      {/* Weekly Stats */}
      <Card className="glass-card border-none bg-gradient-to-r from-accent/20 to-accent/10">
        <CardContent className="p-6">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">{weeklyStats.completed}</div>
              <div className="text-sm text-muted-foreground">Sessions Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-mentra-green">{Math.round(weeklyStats.totalMinutes / 60 * 10) / 10}h</div>
              <div className="text-sm text-muted-foreground">Hours Studied</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-mentra-cyan">{weeklyStats.total - weeklyStats.completed}</div>
              <div className="text-sm text-muted-foreground">Upcoming Sessions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-mentra-purple">{Math.round((weeklyStats.completed / weeklyStats.total) * 100) || 0}%</div>
              <div className="text-sm text-muted-foreground">Completion Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="glass-card border-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-mentra-cyan" />
              Calendar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border-none"
              modifiers={{
                hasSession: (date) => sessions.some(session => 
                  session.date.toDateString() === date.toDateString()
                ),
                completed: (date) => {
                  const dateSessions = getSessionsForDate(date);
                  return dateSessions.length > 0 && dateSessions.every(s => s.completed);
                }
              }}
              modifiersClassNames={{
                hasSession: "bg-accent/40 font-medium",
                completed: "bg-mentra-green/30 text-mentra-green",
                selected: "bg-gradient-primary text-background"
              }}
            />
          </CardContent>
        </Card>

        {/* Selected Date Sessions */}
        <Card className="glass-card border-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Timer className="h-5 w-5 text-mentra-green" />
              {selectedDate?.toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'short', 
                day: 'numeric' 
              })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDateSessions.length === 0 ? (
              <div className="text-center py-8">
                <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-3 opacity-50" />
                <p className="text-muted-foreground">No sessions scheduled</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-3"
                  onClick={() => setShowAddForm(true)}
                >
                  Add Session
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {selectedDateSessions.map((session) => (
                  <Card key={session.id} className={`border transition-all ${
                    session.completed 
                      ? 'bg-accent/20 border-accent/40' 
                      : 'hover:bg-accent/10'
                  }`}>
                    <CardContent className="p-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => toggleSessionCompletion(session.id)}
                            className={`p-1 h-6 w-6 rounded-full ${
                              session.completed 
                                ? 'bg-mentra-green hover:bg-mentra-green/80' 
                                : 'border-2 border-muted-foreground hover:border-mentra-green'
                            }`}
                          >
                            {session.completed && <CheckCircle className="h-4 w-4 text-background" />}
                          </Button>
                          
                          <div className="flex-1">
                            <h4 className={`font-medium text-sm ${
                              session.completed ? 'line-through text-muted-foreground' : ''
                            }`}>
                              {session.title}
                            </h4>
                            <div className="flex items-center gap-2 mt-1">
                              <div className={`p-1 rounded ${getTypeColor(session.type)}`}>
                                {getTypeIcon(session.type)}
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {session.startTime} - {session.endTime}
                              </span>
                              <Badge variant="outline" className="text-xs">
                                {session.duration}m
                              </Badge>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-1">
                          {session.reminders && (
                            <Bell className="h-3 w-3 text-mentra-cyan" />
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => deleteSession(session.id)}
                            className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upcoming Sessions */}
        <Card className="glass-card border-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-mentra-purple" />
              Upcoming Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingSessions.length === 0 ? (
              <div className="text-center py-8">
                <CheckCircle className="h-12 w-12 mx-auto text-mentra-green mb-3 opacity-50" />
                <p className="text-muted-foreground">All caught up!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {upcomingSessions.map((session) => (
                  <Card key={session.id} className="border hover:bg-accent/10 transition-all">
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-sm">{session.title}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <div className={`p-1 rounded ${getTypeColor(session.type)}`}>
                              {getTypeIcon(session.type)}
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {session.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {session.startTime}
                            </span>
                          </div>
                        </div>
                        <Badge 
                          variant="outline" 
                          className={
                            session.priority === 'high' ? 'border-red-500 text-red-400' :
                            session.priority === 'medium' ? 'border-yellow-500 text-yellow-400' :
                            'border-green-500 text-green-400'
                          }
                        >
                          {session.priority}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Add Session Form */}
      {showAddForm && (
        <Card className="glass-card border-none">
          <CardHeader>
            <CardTitle>Schedule New Session</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Title</label>
                <input
                  type="text"
                  value={newSession.title}
                  onChange={(e) => setNewSession({ ...newSession, title: e.target.value })}
                  className="w-full mt-1 p-2 bg-background border border-border rounded-md"
                  placeholder="Focus session, practice, etc."
                />
              </div>
              <div>
                <label className="text-sm font-medium">Type</label>
                <select
                  value={newSession.type}
                  onChange={(e) => setNewSession({ ...newSession, type: e.target.value as any })}
                  className="w-full mt-1 p-2 bg-background border border-border rounded-md"
                >
                  <option value="focused">Focused Study</option>
                  <option value="practice">Practice</option>
                  <option value="review">Review</option>
                  <option value="project">Project Work</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Start Time</label>
                <input
                  type="time"
                  value={newSession.startTime}
                  onChange={(e) => setNewSession({ ...newSession, startTime: e.target.value })}
                  className="w-full mt-1 p-2 bg-background border border-border rounded-md"
                />
              </div>
              <div>
                <label className="text-sm font-medium">End Time</label>
                <input
                  type="time"
                  value={newSession.endTime}
                  onChange={(e) => setNewSession({ ...newSession, endTime: e.target.value })}
                  className="w-full mt-1 p-2 bg-background border border-border rounded-md"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium">Description</label>
                <textarea
                  value={newSession.description}
                  onChange={(e) => setNewSession({ ...newSession, description: e.target.value })}
                  className="w-full mt-1 p-2 bg-background border border-border rounded-md"
                  rows={2}
                  placeholder="What will you work on?"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
              <Button onClick={addNewSession} className="bg-gradient-primary text-background">
                Schedule Session
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};