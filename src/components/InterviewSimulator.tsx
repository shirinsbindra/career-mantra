import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  MessageSquare, 
  Timer, 
  CheckCircle, 
  XCircle, 
  Brain,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Star,
  Target
} from 'lucide-react';
import { ParsedProfile } from './UploadPanel';
import { UserPreferences } from './AlignmentWizard';

interface InterviewSimulatorProps {
  profile: ParsedProfile;
  preferences: UserPreferences;
  selectedCareer: any;
  onBack: () => void;
}

interface Question {
  id: number;
  type: 'technical' | 'behavioral' | 'situational' | 'career-specific';
  question: string;
  difficulty: 'easy' | 'medium' | 'hard';
  expectedAnswer: string;
  tips: string[];
  timeLimit: number; // in seconds
}

interface InterviewSession {
  questions: Question[];
  currentQuestionIndex: number;
  answers: { questionId: number; answer: string; timeSpent: number }[];
  startTime: Date;
  isCompleted: boolean;
}

export const InterviewSimulator = ({ 
  profile, 
  preferences, 
  selectedCareer, 
  onBack 
}: InterviewSimulatorProps) => {
  const [session, setSession] = useState<InterviewSession | null>(null);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackData, setFeedbackData] = useState<any>(null);

  // Generate dynamic questions based on career
  const generateQuestions = (): Question[] => {
    const careerTitle = selectedCareer?.title || 'Software Developer';
    const userSkills = profile.skills || [];
    
    const questionTemplates = {
      'Frontend Developer': [
        {
          type: 'technical' as const,
          question: 'Explain the difference between React hooks and class components. When would you use each?',
          difficulty: 'medium' as const,
          expectedAnswer: 'Should mention state management, lifecycle methods, modern patterns, and performance considerations.',
          tips: ['Focus on practical differences', 'Mention specific use cases', 'Discuss performance implications'],
          timeLimit: 180
        },
        {
          type: 'technical' as const,
          question: 'How would you optimize a React application for better performance?',
          difficulty: 'hard' as const,
          expectedAnswer: 'Should cover memoization, code splitting, lazy loading, bundle optimization, and profiling.',
          tips: ['Mention specific techniques', 'Discuss measurement tools', 'Consider user experience impact'],
          timeLimit: 240
        },
        {
          type: 'behavioral' as const,
          question: 'Tell me about a time when you had to learn a new frontend framework or library quickly. How did you approach it?',
          difficulty: 'medium' as const,
          expectedAnswer: 'Should demonstrate learning agility, resourcefulness, and practical application.',
          tips: ['Use STAR method', 'Show learning process', 'Highlight results achieved'],
          timeLimit: 180
        }
      ],
      'Full Stack Developer': [
        {
          type: 'technical' as const,
          question: 'Design a RESTful API for a task management application. What endpoints would you create?',
          difficulty: 'medium' as const,
          expectedAnswer: 'Should include CRUD operations, proper HTTP methods, status codes, and resource naming.',
          tips: ['Think about resource relationships', 'Consider authentication', 'Mention error handling'],
          timeLimit: 300
        },
        {
          type: 'technical' as const,
          question: 'How would you handle database transactions in a distributed system?',
          difficulty: 'hard' as const,
          expectedAnswer: 'Should discuss ACID properties, distributed transactions, eventual consistency, and error handling.',
          tips: ['Mention specific patterns like 2PC or Saga', 'Discuss trade-offs', 'Consider failure scenarios'],
          timeLimit: 240
        }
      ],
      'Backend Developer': [
        {
          type: 'technical' as const,
          question: 'Explain how you would design a caching strategy for a high-traffic application.',
          difficulty: 'hard' as const,
          expectedAnswer: 'Should cover different caching levels, cache invalidation, consistency, and performance metrics.',
          tips: ['Discuss multiple caching layers', 'Mention specific technologies', 'Consider cache invalidation strategies'],
          timeLimit: 300
        }
      ]
    };

    // Get career-specific questions or default ones
    const careerQuestions = questionTemplates[careerTitle as keyof typeof questionTemplates] || questionTemplates['Frontend Developer'];
    
    // Add universal questions
    const universalQuestions: Question[] = [
      {
        id: 1,
        type: 'behavioral',
        question: 'Why are you interested in transitioning to ' + careerTitle + '?',
        difficulty: 'easy',
        expectedAnswer: 'Should show genuine interest, research about the role, and connection to personal goals.',
        tips: ['Be authentic about your motivation', 'Connect to your background', 'Show you\'ve researched the role'],
        timeLimit: 120
      },
      {
        id: 2,
        type: 'situational',
        question: 'How would you approach learning the skills you\'re currently missing for this role?',
        difficulty: 'medium',
        expectedAnswer: 'Should demonstrate structured learning approach, timeline, and practical application.',
        tips: ['Mention specific resources', 'Show a realistic timeline', 'Include hands-on practice'],
        timeLimit: 150
      }
    ];

    // Combine and add IDs
    const allQuestions = [
      ...universalQuestions,
      ...careerQuestions.map((q, index) => ({ ...q, id: index + 3 }))
    ];

    return allQuestions.slice(0, 5); // Limit to 5 questions for the demo
  };

  const startNewSession = () => {
    const questions = generateQuestions();
    setSession({
      questions,
      currentQuestionIndex: 0,
      answers: [],
      startTime: new Date(),
      isCompleted: false
    });
    setCurrentAnswer('');
    setTimeElapsed(0);
    setIsTimerActive(true);
    setShowFeedback(false);
  };

  const handleAnswerSubmit = () => {
    if (!session || !currentAnswer.trim()) return;

    const newAnswer = {
      questionId: session.questions[session.currentQuestionIndex].id,
      answer: currentAnswer,
      timeSpent: timeElapsed
    };

    const updatedAnswers = [...session.answers, newAnswer];
    
    if (session.currentQuestionIndex < session.questions.length - 1) {
      // Move to next question
      setSession({
        ...session,
        currentQuestionIndex: session.currentQuestionIndex + 1,
        answers: updatedAnswers
      });
      setCurrentAnswer('');
      setTimeElapsed(0);
    } else {
      // Complete the interview
      setSession({
        ...session,
        answers: updatedAnswers,
        isCompleted: true
      });
      setIsTimerActive(false);
      generateFeedback(updatedAnswers, session.questions);
    }
  };

  const generateFeedback = (answers: any[], questions: Question[]) => {
    const totalTime = answers.reduce((sum, answer) => sum + answer.timeSpent, 0);
    const avgTimePerQuestion = totalTime / answers.length;
    
    // Simple scoring based on answer length and time
    const scores = answers.map((answer, index) => {
      const question = questions[index];
      const timeScore = answer.timeSpent <= question.timeLimit ? 100 : Math.max(50, 100 - (answer.timeSpent - question.timeLimit));
      const lengthScore = Math.min(100, (answer.answer.length / 200) * 100);
      return (timeScore + lengthScore) / 2;
    });

    const overallScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;

    setFeedbackData({
      overallScore: Math.round(overallScore),
      totalTime: Math.round(totalTime),
      avgTimePerQuestion: Math.round(avgTimePerQuestion),
      scores,
      recommendations: [
        overallScore < 60 ? 'Practice answering questions more concisely' : 'Good job on answer completeness!',
        avgTimePerQuestion > 180 ? 'Work on answering questions more quickly' : 'Great time management!',
        'Consider practicing the STAR method for behavioral questions',
        `Focus on ${selectedCareer?.title} specific skills and technologies`
      ]
    });
    setShowFeedback(true);
  };

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerActive && session && !session.isCompleted) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, session]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getCurrentQuestion = () => {
    if (!session) return null;
    return session.questions[session.currentQuestionIndex];
  };

  const goToPreviousQuestion = () => {
    if (!session || session.currentQuestionIndex === 0) return;
    setSession({
      ...session,
      currentQuestionIndex: session.currentQuestionIndex - 1
    });
    // Load previous answer if exists
    const prevAnswer = session.answers[session.currentQuestionIndex - 1];
    if (prevAnswer) {
      setCurrentAnswer(prevAnswer.answer);
    }
  };

  if (!session) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            <span className="gradient-text">Mock Interview</span>
          </h1>
          <p className="text-muted-foreground">
            Practice interviews tailored for {selectedCareer?.title || 'your selected role'}
          </p>
        </div>

        {/* Interview Prep Card */}
        <Card className="glass-card border-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-mentra-cyan" />
              Interview Preparation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">What to Expect:</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-mentra-green mt-0.5" />
                    5 tailored questions for {selectedCareer?.title}
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-mentra-green mt-0.5" />
                    Mix of technical and behavioral questions
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-mentra-green mt-0.5" />
                    Timed responses with feedback
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-mentra-green mt-0.5" />
                    Personalized improvement recommendations
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Tips for Success:</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Star className="h-4 w-4 text-mentra-purple mt-0.5" />
                    Use the STAR method for behavioral questions
                  </li>
                  <li className="flex items-start gap-2">
                    <Star className="h-4 w-4 text-mentra-purple mt-0.5" />
                    Be specific with technical examples
                  </li>
                  <li className="flex items-start gap-2">
                    <Star className="h-4 w-4 text-mentra-purple mt-0.5" />
                    Think out loud during problem-solving
                  </li>
                  <li className="flex items-start gap-2">
                    <Star className="h-4 w-4 text-mentra-purple mt-0.5" />
                    Ask clarifying questions when needed
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button 
                onClick={startNewSession}
                className="bg-gradient-primary text-background hover:opacity-90"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Start Interview
              </Button>
              <Button variant="outline" onClick={onBack} className="glass-card">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showFeedback && feedbackData) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            <span className="gradient-text">Interview Complete!</span>
          </h1>
          <p className="text-muted-foreground">Here's your performance summary</p>
        </div>

        {/* Score Card */}
        <Card className="glass-card border-none bg-gradient-to-r from-accent/20 to-accent/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">Overall Performance</h3>
                <p className="text-muted-foreground">
                  Completed in {formatTime(feedbackData.totalTime)}
                </p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-mentra-cyan">
                  {feedbackData.overallScore}%
                </div>
                <div className="text-sm text-muted-foreground">Score</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Feedback */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="glass-card border-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-mentra-green" />
                Performance Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {session.questions.map((question, index) => (
                <div key={question.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Question {index + 1}</span>
                    <Badge variant={feedbackData.scores[index] >= 70 ? "secondary" : "outline"}>
                      {Math.round(feedbackData.scores[index])}%
                    </Badge>
                  </div>
                  <Progress value={feedbackData.scores[index]} className="h-2" />
                  <p className="text-xs text-muted-foreground">{question.type} • {question.difficulty}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="glass-card border-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-mentra-purple" />
                Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {feedbackData.recommendations.map((rec: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-mentra-cyan mt-0.5" />
                    <span className="text-sm">{rec}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Button 
            onClick={() => {
              setSession(null);
              setShowFeedback(false);
              setFeedbackData(null);
            }}
            className="bg-gradient-primary text-background hover:opacity-90"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
          <Button variant="outline" onClick={onBack} className="glass-card">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const currentQuestion = getCurrentQuestion();
  if (!currentQuestion) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Progress Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={onBack} size="sm" className="glass-card">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">
                Question {session.currentQuestionIndex + 1} of {session.questions.length}
              </h1>
              <p className="text-sm text-muted-foreground">
                {currentQuestion.type} • {currentQuestion.difficulty}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <Timer className="h-4 w-4" />
              {formatTime(timeElapsed)} / {formatTime(currentQuestion.timeLimit)}
            </div>
            <Progress 
              value={(timeElapsed / currentQuestion.timeLimit) * 100} 
              className="w-32 h-2" 
            />
          </div>
        </div>
        <Progress 
          value={((session.currentQuestionIndex) / session.questions.length) * 100} 
          className="h-1"
        />
      </div>

      {/* Question Card */}
      <Card className="glass-card border-none">
        <CardHeader>
          <CardTitle className="text-xl leading-relaxed">
            {currentQuestion.question}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Tips */}
          <div className="bg-accent/20 rounded-lg p-4">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Brain className="h-4 w-4 text-mentra-cyan" />
              Tips for this question:
            </h4>
            <ul className="space-y-1">
              {currentQuestion.tips.map((tip, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-mentra-cyan">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          {/* Answer Input */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Your Answer:</label>
            <Textarea
              value={currentAnswer}
              onChange={(e) => setCurrentAnswer(e.target.value)}
              placeholder="Type your answer here..."
              className="min-h-[200px] resize-none"
            />
            <div className="text-xs text-muted-foreground">
              {currentAnswer.length} characters
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            {session.currentQuestionIndex > 0 && (
              <Button 
                variant="outline" 
                onClick={goToPreviousQuestion}
                className="glass-card"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
            )}
            <Button 
              onClick={handleAnswerSubmit}
              disabled={!currentAnswer.trim()}
              className="bg-gradient-primary text-background hover:opacity-90"
            >
              {session.currentQuestionIndex === session.questions.length - 1 ? 'Complete Interview' : 'Next Question'}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};