import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, Briefcase, DollarSign, Sparkles } from 'lucide-react';
import { ParsedProfile } from './UploadPanel';
import { UserPreferences } from './AlignmentWizard';

interface CareerAnalyzerProps {
  profile: ParsedProfile;
  preferences: UserPreferences;
  onCareerSelect: (career: CareerRecommendation) => void;
}

interface CareerRecommendation {
  title: string;
  whyFit: string;
  primarySkills: string[];
  confidence: number;
  salaryRange: string;
  growthOutlook: string;
  description: string;
}

export const CareerAnalyzer = ({ profile, preferences, onCareerSelect }: CareerAnalyzerProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [careers, setCareers] = useState<CareerRecommendation[]>([]);

  useEffect(() => {
    const analyzeCareer = async () => {
      setIsAnalyzing(true);
      
      // Simulate AI analysis
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Generate career recommendations based on profile and preferences
      const recommendations = generateRecommendations(profile, preferences);
      setCareers(recommendations);
      setIsAnalyzing(false);
    };

    analyzeCareer();
  }, [profile, preferences]);

  const generateRecommendations = (profile: ParsedProfile, preferences: UserPreferences): CareerRecommendation[] => {
    // Base career templates
    const careerTemplates: Record<string, CareerRecommendation> = {
      'Frontend Developer': {
        title: 'Frontend Developer',
        whyFit: 'Your technical skills and creative problem-solving align perfectly with modern frontend development.',
        primarySkills: ['React', 'TypeScript', 'CSS', 'JavaScript', 'HTML'],
        confidence: 0.85,
        salaryRange: '$65,000 - $120,000',
        growthOutlook: 'High demand (+22% growth)',
        description: 'Build user interfaces and experiences that millions of users interact with daily.'
      },
      'Data Scientist': {
        title: 'Data Scientist',
        whyFit: 'Your analytical mindset and technical foundation make you ideal for extracting insights from data.',
        primarySkills: ['Python', 'SQL', 'Statistics', 'Machine Learning', 'Pandas'],
        confidence: 0.80,
        salaryRange: '$80,000 - $150,000',
        growthOutlook: 'Exceptional demand (+35% growth)',
        description: 'Turn complex data into actionable business insights and predictive models.'
      },
      'Product Manager': {
        title: 'Product Manager',
        whyFit: 'Your communication skills and strategic thinking are perfect for leading product development.',
        primarySkills: ['Analytics', 'Strategy', 'Communication', 'Agile', 'User Research'],
        confidence: 0.75,
        salaryRange: '$90,000 - $160,000',
        growthOutlook: 'Strong demand (+20% growth)',
        description: 'Guide product vision and work with teams to deliver solutions users love.'
      },
      'UX Designer': {
        title: 'UX/UI Designer',
        whyFit: 'Your creative abilities and user-focused mindset are ideal for designing digital experiences.',
        primarySkills: ['Figma', 'User Research', 'Prototyping', 'Design Systems', 'Usability'],
        confidence: 0.78,
        salaryRange: '$60,000 - $130,000',
        growthOutlook: 'Growing demand (+18% growth)',
        description: 'Create intuitive and beautiful interfaces that solve real user problems.'
      },
      'DevOps Engineer': {
        title: 'DevOps Engineer',
        whyFit: 'Your technical skills and systematic approach are perfect for modern infrastructure.',
        primarySkills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform'],
        confidence: 0.72,
        salaryRange: '$75,000 - $140,000',
        growthOutlook: 'High demand (+25% growth)',
        description: 'Build and maintain the infrastructure that powers modern applications.'
      },
      'Marketing Manager': {
        title: 'Digital Marketing Manager',
        whyFit: 'Your creativity and analytical skills make you perfect for data-driven marketing.',
        primarySkills: ['Google Analytics', 'Content Strategy', 'SEO', 'Social Media', 'A/B Testing'],
        confidence: 0.77,
        salaryRange: '$55,000 - $110,000',
        growthOutlook: 'Strong demand (+15% growth)',
        description: 'Drive growth through creative campaigns and data-driven marketing strategies.'
      }
    };

    // Select top 3 careers based on preferences and profile
    let selectedCareers: CareerRecommendation[] = [];
    
    // Prioritize careers from user preferences
    for (const career of preferences.interestedCareers) {
      if (careerTemplates[career]) {
        selectedCareers.push(careerTemplates[career]);
      }
    }
    
    // Fill remaining slots with AI-suggested careers based on skills
    const remainingCareers = Object.values(careerTemplates).filter(
      career => !selectedCareers.some(selected => selected.title === career.title)
    );
    
    // Simple skill matching
    for (const career of remainingCareers) {
      if (selectedCareers.length >= 3) break;
      
      const skillMatch = career.primarySkills.some(skill => 
        profile.skills.some(userSkill => 
          userSkill.toLowerCase().includes(skill.toLowerCase()) ||
          skill.toLowerCase().includes(userSkill.toLowerCase())
        )
      );
      
      if (skillMatch || Math.random() > 0.5) {
        selectedCareers.push(career);
      }
    }
    
    // Ensure we have exactly 3 careers
    while (selectedCareers.length < 3 && remainingCareers.length > 0) {
      const randomCareer = remainingCareers[Math.floor(Math.random() * remainingCareers.length)];
      if (!selectedCareers.some(career => career.title === randomCareer.title)) {
        selectedCareers.push(randomCareer);
      }
    }

    return selectedCareers.slice(0, 3);
  };

  if (isAnalyzing) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Sparkles className="h-8 w-8 text-background" />
          </div>
          <h2 className="text-3xl font-bold mb-4">
            Analyzing Your <span className="gradient-text">Career Fit</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Our AI is processing your background and preferences...
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="glass-card border-none animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-accent rounded mb-4"></div>
                <div className="h-8 bg-accent rounded mb-4"></div>
                <div className="space-y-2 mb-4">
                  <div className="h-3 bg-accent rounded"></div>
                  <div className="h-3 bg-accent rounded w-4/5"></div>
                </div>
                <div className="flex gap-2 mb-4">
                  {[...Array(3)].map((_, j) => (
                    <div key={j} className="h-6 w-16 bg-accent rounded-full"></div>
                  ))}
                </div>
                <div className="h-10 bg-accent rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">
          Your Top <span className="gradient-text">Career Matches</span>
        </h2>
        <p className="text-muted-foreground text-lg">
          Based on your background and preferences, here are your best career fits
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {careers.map((career, index) => (
          <Card 
            key={career.title} 
            className="career-card border-none animate-fade-in"
            style={{ animationDelay: `${index * 200}ms` }}
          >
            <CardContent className="p-6">
              {/* Confidence Badge */}
              <div className="flex justify-between items-start mb-4">
                <Badge variant="secondary" className="bg-gradient-primary text-background">
                  {Math.round(career.confidence * 100)}% match
                </Badge>
                <div className="text-right">
                  <div className="text-2xl font-bold">#{index + 1}</div>
                </div>
              </div>

              {/* Career Title */}
              <h3 className="text-xl font-bold mb-3">{career.title}</h3>

              {/* Description */}
              <p className="text-muted-foreground mb-4 text-sm">
                {career.description}
              </p>

              {/* Why It Fits */}
              <div className="mb-4">
                <h4 className="font-semibold text-sm mb-2">Why this fits you:</h4>
                <p className="text-sm text-muted-foreground">{career.whyFit}</p>
              </div>

              {/* Key Skills */}
              <div className="mb-4">
                <h4 className="font-semibold text-sm mb-2">Key skills:</h4>
                <div className="flex flex-wrap gap-1">
                  {career.primarySkills.slice(0, 3).map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {career.primarySkills.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{career.primarySkills.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              {/* Salary & Growth */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="h-4 w-4 text-mentra-green" />
                  <span>{career.salaryRange}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <TrendingUp className="h-4 w-4 text-mentra-cyan" />
                  <span>{career.growthOutlook}</span>
                </div>
              </div>

              {/* Action Button */}
              <Button
                onClick={() => onCareerSelect(career)}
                className="w-full bg-gradient-primary text-background hover:opacity-90"
              >
                <Briefcase className="h-4 w-4 mr-2" />
                Explore This Path
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <p className="text-muted-foreground mb-4">
          You're closer than you think! Select a career to see your personalized roadmap.
        </p>
      </div>
    </div>
  );
};