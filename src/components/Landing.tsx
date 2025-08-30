import { ArrowRight, Upload, Target, Zap, Star, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LandingProps {
  onGetStarted: () => void;
}

export const Landing = ({ onGetStarted }: LandingProps) => {
  return (
    <div className="min-h-screen bg-background bg-mesh relative overflow-hidden">
      {/* Static Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-surface/30 to-background"></div>
      <div className="absolute inset-0 bg-noise opacity-30"></div>
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Static Geometric Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-primary rounded-2xl opacity-10"></div>
        <div className="absolute top-40 right-16 w-24 h-24 bg-gradient-secondary rounded-full opacity-15"></div>
        <div className="absolute bottom-32 left-20 w-16 h-16 bg-gradient-accent rounded-lg opacity-10"></div>
        <div className="absolute bottom-20 right-32 w-20 h-20 bg-gradient-primary rounded-full opacity-10"></div>
        
        {/* Main Content */}
        <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
          {/* Enhanced Logo Section */}
          <div className="mb-12">
            <div className="inline-block glass-strong p-8 rounded-3xl mb-6">
              <h1 className="text-hero gradient-text font-black tracking-tighter">
                Mentra AI
              </h1>
              <div className="w-20 h-1.5 bg-gradient-primary mx-auto mt-6 rounded-full"></div>
            </div>
            
            <p className="text-subheading text-muted-foreground mb-4">
              Your Career, Your Mantra.
            </p>
          </div>
          
          {/* Enhanced Main Heading */}
          <div className="mb-8">
            <h2 className="text-display text-foreground mb-6 leading-tight">
              Master Your Career Path with{' '}
              <span className="gradient-text">AI-Powered Guidance</span>
            </h2>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Upload your resume, discover your perfect career match, and get a personalized roadmap 
              to achieve your professional goals. It's like having a{' '}
              <span className="text-mentra-cyan font-medium">career mentor in your pocket</span>.
            </p>
          </div>
          
          {/* Enhanced CTA Section */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Button
              onClick={onGetStarted}
              size="lg"
              className="group btn-primary px-12 py-6 text-xl font-semibold rounded-2xl min-w-[280px]"
            >
              <span className="mr-3">Start Your Journey</span>
              <ArrowRight className="h-6 w-6" />
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="btn-ghost px-12 py-6 text-xl font-medium rounded-2xl min-w-[280px] border-2"
            >
              <span className="mr-3">Watch Demo</span>
              <span className="text-xs bg-mentra-green text-background px-2 py-1 rounded-full">2 min</span>
            </Button>
          </div>
          
          {/* Enhanced Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-muted-foreground">
            <div className="flex items-center gap-3 glass-surface px-4 py-2 rounded-full">
              <CheckCircle className="h-5 w-5 text-success" />
              <span className="font-medium">100% Free to Use</span>
            </div>
            <div className="flex items-center gap-3 glass-surface px-4 py-2 rounded-full">
              <CheckCircle className="h-5 w-5 text-success" />
              <span className="font-medium">AI-Powered Insights</span>
            </div>
            <div className="flex items-center gap-3 glass-surface px-4 py-2 rounded-full">
              <CheckCircle className="h-5 w-5 text-success" />
              <span className="font-medium">Personalized Roadmaps</span>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-block">
              <span className="text-sm font-medium text-mentra-cyan bg-mentra-cyan/10 px-4 py-2 rounded-full mb-6 inline-block">
                How It Works
              </span>
            </div>
            <h3 className="text-display mb-8">
              Three Simple Steps to Your <span className="gradient-text">Dream Career</span>
            </h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Our advanced AI analyzes your background and creates a personalized plan to help you reach your career goals faster than ever before.
            </p>
          </div>
          
          {/* Enhanced Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {/* Step 1 - Enhanced */}
            <div className="feature-card text-center group relative">
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-background font-bold text-sm">
                1
              </div>
              
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-8 transition-all duration-300">
                  <Upload className="h-10 w-10 text-background" />
                </div>
                
                <h4 className="text-heading mb-6 text-foreground">Upload & Analyze</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Upload your resume or paste your LinkedIn profile. Our advanced AI extracts your skills, 
                  experience, and achievements in seconds with{' '}
                  <span className="text-mentra-cyan font-medium">99% accuracy</span>.
                </p>
                
                <div className="mt-6 flex justify-center space-x-2">
                  <div className="status-indicator status-active"></div>
                  <div className="status-indicator status-pending"></div>
                  <div className="status-indicator status-pending"></div>
                </div>
              </div>
            </div>
            
            {/* Step 2 - Enhanced */}
            <div className="feature-card text-center group relative">
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-background font-bold text-sm">
                2
              </div>
              
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-8 transition-all duration-300">
                  <Target className="h-10 w-10 text-background" />
                </div>
                
                <h4 className="text-heading mb-6 text-foreground">Smart Alignment</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Answer thoughtful questions about your preferences and goals. 
                  We fine-tune recommendations using{' '}
                  <span className="text-mentra-green font-medium">25+ data points</span> just for you.
                </p>
                
                <div className="mt-6 flex justify-center space-x-2">
                  <div className="status-indicator status-active"></div>
                  <div className="status-indicator status-active"></div>
                  <div className="status-indicator status-pending"></div>
                </div>
              </div>
            </div>
            
            {/* Step 3 - Enhanced */}
            <div className="feature-card text-center group relative">
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-background font-bold text-sm">
                3
              </div>
              
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-8 transition-all duration-300">
                  <Zap className="h-10 w-10 text-background" />
                </div>
                
                <h4 className="text-heading mb-6 text-foreground">Get Your Roadmap</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Receive personalized career paths, skill assessments, weekly plans, 
                  and AI-powered interview practice with{' '}
                  <span className="text-mentra-purple font-medium">real-time feedback</span>.
                </p>
                
                <div className="mt-6 flex justify-center space-x-2">
                  <div className="status-indicator status-active"></div>
                  <div className="status-indicator status-active"></div>
                  <div className="status-indicator status-active"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Social Proof Section */}
      <section className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-surface/20 to-accent/10"></div>
        <div className="max-w-5xl mx-auto text-center relative">
          {/* Rating Stars */}
          <div className="flex justify-center items-center gap-2 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-8 w-8 fill-mentra-green text-mentra-green" />
            ))}
          </div>
          
          {/* Enhanced Testimonial */}
          <div className="glass-strong p-12 rounded-3xl max-w-4xl mx-auto">
            <blockquote className="text-2xl md:text-3xl text-foreground mb-8 italic font-medium leading-relaxed">
              "Mentra AI transformed my career trajectory completely. I went from{' '}
              <span className="gradient-text">marketing to product management</span> in just 6 months. 
              The personalized roadmap and interview practice were absolute game-changers."
            </blockquote>
            
            <div className="flex items-center justify-center gap-4">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-background font-bold text-xl">
                SC
              </div>
              <div className="text-left">
                <cite className="text-foreground font-semibold text-lg block">
                  Sarah Chen
                </cite>
                <span className="text-muted-foreground">
                  Product Manager at TechCorp
                </span>
              </div>
            </div>
          </div>
          
          {/* Success Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">15K+</div>
              <div className="text-muted-foreground">Career Transformations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">92%</div>
              <div className="text-muted-foreground">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">6 mo</div>
              <div className="text-muted-foreground">Avg. Time to Goal</div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Final CTA */}
      <section className="py-32 px-6 relative">
        <div className="absolute inset-0 bg-mesh opacity-40"></div>
        <div className="max-w-5xl mx-auto text-center relative">
          <div className="glass-strong p-16 rounded-3xl">
            <h3 className="text-display mb-8">
              Ready to Master Your <span className="gradient-text">Career Path</span>?
            </h3>
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Join thousands of professionals who've accelerated their careers with Mentra AI. 
              Your dream job is closer than you think.
            </p>
            
            <div className="space-y-6">
              <Button
                onClick={onGetStarted}
                size="lg"
                className="btn-primary px-16 py-8 text-2xl font-semibold rounded-3xl min-w-[400px] group"
              >
                <span className="mr-4">Start Your Career Transformation</span>
                <ArrowRight className="h-8 w-8" />
              </Button>
              
              <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                No credit card required • Free to get started • Cancel anytime
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};