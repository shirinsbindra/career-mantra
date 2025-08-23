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
      // Technology Careers
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
      'DevOps Engineer': {
        title: 'DevOps Engineer',
        whyFit: 'Your technical skills and systematic approach are perfect for modern infrastructure.',
        primarySkills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform'],
        confidence: 0.72,
        salaryRange: '$75,000 - $140,000',
        growthOutlook: 'High demand (+25% growth)',
        description: 'Build and maintain the infrastructure that powers modern applications.'
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
      
      // Legal Careers
      'Corporate Lawyer': {
        title: 'Corporate Lawyer',
        whyFit: 'Your analytical thinking and attention to detail make you perfect for complex legal matters.',
        primarySkills: ['Contract Law', 'Legal Research', 'Negotiation', 'Regulatory Compliance', 'Due Diligence'],
        confidence: 0.82,
        salaryRange: '$95,000 - $200,000',
        growthOutlook: 'Steady demand (+8% growth)',
        description: 'Advise businesses on legal matters, mergers, acquisitions, and regulatory compliance.'
      },
      'Immigration Lawyer': {
        title: 'Immigration Lawyer',
        whyFit: 'Your communication skills and empathy are ideal for helping people navigate complex immigration laws.',
        primarySkills: ['Immigration Law', 'Client Counseling', 'Documentation', 'Court Representation', 'Case Management'],
        confidence: 0.79,
        salaryRange: '$65,000 - $130,000',
        growthOutlook: 'Growing demand (+12% growth)',
        description: 'Help individuals and families navigate immigration processes and represent them in legal proceedings.'
      },
      'Litigation Attorney': {
        title: 'Litigation Attorney',
        whyFit: 'Your persuasive communication and strategic thinking are perfect for courtroom advocacy.',
        primarySkills: ['Trial Advocacy', 'Legal Writing', 'Discovery', 'Depositions', 'Settlement Negotiation'],
        confidence: 0.81,
        salaryRange: '$70,000 - $180,000',
        growthOutlook: 'Stable demand (+6% growth)',
        description: 'Represent clients in civil and criminal cases, from pre-trial through appeals.'
      },
      
      // Finance & Accounting
      'Chartered Accountant': {
        title: 'Chartered Accountant (CA)',
        whyFit: 'Your mathematical aptitude and attention to detail are essential for financial accuracy and compliance.',
        primarySkills: ['Financial Accounting', 'Auditing', 'Tax Planning', 'GAAP', 'Financial Analysis'],
        confidence: 0.83,
        salaryRange: '$55,000 - $120,000',
        growthOutlook: 'Steady demand (+7% growth)',
        description: 'Manage financial records, conduct audits, and provide tax and financial advisory services.'
      },
      'Investment Banker': {
        title: 'Investment Banker',
        whyFit: 'Your analytical skills and high-pressure performance ability are ideal for financial markets.',
        primarySkills: ['Financial Modeling', 'Valuation', 'Market Analysis', 'Client Relations', 'Deal Structuring'],
        confidence: 0.80,
        salaryRange: '$85,000 - $250,000',
        growthOutlook: 'Competitive growth (+10% growth)',
        description: 'Help companies raise capital, execute mergers and acquisitions, and provide strategic financial advice.'
      },
      'Financial Advisor': {
        title: 'Financial Advisor',
        whyFit: 'Your interpersonal skills and analytical mindset are perfect for helping clients achieve financial goals.',
        primarySkills: ['Financial Planning', 'Investment Strategy', 'Risk Assessment', 'Client Relations', 'Portfolio Management'],
        confidence: 0.78,
        salaryRange: '$50,000 - $150,000',
        growthOutlook: 'Strong demand (+15% growth)',
        description: 'Guide individuals and businesses in making informed financial decisions and investment strategies.'
      },
      
      // Healthcare
      'Physician': {
        title: 'Physician (MD)',
        whyFit: 'Your compassion, analytical thinking, and dedication to helping others are essential for medical practice.',
        primarySkills: ['Medical Diagnosis', 'Patient Care', 'Clinical Research', 'Medical Ethics', 'Treatment Planning'],
        confidence: 0.85,
        salaryRange: '$150,000 - $400,000',
        growthOutlook: 'High demand (+18% growth)',
        description: 'Diagnose and treat patients, conduct medical research, and improve healthcare outcomes.'
      },
      'Physical Therapist': {
        title: 'Physical Therapist',
        whyFit: 'Your empathy and problem-solving skills are perfect for helping patients recover and improve mobility.',
        primarySkills: ['Rehabilitation', 'Exercise Therapy', 'Patient Assessment', 'Treatment Planning', 'Manual Therapy'],
        confidence: 0.82,
        salaryRange: '$75,000 - $110,000',
        growthOutlook: 'Exceptional demand (+28% growth)',
        description: 'Help patients recover from injuries and improve their physical function and quality of life.'
      },
      'Mental Health Counselor': {
        title: 'Mental Health Counselor',
        whyFit: 'Your empathy and communication skills are ideal for supporting people through mental health challenges.',
        primarySkills: ['Counseling Techniques', 'Crisis Intervention', 'Treatment Planning', 'Group Therapy', 'Assessment'],
        confidence: 0.79,
        salaryRange: '$45,000 - $85,000',
        growthOutlook: 'Very high demand (+25% growth)',
        description: 'Provide therapy and support to individuals dealing with mental health and substance abuse issues.'
      },
      
      // Business & Management
      'Management Consultant': {
        title: 'Management Consultant',
        whyFit: 'Your strategic thinking and problem-solving abilities are perfect for helping organizations improve.',
        primarySkills: ['Strategy Development', 'Process Improvement', 'Data Analysis', 'Client Presentation', 'Change Management'],
        confidence: 0.81,
        salaryRange: '$75,000 - $180,000',
        growthOutlook: 'Strong demand (+14% growth)',
        description: 'Analyze business problems and develop solutions to help organizations operate more effectively.'
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
      'Human Resources Manager': {
        title: 'Human Resources Manager',
        whyFit: 'Your interpersonal skills and organizational abilities are ideal for managing workplace culture.',
        primarySkills: ['Talent Acquisition', 'Employee Relations', 'Performance Management', 'HR Policies', 'Conflict Resolution'],
        confidence: 0.77,
        salaryRange: '$60,000 - $120,000',
        growthOutlook: 'Steady demand (+9% growth)',
        description: 'Develop HR strategies, recruit talent, and create positive workplace environments.'
      },
      
      // Education
      'College Professor': {
        title: 'College Professor',
        whyFit: 'Your knowledge and passion for sharing expertise make you ideal for higher education.',
        primarySkills: ['Research', 'Teaching', 'Academic Writing', 'Curriculum Development', 'Student Mentoring'],
        confidence: 0.80,
        salaryRange: '$50,000 - $120,000',
        growthOutlook: 'Moderate growth (+12% growth)',
        description: 'Conduct research, teach courses, and mentor students in your area of expertise.'
      },
      'School Principal': {
        title: 'School Principal',
        whyFit: 'Your leadership skills and educational vision are perfect for guiding academic institutions.',
        primarySkills: ['Educational Leadership', 'Staff Management', 'Curriculum Oversight', 'Budget Management', 'Community Relations'],
        confidence: 0.78,
        salaryRange: '$70,000 - $130,000',
        growthOutlook: 'Steady demand (+8% growth)',
        description: 'Lead schools, manage staff, and ensure high-quality education for all students.'
      },
      
      // Creative Industries
      'Marketing Manager': {
        title: 'Digital Marketing Manager',
        whyFit: 'Your creativity and analytical skills make you perfect for data-driven marketing.',
        primarySkills: ['Google Analytics', 'Content Strategy', 'SEO', 'Social Media', 'A/B Testing'],
        confidence: 0.77,
        salaryRange: '$55,000 - $110,000',
        growthOutlook: 'Strong demand (+15% growth)',
        description: 'Drive growth through creative campaigns and data-driven marketing strategies.'
      },
      'Architect': {
        title: 'Architect',
        whyFit: 'Your creative vision and technical precision are ideal for designing functional spaces.',
        primarySkills: ['Design Software', 'Building Codes', 'Project Management', '3D Modeling', 'Sustainability'],
        confidence: 0.76,
        salaryRange: '$65,000 - $130,000',
        growthOutlook: 'Moderate growth (+8% growth)',
        description: 'Design buildings and spaces that are both functional and aesthetically pleasing.'
      },
      'Graphic Designer': {
        title: 'Graphic Designer',
        whyFit: 'Your artistic abilities and attention to visual detail are perfect for creating compelling designs.',
        primarySkills: ['Adobe Creative Suite', 'Typography', 'Branding', 'Layout Design', 'Visual Communication'],
        confidence: 0.74,
        salaryRange: '$40,000 - $75,000',
        growthOutlook: 'Steady demand (+5% growth)',
        description: 'Create visual concepts that communicate ideas and inspire audiences across various media.'
      },
      
      // Science & Engineering
      'Civil Engineer': {
        title: 'Civil Engineer',
        whyFit: 'Your mathematical skills and systematic approach are ideal for infrastructure development.',
        primarySkills: ['Structural Analysis', 'CAD Software', 'Project Management', 'Environmental Compliance', 'Construction Materials'],
        confidence: 0.79,
        salaryRange: '$70,000 - $120,000',
        growthOutlook: 'Growing demand (+11% growth)',
        description: 'Design and oversee construction of infrastructure projects like roads, bridges, and buildings.'
      },
      'Research Scientist': {
        title: 'Research Scientist',
        whyFit: 'Your curiosity and analytical mindset are perfect for advancing scientific knowledge.',
        primarySkills: ['Research Methodology', 'Data Analysis', 'Laboratory Techniques', 'Scientific Writing', 'Grant Writing'],
        confidence: 0.81,
        salaryRange: '$60,000 - $130,000',
        growthOutlook: 'Strong demand (+17% growth)',
        description: 'Conduct experiments and research to advance scientific understanding and develop new technologies.'
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