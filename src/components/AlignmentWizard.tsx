import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Target, Briefcase, MapPin, Clock } from 'lucide-react';

interface AlignmentWizardProps {
  onComplete: (preferences: UserPreferences) => void;
}

export interface UserPreferences {
  interestedCareers: string[];
  workEnvironment: string;
  roleFlavor: string;
  locationPreference: string;
  weeklyCommitment: number;
}

const careerOptions = [
  // Technology
  'Data Scientist', 'Frontend Developer', 'Backend Developer', 'Full Stack Developer',
  'DevOps Engineer', 'UX/UI Designer', 'Product Manager', 'Data Analyst',
  'Software Engineer', 'Machine Learning Engineer', 'Cybersecurity Analyst',
  
  // Legal & Law
  'Corporate Lawyer', 'Immigration Lawyer', 'Litigation Attorney', 'Legal Consultant',
  'Paralegal', 'Legal Advisor', 'Family Lawyer', 'Criminal Defense Attorney',
  
  // Finance & Accounting  
  'Chartered Accountant', 'Investment Banker', 'Financial Advisor', 'Tax Consultant',
  'Auditor', 'Financial Analyst', 'Bookkeeper', 'Risk Analyst',
  
  // Healthcare & Medicine
  'Physician', 'Surgeon', 'Nurse', 'Physical Therapist', 'Mental Health Counselor',
  'Dentist', 'Pharmacist', 'Medical Technician', 'Healthcare Administrator',
  
  // Business & Management
  'Business Analyst', 'Management Consultant', 'Operations Manager', 'Sales Manager',
  'Human Resources Manager', 'Project Manager', 'Marketing Manager', 'Account Manager',
  
  // Education
  'College Professor', 'School Principal', 'Teacher', 'Education Consultant',
  'Training Specialist', 'Academic Advisor', 'Curriculum Designer',
  
  // Creative & Media
  'Graphic Designer', 'Content Creator', 'Digital Marketing Specialist', 'Architect',
  'Interior Designer', 'Video Editor', 'Photographer', 'Social Media Manager',
  
  // Science & Engineering
  'Civil Engineer', 'Mechanical Engineer', 'Research Scientist', 'Environmental Scientist',
  'Chemical Engineer', 'Biomedical Engineer', 'Lab Technician',
  
  // Other Professions
  'Real Estate Agent', 'Chef', 'Personal Trainer', 'Event Planner',
  'Travel Agent', 'Insurance Agent', 'Consultant', 'Entrepreneur'
];

const environmentOptions = [
  { id: 'startup', label: 'Startup', description: 'Fast-paced, innovative environment' },
  { id: 'corporate', label: 'Corporate', description: 'Structured, stable organization' },
  { id: 'freelance', label: 'Freelancing', description: 'Independent, flexible work' },
  { id: 'agency', label: 'Agency', description: 'Client-focused, diverse projects' }
];

const roleFlavorOptions = [
  { id: 'technical', label: 'Technical', description: 'Hands-on coding and development' },
  { id: 'creative', label: 'Creative', description: 'Design and visual problem-solving' },
  { id: 'leadership', label: 'Leadership', description: 'Managing teams and strategy' },
  { id: 'hybrid', label: 'Hybrid', description: 'Mix of technical and business' }
];

const locationOptions = [
  { id: 'remote', label: 'Fully Remote', description: 'Work from anywhere' },
  { id: 'hybrid', label: 'Hybrid', description: 'Mix of office and remote' },
  { id: 'onsite', label: 'On-site', description: 'Traditional office setting' },
  { id: 'flexible', label: 'Flexible', description: 'Open to any arrangement' }
];

export const AlignmentWizard = ({ onComplete }: AlignmentWizardProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [preferences, setPreferences] = useState<UserPreferences>({
    interestedCareers: [],
    workEnvironment: '',
    roleFlavor: '',
    locationPreference: '',
    weeklyCommitment: 10
  });

  const steps = [
    {
      title: "Which careers excite you most?",
      subtitle: "Select up to 3 that spark your interest",
      icon: Target
    },
    {
      title: "What's your ideal work environment?",
      subtitle: "Choose the setting where you thrive",
      icon: Briefcase
    },
    {
      title: "What type of role appeals to you?",
      subtitle: "Select your preferred work style",
      icon: Target
    },
    {
      title: "What's your location preference?",
      subtitle: "How do you prefer to work?",
      icon: MapPin
    },
    {
      title: "How many hours per week can you commit?",
      subtitle: "For learning and skill development",
      icon: Clock
    }
  ];

  const handleCareerToggle = (career: string) => {
    setPreferences(prev => {
      const isSelected = prev.interestedCareers.includes(career);
      const newCareers = isSelected
        ? prev.interestedCareers.filter(c => c !== career)
        : prev.interestedCareers.length < 3
          ? [...prev.interestedCareers, career]
          : prev.interestedCareers;
      
      return { ...prev, interestedCareers: newCareers };
    });
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(preferences);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: return preferences.interestedCareers.length > 0;
      case 1: return preferences.workEnvironment !== '';
      case 2: return preferences.roleFlavor !== '';
      case 3: return preferences.locationPreference !== '';
      case 4: return true;
      default: return false;
    }
  };

  const currentStepData = steps[currentStep];
  const IconComponent = currentStepData.icon;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">Step {currentStep + 1} of {steps.length}</span>
          <span className="text-sm text-muted-foreground">{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
        </div>
        <div className="readiness-bar h-2 rounded-full">
          <div 
            className="readiness-fill h-full rounded-full transition-all duration-500"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Content */}
      <Card className="glass-card border-none mb-8">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
              <IconComponent className="h-8 w-8 text-background" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">{currentStepData.title}</h2>
            <p className="text-muted-foreground text-lg">{currentStepData.subtitle}</p>
          </div>

          {/* Step 1: Career Interests */}
          {currentStep === 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {careerOptions.map((career) => (
                <Badge
                  key={career}
                  variant={preferences.interestedCareers.includes(career) ? "default" : "outline"}
                  className={`p-3 text-center cursor-pointer transition-all duration-200 hover:scale-105 ${
                    preferences.interestedCareers.includes(career)
                      ? 'bg-gradient-primary text-background border-transparent'
                      : 'hover:border-primary/50'
                  }`}
                  onClick={() => handleCareerToggle(career)}
                >
                  {career}
                </Badge>
              ))}
            </div>
          )}

          {/* Step 2: Work Environment */}
          {currentStep === 1 && (
            <div className="grid md:grid-cols-2 gap-4">
              {environmentOptions.map((option) => (
                <Card
                  key={option.id}
                  className={`cursor-pointer transition-all duration-200 hover:scale-105 border-2 ${
                    preferences.workEnvironment === option.id
                      ? 'border-primary bg-accent/20'
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setPreferences(prev => ({ ...prev, workEnvironment: option.id }))}
                >
                  <CardContent className="p-6 text-center">
                    <h3 className="font-semibold mb-2">{option.label}</h3>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Step 3: Role Flavor */}
          {currentStep === 2 && (
            <div className="grid md:grid-cols-2 gap-4">
              {roleFlavorOptions.map((option) => (
                <Card
                  key={option.id}
                  className={`cursor-pointer transition-all duration-200 hover:scale-105 border-2 ${
                    preferences.roleFlavor === option.id
                      ? 'border-primary bg-accent/20'
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setPreferences(prev => ({ ...prev, roleFlavor: option.id }))}
                >
                  <CardContent className="p-6 text-center">
                    <h3 className="font-semibold mb-2">{option.label}</h3>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Step 4: Location Preference */}
          {currentStep === 3 && (
            <div className="grid md:grid-cols-2 gap-4">
              {locationOptions.map((option) => (
                <Card
                  key={option.id}
                  className={`cursor-pointer transition-all duration-200 hover:scale-105 border-2 ${
                    preferences.locationPreference === option.id
                      ? 'border-primary bg-accent/20'
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setPreferences(prev => ({ ...prev, locationPreference: option.id }))}
                >
                  <CardContent className="p-6 text-center">
                    <h3 className="font-semibold mb-2">{option.label}</h3>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Step 5: Weekly Commitment */}
          {currentStep === 4 && (
            <div className="max-w-md mx-auto">
              <div className="text-center mb-8">
                <div className="text-4xl font-bold gradient-text mb-2">
                  {preferences.weeklyCommitment} hours
                </div>
                <p className="text-muted-foreground">per week</p>
              </div>
              
              <Slider
                value={[preferences.weeklyCommitment]}
                onValueChange={(value) => setPreferences(prev => ({ ...prev, weeklyCommitment: value[0] }))}
                max={40}
                min={1}
                step={1}
                className="mb-6"
              />
              
              <div className="grid grid-cols-3 gap-4 text-center text-sm">
                <div>
                  <div className="font-medium">1-5 hours</div>
                  <div className="text-muted-foreground">Light learning</div>
                </div>
                <div>
                  <div className="font-medium">5-15 hours</div>
                  <div className="text-muted-foreground">Steady progress</div>
                </div>
                <div>
                  <div className="font-medium">15+ hours</div>
                  <div className="text-muted-foreground">Intensive growth</div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          className="glass-card"
        >
          Back
        </Button>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            There's no single path — tell us what excites you.
          </p>
        </div>

        <Button
          onClick={handleNext}
          disabled={!canProceed()}
          className="bg-gradient-primary text-background hover:opacity-90"
        >
          {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};