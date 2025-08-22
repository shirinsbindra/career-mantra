import { useState } from 'react';
import { ArrowRight, Upload, Target, Zap, Star, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LandingProps {
  onGetStarted: () => void;
}

export const Landing = ({ onGetStarted }: LandingProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-accent/20 to-background"></div>
        <div className="absolute inset-0 bg-gradient-glow opacity-30"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-primary rounded-full opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-secondary rounded-full opacity-20 animate-float animate-delay-200"></div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          {/* Logo */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-6xl md:text-8xl font-bold gradient-text tracking-tight">
              Mentra
            </h1>
            <div className="w-12 h-1 bg-gradient-primary mx-auto mt-4 rounded-full"></div>
          </div>
          
          {/* Tagline */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-4 animate-fade-in animate-delay-200">
            Your Career, Your Mantra.
          </p>
          
          {/* Main Heading */}
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 animate-fade-in animate-delay-300">
            Master Your Career Path with{' '}
            <span className="gradient-text">AI Guidance</span>
          </h2>
          
          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 animate-fade-in animate-delay-300">
            Upload your resume, discover your perfect career match, and get a personalized roadmap 
            to achieve your professional goals. Like having a career mentor in your pocket.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up animate-delay-300">
            <Button
              onClick={onGetStarted}
              size="lg"
              className="group bg-gradient-primary text-background hover:opacity-90 transition-all duration-300 px-8 py-6 text-lg rounded-2xl hover-glow"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Get Started Free
              <ArrowRight className={`ml-2 h-5 w-5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-6 text-lg rounded-2xl border-2 border-primary/30 hover:border-primary/60 glass-card"
            >
              Watch Demo
            </Button>
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-16 flex flex-wrap justify-center items-center gap-8 text-muted-foreground animate-fade-in animate-delay-300">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-mentra-green" />
              <span>Free to use</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-mentra-green" />
              <span>AI-powered insights</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-mentra-green" />
              <span>Personalized roadmaps</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Three Simple Steps to Your <span className="gradient-text">Dream Career</span>
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our AI analyzes your background and creates a personalized plan to help you reach your career goals.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="career-card text-center group">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:animate-pulse-glow">
                <Upload className="h-8 w-8 text-background" />
              </div>
              <h4 className="text-xl font-semibold mb-4 text-foreground">Upload & Analyze</h4>
              <p className="text-muted-foreground">
                Upload your resume or paste your LinkedIn profile. Our AI extracts your skills, 
                experience, and achievements in seconds.
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="career-card text-center group">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:animate-pulse-glow">
                <Target className="h-8 w-8 text-background" />
              </div>
              <h4 className="text-xl font-semibold mb-4 text-foreground">Smart Alignment</h4>
              <p className="text-muted-foreground">
                Answer thoughtful questions about your preferences and goals. 
                We fine-tune recommendations just for you.
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="career-card text-center group">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:animate-pulse-glow">
                <Zap className="h-8 w-8 text-background" />
              </div>
              <h4 className="text-xl font-semibold mb-4 text-foreground">Get Your Roadmap</h4>
              <p className="text-muted-foreground">
                Receive personalized career paths, skill assessments, weekly plans, 
                and AI-powered interview practice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 px-6 bg-accent/20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center items-center gap-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-6 w-6 fill-mentra-green text-mentra-green" />
            ))}
          </div>
          <blockquote className="text-xl md:text-2xl text-foreground mb-6 italic">
            "Mentra helped me transition from marketing to product management. 
            The personalized roadmap and interview practice were game-changers."
          </blockquote>
          <cite className="text-muted-foreground">
            Sarah Chen, Product Manager at TechCorp
          </cite>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Master Your <span className="gradient-text">Career Path</span>?
          </h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who've accelerated their careers with Mentra. 
            Start your journey today.
          </p>
          
          <Button
            onClick={onGetStarted}
            size="lg"
            className="bg-gradient-primary text-background hover:opacity-90 transition-all duration-300 px-12 py-6 text-xl rounded-2xl hover-glow"
          >
            Start Your Career Transformation
            <ArrowRight className="ml-2 h-6 w-6" />
          </Button>
          
          <p className="text-sm text-muted-foreground mt-4">
            No credit card required • Free to get started
          </p>
        </div>
      </section>
    </div>
  );
};