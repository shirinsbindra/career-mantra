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
      'Backend Developer': {
        title: 'Backend Developer',
        whyFit: 'Your logical thinking and system architecture skills are perfect for server-side development.',
        primarySkills: ['Node.js', 'Python', 'Java', 'SQL', 'API Design'],
        confidence: 0.83,
        salaryRange: '$70,000 - $130,000',
        growthOutlook: 'High demand (+20% growth)',
        description: 'Build robust server systems and APIs that power modern applications.'
      },
      'Full Stack Developer': {
        title: 'Full Stack Developer',
        whyFit: 'Your versatility and comprehensive technical knowledge make you ideal for end-to-end development.',
        primarySkills: ['React', 'Node.js', 'Databases', 'Git', 'DevOps'],
        confidence: 0.84,
        salaryRange: '$75,000 - $140,000',
        growthOutlook: 'Very high demand (+25% growth)',
        description: 'Work on both frontend and backend to create complete web applications.'
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
      'UX/UI Designer': {
        title: 'UX/UI Designer',
        whyFit: 'Your creative abilities and user-focused mindset are ideal for designing digital experiences.',
        primarySkills: ['Figma', 'User Research', 'Prototyping', 'Design Systems', 'Usability'],
        confidence: 0.78,
        salaryRange: '$60,000 - $130,000',
        growthOutlook: 'Growing demand (+18% growth)',
        description: 'Create intuitive and beautiful interfaces that solve real user problems.'
      },
      'Data Analyst': {
        title: 'Data Analyst',
        whyFit: 'Your analytical skills and attention to detail are perfect for interpreting business data.',
        primarySkills: ['Excel', 'SQL', 'Tableau', 'Python', 'Statistics'],
        confidence: 0.76,
        salaryRange: '$50,000 - $85,000',
        growthOutlook: 'High demand (+25% growth)',
        description: 'Analyze data to help businesses make informed decisions and identify trends.'
      },
      'Software Engineer': {
        title: 'Software Engineer',
        whyFit: 'Your problem-solving abilities and technical expertise are ideal for building software solutions.',
        primarySkills: ['Programming', 'Algorithms', 'System Design', 'Testing', 'Debugging'],
        confidence: 0.85,
        salaryRange: '$70,000 - $150,000',
        growthOutlook: 'Very high demand (+22% growth)',
        description: 'Design, develop, and maintain software applications and systems.'
      },
      'Machine Learning Engineer': {
        title: 'Machine Learning Engineer',
        whyFit: 'Your mathematical background and programming skills are perfect for AI development.',
        primarySkills: ['Python', 'TensorFlow', 'PyTorch', 'Machine Learning', 'MLOps'],
        confidence: 0.81,
        salaryRange: '$90,000 - $180,000',
        growthOutlook: 'Exceptional demand (+40% growth)',
        description: 'Build and deploy machine learning models that power intelligent applications.'
      },
      'Cybersecurity Analyst': {
        title: 'Cybersecurity Analyst',
        whyFit: 'Your attention to detail and security mindset are essential for protecting digital assets.',
        primarySkills: ['Security Protocols', 'Risk Assessment', 'Incident Response', 'Penetration Testing', 'Compliance'],
        confidence: 0.79,
        salaryRange: '$65,000 - $130,000',
        growthOutlook: 'Very high demand (+31% growth)',
        description: 'Protect organizations from cyber threats and ensure information security.'
      },
      
      // Legal & Law
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
      'Legal Consultant': {
        title: 'Legal Consultant',
        whyFit: 'Your expertise and advisory skills are perfect for providing specialized legal guidance.',
        primarySkills: ['Legal Analysis', 'Advisory Services', 'Risk Management', 'Compliance', 'Contract Review'],
        confidence: 0.77,
        salaryRange: '$60,000 - $150,000',
        growthOutlook: 'Growing demand (+10% growth)',
        description: 'Provide expert legal advice to businesses and individuals on specialized matters.'
      },
      'Paralegal': {
        title: 'Paralegal',
        whyFit: 'Your organizational skills and legal knowledge make you essential for supporting legal teams.',
        primarySkills: ['Legal Research', 'Document Preparation', 'Case Management', 'Client Communication', 'Filing'],
        confidence: 0.74,
        salaryRange: '$35,000 - $65,000',
        growthOutlook: 'Growing demand (+12% growth)',
        description: 'Assist lawyers with research, documentation, and case preparation.'
      },
      'Legal Advisor': {
        title: 'Legal Advisor',
        whyFit: 'Your analytical skills and legal knowledge are perfect for providing strategic legal guidance.',
        primarySkills: ['Legal Strategy', 'Risk Assessment', 'Compliance', 'Policy Development', 'Legal Writing'],
        confidence: 0.78,
        salaryRange: '$55,000 - $120,000',
        growthOutlook: 'Steady demand (+8% growth)',
        description: 'Provide legal guidance and strategic advice to organizations and individuals.'
      },
      'Family Lawyer': {
        title: 'Family Lawyer',
        whyFit: 'Your empathy and mediation skills are ideal for handling sensitive family legal matters.',
        primarySkills: ['Family Law', 'Mediation', 'Negotiation', 'Child Custody', 'Divorce Proceedings'],
        confidence: 0.76,
        salaryRange: '$50,000 - $120,000',
        growthOutlook: 'Steady demand (+6% growth)',
        description: 'Handle divorce, custody, adoption, and other family-related legal matters.'
      },
      'Criminal Defense Attorney': {
        title: 'Criminal Defense Attorney',
        whyFit: 'Your advocacy skills and commitment to justice make you ideal for defending clients.',
        primarySkills: ['Criminal Law', 'Trial Advocacy', 'Evidence Analysis', 'Client Defense', 'Plea Negotiation'],
        confidence: 0.80,
        salaryRange: '$45,000 - $150,000',
        growthOutlook: 'Stable demand (+6% growth)',
        description: 'Defend individuals and organizations facing criminal charges.'
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
      'Tax Consultant': {
        title: 'Tax Consultant',
        whyFit: 'Your attention to detail and tax knowledge are perfect for helping clients optimize their tax strategies.',
        primarySkills: ['Tax Law', 'Tax Planning', 'IRS Regulations', 'Financial Analysis', 'Client Advisory'],
        confidence: 0.81,
        salaryRange: '$45,000 - $100,000',
        growthOutlook: 'Steady demand (+7% growth)',
        description: 'Help individuals and businesses minimize tax liability and ensure compliance.'
      },
      'Auditor': {
        title: 'Auditor',
        whyFit: 'Your analytical skills and integrity are essential for ensuring financial accuracy and compliance.',
        primarySkills: ['Financial Auditing', 'Risk Assessment', 'Compliance', 'Financial Analysis', 'Report Writing'],
        confidence: 0.79,
        salaryRange: '$50,000 - $90,000',
        growthOutlook: 'Steady demand (+7% growth)',
        description: 'Examine financial records and ensure compliance with regulations and standards.'
      },
      'Financial Analyst': {
        title: 'Financial Analyst',
        whyFit: 'Your analytical mindset and financial acumen are perfect for evaluating investment opportunities.',
        primarySkills: ['Financial Modeling', 'Data Analysis', 'Market Research', 'Valuation', 'Excel'],
        confidence: 0.77,
        salaryRange: '$55,000 - $95,000',
        growthOutlook: 'Growing demand (+11% growth)',
        description: 'Analyze financial data to help businesses and investors make informed decisions.'
      },
      'Bookkeeper': {
        title: 'Bookkeeper',
        whyFit: 'Your attention to detail and organizational skills are essential for maintaining accurate financial records.',
        primarySkills: ['Accounting Software', 'Financial Recording', 'Reconciliation', 'Payroll', 'Tax Preparation'],
        confidence: 0.73,
        salaryRange: '$30,000 - $55,000',
        growthOutlook: 'Steady demand (+4% growth)',
        description: 'Maintain accurate financial records and handle day-to-day accounting tasks.'
      },
      'Risk Analyst': {
        title: 'Risk Analyst',
        whyFit: 'Your analytical skills and risk assessment abilities are perfect for identifying potential threats.',
        primarySkills: ['Risk Assessment', 'Statistical Analysis', 'Financial Modeling', 'Compliance', 'Report Writing'],
        confidence: 0.78,
        salaryRange: '$55,000 - $100,000',
        growthOutlook: 'Growing demand (+13% growth)',
        description: 'Identify and analyze potential risks that could impact business operations.'
      },
      
      // Healthcare & Medicine
      'Physician': {
        title: 'Physician (MD)',
        whyFit: 'Your compassion, analytical thinking, and dedication to helping others are essential for medical practice.',
        primarySkills: ['Medical Diagnosis', 'Patient Care', 'Clinical Research', 'Medical Ethics', 'Treatment Planning'],
        confidence: 0.85,
        salaryRange: '$150,000 - $400,000',
        growthOutlook: 'High demand (+18% growth)',
        description: 'Diagnose and treat patients, conduct medical research, and improve healthcare outcomes.'
      },
      'Surgeon': {
        title: 'Surgeon',
        whyFit: 'Your precision, steady hands, and decision-making skills are essential for surgical procedures.',
        primarySkills: ['Surgical Techniques', 'Anatomy', 'Patient Care', 'Emergency Response', 'Medical Technology'],
        confidence: 0.87,
        salaryRange: '$200,000 - $500,000',
        growthOutlook: 'High demand (+15% growth)',
        description: 'Perform surgical procedures to treat injuries, diseases, and deformities.'
      },
      'Nurse': {
        title: 'Nurse',
        whyFit: 'Your caring nature and clinical skills are perfect for providing patient care and support.',
        primarySkills: ['Patient Care', 'Medical Procedures', 'Health Assessment', 'Medication Administration', 'Communication'],
        confidence: 0.82,
        salaryRange: '$60,000 - $90,000',
        growthOutlook: 'Very high demand (+26% growth)',
        description: 'Provide direct patient care, administer medications, and support healthcare teams.'
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
      'Dentist': {
        title: 'Dentist',
        whyFit: 'Your precision and patient care skills are perfect for oral healthcare and dental procedures.',
        primarySkills: ['Dental Procedures', 'Oral Health', 'Patient Care', 'Dental Technology', 'Preventive Care'],
        confidence: 0.84,
        salaryRange: '$120,000 - $250,000',
        growthOutlook: 'Growing demand (+8% growth)',
        description: 'Diagnose and treat oral health issues, perform dental procedures, and promote oral hygiene.'
      },
      'Pharmacist': {
        title: 'Pharmacist',
        whyFit: 'Your attention to detail and medication knowledge are essential for safe pharmaceutical practice.',
        primarySkills: ['Pharmaceutical Knowledge', 'Drug Interactions', 'Patient Counseling', 'Prescription Review', 'Healthcare'],
        confidence: 0.81,
        salaryRange: '$100,000 - $150,000',
        growthOutlook: 'Moderate growth (+6% growth)',
        description: 'Dispense medications, provide drug information, and ensure safe pharmaceutical care.'
      },
      'Medical Technician': {
        title: 'Medical Technician',
        whyFit: 'Your technical skills and attention to detail are perfect for supporting medical diagnostics and procedures.',
        primarySkills: ['Medical Equipment', 'Laboratory Procedures', 'Patient Care', 'Technical Analysis', 'Healthcare Technology'],
        confidence: 0.76,
        salaryRange: '$40,000 - $70,000',
        growthOutlook: 'High demand (+20% growth)',
        description: 'Operate medical equipment, conduct tests, and support healthcare professionals.'
      },
      'Healthcare Administrator': {
        title: 'Healthcare Administrator',
        whyFit: 'Your organizational and leadership skills are ideal for managing healthcare operations and policies.',
        primarySkills: ['Healthcare Management', 'Policy Development', 'Budget Management', 'Compliance', 'Leadership'],
        confidence: 0.78,
        salaryRange: '$70,000 - $130,000',
        growthOutlook: 'High demand (+18% growth)',
        description: 'Manage healthcare facilities, develop policies, and ensure efficient healthcare delivery.'
      },
      
      // Business & Management
      'Business Analyst': {
        title: 'Business Analyst',
        whyFit: 'Your analytical thinking and business acumen are perfect for identifying improvement opportunities.',
        primarySkills: ['Process Analysis', 'Requirements Gathering', 'Data Analysis', 'Project Management', 'Communication'],
        confidence: 0.79,
        salaryRange: '$60,000 - $110,000',
        growthOutlook: 'Growing demand (+14% growth)',
        description: 'Analyze business processes and recommend solutions to improve efficiency and effectiveness.'
      },
      'Management Consultant': {
        title: 'Management Consultant',
        whyFit: 'Your strategic thinking and problem-solving abilities are perfect for helping organizations improve.',
        primarySkills: ['Strategy Development', 'Process Improvement', 'Data Analysis', 'Client Presentation', 'Change Management'],
        confidence: 0.81,
        salaryRange: '$75,000 - $180,000',
        growthOutlook: 'Strong demand (+14% growth)',
        description: 'Analyze business problems and develop solutions to help organizations operate more effectively.'
      },
      'Operations Manager': {
        title: 'Operations Manager',
        whyFit: 'Your organizational skills and process optimization mindset are ideal for managing business operations.',
        primarySkills: ['Operations Management', 'Process Optimization', 'Team Leadership', 'Budget Management', 'Quality Control'],
        confidence: 0.80,
        salaryRange: '$65,000 - $120,000',
        growthOutlook: 'Steady demand (+8% growth)',
        description: 'Oversee daily operations, optimize processes, and ensure efficient business functioning.'
      },
      'Sales Manager': {
        title: 'Sales Manager',
        whyFit: 'Your communication skills and results-driven mindset are perfect for leading sales teams.',
        primarySkills: ['Sales Strategy', 'Team Leadership', 'Customer Relations', 'Revenue Growth', 'Negotiation'],
        confidence: 0.77,
        salaryRange: '$60,000 - $140,000',
        growthOutlook: 'Steady demand (+7% growth)',
        description: 'Lead sales teams, develop strategies, and drive revenue growth for organizations.'
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
      'Project Manager': {
        title: 'Project Manager',
        whyFit: 'Your organizational skills and leadership abilities are perfect for coordinating complex projects.',
        primarySkills: ['Project Planning', 'Team Coordination', 'Risk Management', 'Budget Management', 'Communication'],
        confidence: 0.78,
        salaryRange: '$70,000 - $130,000',
        growthOutlook: 'Growing demand (+11% growth)',
        description: 'Plan, execute, and deliver projects on time and within budget.'
      },
      'Account Manager': {
        title: 'Account Manager',
        whyFit: 'Your relationship-building skills and customer focus are ideal for managing client accounts.',
        primarySkills: ['Client Relations', 'Account Growth', 'Communication', 'Problem Solving', 'Sales'],
        confidence: 0.75,
        salaryRange: '$50,000 - $100,000',
        growthOutlook: 'Steady demand (+8% growth)',
        description: 'Manage client relationships, ensure satisfaction, and drive account growth.'
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
      'Teacher': {
        title: 'Teacher',
        whyFit: 'Your patience and communication skills are perfect for educating and inspiring students.',
        primarySkills: ['Curriculum Development', 'Classroom Management', 'Student Assessment', 'Educational Technology', 'Communication'],
        confidence: 0.79,
        salaryRange: '$40,000 - $70,000',
        growthOutlook: 'Steady demand (+8% growth)',
        description: 'Educate students, develop curricula, and foster learning environments.'
      },
      'Education Consultant': {
        title: 'Education Consultant',
        whyFit: 'Your educational expertise and advisory skills are perfect for improving educational systems.',
        primarySkills: ['Educational Strategy', 'Curriculum Design', 'Training', 'Assessment', 'Policy Development'],
        confidence: 0.77,
        salaryRange: '$55,000 - $100,000',
        growthOutlook: 'Growing demand (+10% growth)',
        description: 'Advise educational institutions on best practices and improvement strategies.'
      },
      'Training Specialist': {
        title: 'Training Specialist',
        whyFit: 'Your teaching abilities and expertise development skills are ideal for corporate training.',
        primarySkills: ['Training Design', 'Adult Learning', 'Presentation Skills', 'Assessment', 'E-Learning'],
        confidence: 0.76,
        salaryRange: '$50,000 - $85,000',
        growthOutlook: 'Growing demand (+11% growth)',
        description: 'Design and deliver training programs to develop employee skills and knowledge.'
      },
      'Academic Advisor': {
        title: 'Academic Advisor',
        whyFit: 'Your guidance and educational knowledge are perfect for helping students succeed academically.',
        primarySkills: ['Student Counseling', 'Academic Planning', 'Career Guidance', 'Educational Requirements', 'Communication'],
        confidence: 0.74,
        salaryRange: '$35,000 - $65,000',
        growthOutlook: 'Growing demand (+12% growth)',
        description: 'Guide students through academic programs and help them achieve educational goals.'
      },
      'Curriculum Designer': {
        title: 'Curriculum Designer',
        whyFit: 'Your educational vision and content development skills are ideal for creating learning experiences.',
        primarySkills: ['Curriculum Development', 'Educational Technology', 'Learning Objectives', 'Assessment Design', 'Content Creation'],
        confidence: 0.78,
        salaryRange: '$55,000 - $90,000',
        growthOutlook: 'Growing demand (+10% growth)',
        description: 'Design educational curricula and learning experiences for various educational levels.'
      },
      
      // Creative & Media
      'Graphic Designer': {
        title: 'Graphic Designer',
        whyFit: 'Your artistic abilities and attention to visual detail are perfect for creating compelling designs.',
        primarySkills: ['Adobe Creative Suite', 'Typography', 'Branding', 'Layout Design', 'Visual Communication'],
        confidence: 0.74,
        salaryRange: '$40,000 - $75,000',
        growthOutlook: 'Steady demand (+5% growth)',
        description: 'Create visual concepts that communicate ideas and inspire audiences across various media.'
      },
      'Content Creator': {
        title: 'Content Creator',
        whyFit: 'Your creativity and storytelling abilities are perfect for producing engaging digital content.',
        primarySkills: ['Content Writing', 'Video Production', 'Social Media', 'Storytelling', 'Digital Marketing'],
        confidence: 0.73,
        salaryRange: '$35,000 - $80,000',
        growthOutlook: 'Very high demand (+25% growth)',
        description: 'Create engaging content across various platforms to build audiences and drive engagement.'
      },
      'Digital Marketing Specialist': {
        title: 'Digital Marketing Specialist',
        whyFit: 'Your creativity and analytical skills make you perfect for data-driven marketing.',
        primarySkills: ['Google Analytics', 'Content Strategy', 'SEO', 'Social Media', 'A/B Testing'],
        confidence: 0.77,
        salaryRange: '$55,000 - $110,000',
        growthOutlook: 'Strong demand (+15% growth)',
        description: 'Drive growth through creative campaigns and data-driven marketing strategies.'
      },
      'Marketing Manager': {
        title: 'Marketing Manager',
        whyFit: 'Your strategic thinking and creative skills are ideal for leading marketing initiatives.',
        primarySkills: ['Marketing Strategy', 'Brand Management', 'Campaign Development', 'Team Leadership', 'Analytics'],
        confidence: 0.79,
        salaryRange: '$60,000 - $120,000',
        growthOutlook: 'Growing demand (+10% growth)',
        description: 'Develop and execute marketing strategies to promote products and services.'
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
      'Interior Designer': {
        title: 'Interior Designer',
        whyFit: 'Your aesthetic sense and spatial awareness are perfect for creating beautiful interior spaces.',
        primarySkills: ['Design Software', 'Color Theory', 'Space Planning', 'Client Relations', 'Project Management'],
        confidence: 0.75,
        salaryRange: '$40,000 - $85,000',
        growthOutlook: 'Growing demand (+11% growth)',
        description: 'Design interior spaces that are functional, safe, and aesthetically pleasing.'
      },
      'Video Editor': {
        title: 'Video Editor',
        whyFit: 'Your attention to detail and storytelling skills are perfect for creating compelling video content.',
        primarySkills: ['Video Editing Software', 'Storytelling', 'Color Correction', 'Audio Editing', 'Motion Graphics'],
        confidence: 0.74,
        salaryRange: '$35,000 - $75,000',
        growthOutlook: 'High demand (+18% growth)',
        description: 'Edit and produce video content for various media platforms and audiences.'
      },
      'Photographer': {
        title: 'Photographer',
        whyFit: 'Your artistic vision and technical skills are perfect for capturing compelling images.',
        primarySkills: ['Photography Techniques', 'Photo Editing', 'Lighting', 'Composition', 'Client Relations'],
        confidence: 0.72,
        salaryRange: '$30,000 - $70,000',
        growthOutlook: 'Moderate growth (+9% growth)',
        description: 'Capture professional photographs for various purposes including events, portraits, and commercial use.'
      },
      'Social Media Manager': {
        title: 'Social Media Manager',
        whyFit: 'Your communication skills and understanding of digital trends are perfect for social media strategy.',
        primarySkills: ['Social Media Strategy', 'Content Creation', 'Community Management', 'Analytics', 'Brand Voice'],
        confidence: 0.76,
        salaryRange: '$40,000 - $80,000',
        growthOutlook: 'Very high demand (+26% growth)',
        description: 'Develop and execute social media strategies to build brand awareness and engagement.'
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
      'Mechanical Engineer': {
        title: 'Mechanical Engineer',
        whyFit: 'Your problem-solving skills and technical knowledge are perfect for designing mechanical systems.',
        primarySkills: ['CAD Design', 'Thermodynamics', 'Materials Science', 'Manufacturing', 'Project Management'],
        confidence: 0.81,
        salaryRange: '$70,000 - $130,000',
        growthOutlook: 'Steady demand (+7% growth)',
        description: 'Design, develop, and test mechanical devices and systems.'
      },
      'Research Scientist': {
        title: 'Research Scientist',
        whyFit: 'Your curiosity and analytical mindset are perfect for advancing scientific knowledge.',
        primarySkills: ['Research Methodology', 'Data Analysis', 'Laboratory Techniques', 'Scientific Writing', 'Grant Writing'],
        confidence: 0.81,
        salaryRange: '$60,000 - $130,000',
        growthOutlook: 'Strong demand (+17% growth)',
        description: 'Conduct experiments and research to advance scientific understanding and develop new technologies.'
      },
      'Environmental Scientist': {
        title: 'Environmental Scientist',
        whyFit: 'Your analytical skills and environmental awareness are perfect for protecting our planet.',
        primarySkills: ['Environmental Assessment', 'Data Analysis', 'Research Methods', 'Environmental Policy', 'Field Work'],
        confidence: 0.78,
        salaryRange: '$50,000 - $95,000',
        growthOutlook: 'Growing demand (+11% growth)',
        description: 'Study environmental problems and develop solutions to protect human health and the environment.'
      },
      'Chemical Engineer': {
        title: 'Chemical Engineer',
        whyFit: 'Your analytical skills and understanding of chemical processes are ideal for industrial applications.',
        primarySkills: ['Process Design', 'Chemical Analysis', 'Safety Protocols', 'Quality Control', 'Process Optimization'],
        confidence: 0.80,
        salaryRange: '$75,000 - $140,000',
        growthOutlook: 'Steady demand (+9% growth)',
        description: 'Design and optimize chemical processes for manufacturing and production.'
      },
      'Biomedical Engineer': {
        title: 'Biomedical Engineer',
        whyFit: 'Your technical skills and healthcare interest are perfect for developing medical technologies.',
        primarySkills: ['Medical Device Design', 'Biomechanics', 'Data Analysis', 'Regulatory Compliance', 'Research'],
        confidence: 0.82,
        salaryRange: '$70,000 - $130,000',
        growthOutlook: 'High demand (+23% growth)',
        description: 'Design medical equipment and devices to improve healthcare outcomes.'
      },
      'Lab Technician': {
        title: 'Lab Technician',
        whyFit: 'Your attention to detail and technical skills are essential for accurate laboratory work.',
        primarySkills: ['Laboratory Procedures', 'Data Collection', 'Equipment Operation', 'Quality Control', 'Safety Protocols'],
        confidence: 0.75,
        salaryRange: '$35,000 - $65,000',
        growthOutlook: 'Growing demand (+13% growth)',
        description: 'Conduct laboratory tests and experiments to support scientific research and analysis.'
      },
      
      // Other Professions
      'Real Estate Agent': {
        title: 'Real Estate Agent',
        whyFit: 'Your communication skills and sales ability are perfect for helping people buy and sell properties.',
        primarySkills: ['Sales', 'Negotiation', 'Market Analysis', 'Client Relations', 'Property Knowledge'],
        confidence: 0.74,
        salaryRange: '$30,000 - $150,000',
        growthOutlook: 'Steady demand (+6% growth)',
        description: 'Help clients buy, sell, and rent properties while providing market expertise and guidance.'
      },
      'Chef': {
        title: 'Chef',
        whyFit: 'Your creativity and culinary skills are perfect for creating exceptional dining experiences.',
        primarySkills: ['Culinary Techniques', 'Menu Development', 'Kitchen Management', 'Food Safety', 'Creativity'],
        confidence: 0.73,
        salaryRange: '$35,000 - $80,000',
        growthOutlook: 'Growing demand (+15% growth)',
        description: 'Create delicious meals, manage kitchen operations, and develop innovative culinary experiences.'
      },
      'Personal Trainer': {
        title: 'Personal Trainer',
        whyFit: 'Your fitness knowledge and motivational skills are perfect for helping others achieve health goals.',
        primarySkills: ['Exercise Science', 'Nutrition', 'Motivation', 'Program Design', 'Client Relations'],
        confidence: 0.76,
        salaryRange: '$25,000 - $65,000',
        growthOutlook: 'High demand (+15% growth)',
        description: 'Help clients achieve fitness goals through personalized exercise programs and guidance.'
      },
      'Event Planner': {
        title: 'Event Planner',
        whyFit: 'Your organizational skills and attention to detail are perfect for creating memorable events.',
        primarySkills: ['Event Coordination', 'Vendor Management', 'Budget Planning', 'Client Relations', 'Project Management'],
        confidence: 0.75,
        salaryRange: '$35,000 - $75,000',
        growthOutlook: 'Growing demand (+11% growth)',
        description: 'Plan and coordinate events, from corporate meetings to weddings and festivals.'
      },
      'Travel Agent': {
        title: 'Travel Agent',
        whyFit: 'Your planning skills and travel knowledge are perfect for creating amazing travel experiences.',
        primarySkills: ['Travel Planning', 'Customer Service', 'Destination Knowledge', 'Booking Systems', 'Communication'],
        confidence: 0.72,
        salaryRange: '$30,000 - $60,000',
        growthOutlook: 'Moderate growth (+5% growth)',
        description: 'Plan and book travel arrangements, providing expertise on destinations and travel options.'
      },
      'Insurance Agent': {
        title: 'Insurance Agent',
        whyFit: 'Your communication skills and risk assessment abilities are ideal for helping clients protect their assets.',
        primarySkills: ['Sales', 'Risk Assessment', 'Policy Knowledge', 'Client Relations', 'Communication'],
        confidence: 0.74,
        salaryRange: '$35,000 - $90,000',
        growthOutlook: 'Steady demand (+7% growth)',
        description: 'Help clients choose appropriate insurance coverage to protect their health, property, and finances.'
      },
      'Consultant': {
        title: 'Consultant',
        whyFit: 'Your expertise and problem-solving skills are perfect for providing specialized advisory services.',
        primarySkills: ['Industry Expertise', 'Problem Solving', 'Client Relations', 'Analysis', 'Communication'],
        confidence: 0.77,
        salaryRange: '$50,000 - $150,000',
        growthOutlook: 'Growing demand (+11% growth)',
        description: 'Provide expert advice and solutions to organizations in your area of specialization.'
      },
      'Entrepreneur': {
        title: 'Entrepreneur',
        whyFit: 'Your innovative thinking and risk-taking ability are perfect for starting and growing businesses.',
        primarySkills: ['Business Development', 'Innovation', 'Leadership', 'Risk Management', 'Strategic Planning'],
        confidence: 0.76,
        salaryRange: '$0 - $1,000,000+',
        growthOutlook: 'Self-driven opportunity',
        description: 'Start and grow businesses, bringing innovative ideas to market and creating value.'
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