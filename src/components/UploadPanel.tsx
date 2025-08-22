import { useState, useRef } from 'react';
import { Upload, FileText, Link, Type, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

interface UploadPanelProps {
  onUploadComplete: (data: ParsedProfile) => void;
}

export interface ParsedProfile {
  rawText: string;
  skills: string[];
  education: any[];
  experience: any[];
  summary: string;
}

export const UploadPanel = ({ onUploadComplete }: UploadPanelProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [rawText, setRawText] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  };

  const handleFiles = async (files: File[]) => {
    const file = files[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ];

    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF, DOC, DOCX, or TXT file.",
        variant: "destructive"
      });
      return;
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 10MB.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate file processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock parsed data - in a real app, this would be processed by the server
      const mockProfile: ParsedProfile = {
        rawText: file.name.includes('developer') ? 
          "Experienced Frontend Developer with 5+ years in React, TypeScript, and modern web technologies. Built scalable applications for enterprise clients. Strong background in UX design and agile development." :
          "Marketing professional with 3+ years experience in digital marketing, content strategy, and analytics. Led campaigns that increased user engagement by 40%. Skilled in Google Analytics, social media marketing, and content creation.",
        skills: file.name.includes('developer') ? 
          ['React', 'TypeScript', 'Node.js', 'Python', 'Git', 'AWS', 'GraphQL', 'MongoDB'] :
          ['Google Analytics', 'Content Marketing', 'Social Media', 'SEO', 'Email Marketing', 'Adobe Creative Suite'],
        education: [{
          degree: 'Bachelor of Science',
          field: file.name.includes('developer') ? 'Computer Science' : 'Marketing',
          school: 'University of Technology',
          year: '2018'
        }],
        experience: [{
          title: file.name.includes('developer') ? 'Senior Frontend Developer' : 'Digital Marketing Specialist',
          company: file.name.includes('developer') ? 'TechCorp Inc.' : 'Growth Agency',
          duration: '2021 - Present',
          description: 'Led development of user-facing features and marketing campaigns.'
        }],
        summary: file.name.includes('developer') ? 
          'Senior developer with expertise in modern web technologies and user experience design.' :
          'Marketing professional focused on data-driven campaigns and user engagement.'
      };

      toast({
        title: "Resume processed successfully!",
        description: "We've extracted your skills and experience.",
        variant: "default"
      });

      onUploadComplete(mockProfile);
    } catch (error) {
      toast({
        title: "Processing failed",
        description: "Unable to process your resume. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleLinkedInSubmit = async () => {
    if (!linkedinUrl) return;

    setIsProcessing(true);

    try {
      // Simulate LinkedIn processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock LinkedIn data
      const mockProfile: ParsedProfile = {
        rawText: "Product Manager with 4+ years experience leading cross-functional teams to deliver innovative digital products. Expertise in agile methodologies, user research, and data-driven decision making. Successfully launched 3 major product features that increased user retention by 25%.",
        skills: ['Product Management', 'Agile', 'User Research', 'Analytics', 'SQL', 'Figma', 'Jira', 'A/B Testing'],
        education: [{
          degree: 'MBA',
          field: 'Business Administration',
          school: 'Business School',
          year: '2019'
        }],
        experience: [{
          title: 'Senior Product Manager',
          company: 'InnovateCorp',
          duration: '2020 - Present',
          description: 'Leading product strategy and roadmap for core platform features.'
        }],
        summary: 'Experienced product manager with a track record of successful product launches and team leadership.'
      };

      toast({
        title: "LinkedIn profile processed!",
        description: "Successfully extracted your professional information.",
        variant: "default"
      });

      onUploadComplete(mockProfile);
    } catch (error) {
      toast({
        title: "Processing failed",
        description: "Unable to process LinkedIn profile. Please try pasting your profile text instead.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRawTextSubmit = async () => {
    if (!rawText.trim()) return;

    setIsProcessing(true);

    try {
      // Simulate text processing
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Extract skills and create profile from raw text
      const commonSkills = [
        'JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'Git', 'AWS', 'Docker',
        'Marketing', 'Analytics', 'SEO', 'Content Writing', 'Project Management',
        'Leadership', 'Communication', 'Problem Solving', 'Team Work'
      ];
      
      const extractedSkills = commonSkills.filter(skill => 
        rawText.toLowerCase().includes(skill.toLowerCase())
      );

      const mockProfile: ParsedProfile = {
        rawText: rawText,
        skills: extractedSkills.length > 0 ? extractedSkills : ['Communication', 'Problem Solving', 'Team Work'],
        education: [{
          degree: 'Degree',
          field: 'Field of Study',
          school: 'University',
          year: '2020'
        }],
        experience: [{
          title: 'Professional',
          company: 'Company',
          duration: '2020 - Present',
          description: 'Professional experience and achievements.'
        }],
        summary: rawText.slice(0, 150) + (rawText.length > 150 ? '...' : '')
      };

      toast({
        title: "Text processed successfully!",
        description: "We've analyzed your background information.",
        variant: "default"
      });

      onUploadComplete(mockProfile);
    } catch (error) {
      toast({
        title: "Processing failed",
        description: "Unable to process your text. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">
          Share Your Professional <span className="gradient-text">Background</span>
        </h2>
        <p className="text-muted-foreground text-lg">
          Upload your resume or paste your LinkedIn profile. We'll do the rest.
        </p>
      </div>

      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-3 glass-card p-1">
          <TabsTrigger value="upload" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Upload File
          </TabsTrigger>
          <TabsTrigger value="linkedin" className="flex items-center gap-2">
            <Link className="h-4 w-4" />
            LinkedIn URL
          </TabsTrigger>
          <TabsTrigger value="text" className="flex items-center gap-2">
            <Type className="h-4 w-4" />
            Paste Text
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="mt-6">
          <div
            className={`upload-zone rounded-2xl p-12 text-center transition-all duration-300 ${
              isDragging ? 'dragover' : ''
            } ${isProcessing ? 'opacity-50 pointer-events-none' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileSelect}
            />
            
            {isProcessing ? (
              <div className="animate-pulse">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-background animate-pulse" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Processing your resume...</h3>
                <p className="text-muted-foreground">This may take a few moments</p>
              </div>
            ) : (
              <>
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Upload className="h-8 w-8 text-background" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Drop your resume here</h3>
                <p className="text-muted-foreground mb-6">
                  Supports PDF, DOC, DOCX files up to 10MB
                </p>
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-gradient-primary text-background hover:opacity-90"
                >
                  Choose File
                </Button>
              </>
            )}
          </div>
        </TabsContent>

        <TabsContent value="linkedin" className="mt-6">
          <div className="glass-card p-6 rounded-2xl">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">LinkedIn Profile URL</label>
              <Input
                type="url"
                placeholder="https://linkedin.com/in/yourprofile"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                className="bg-background/50"
              />
            </div>
            <Button
              onClick={handleLinkedInSubmit}
              disabled={!linkedinUrl || isProcessing}
              className="w-full bg-gradient-primary text-background hover:opacity-90"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-background border-t-transparent rounded-full mr-2"></div>
                  Processing...
                </>
              ) : (
                <>
                  <Link className="h-4 w-4 mr-2" />
                  Analyze LinkedIn Profile
                </>
              )}
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="text" className="mt-6">
          <div className="glass-card p-6 rounded-2xl">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Paste your resume or profile text</label>
              <Textarea
                placeholder="Paste your resume content, LinkedIn profile summary, or any professional background information here..."
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                className="min-h-[200px] bg-background/50"
              />
            </div>
            <Button
              onClick={handleRawTextSubmit}
              disabled={!rawText.trim() || isProcessing}
              className="w-full bg-gradient-primary text-background hover:opacity-90"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-background border-t-transparent rounded-full mr-2"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Analyze Text
                </>
              )}
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-8 p-4 glass-card rounded-xl">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-mentra-cyan mt-0.5" />
          <div>
            <h4 className="font-medium text-sm">Privacy Notice</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Your data is processed securely and used only to provide personalized career insights. 
              We don't store your files permanently.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};