import { useState } from 'react';
import { Landing } from '@/components/Landing';
import { UploadPanel, ParsedProfile } from '@/components/UploadPanel';
import { AlignmentWizard, UserPreferences } from '@/components/AlignmentWizard';
import { CareerAnalyzer } from '@/components/CareerAnalyzer';
import { Dashboard } from '@/components/Dashboard';

type AppState = 'landing' | 'upload' | 'alignment' | 'analysis' | 'dashboard';

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>('landing');
  const [profile, setProfile] = useState<ParsedProfile | null>(null);
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [selectedCareer, setSelectedCareer] = useState<any>(null);

  const handleGetStarted = () => {
    setCurrentState('upload');
  };

  const handleUploadComplete = (data: ParsedProfile) => {
    setProfile(data);
    setCurrentState('alignment');
  };

  const handleAlignmentComplete = (prefs: UserPreferences) => {
    setPreferences(prefs);
    setCurrentState('analysis');
  };

  const handleCareerSelect = (career: any) => {
    setSelectedCareer(career);
    setCurrentState('dashboard');
  };

  const handleRetakeInterview = () => {
    // Handle interview flow
    console.log('Starting mock interview...');
  };

  const handleExploreCareer = () => {
    setCurrentState('analysis');
  };

  const handleGenerateRoadmap = () => {
    // Handle roadmap generation
    console.log('Generating roadmap...');
  };

  const renderCurrentView = () => {
    switch (currentState) {
      case 'landing':
        return <Landing onGetStarted={handleGetStarted} />;
      
      case 'upload':
        return <UploadPanel onUploadComplete={handleUploadComplete} />;
      
      case 'alignment':
        return <AlignmentWizard onComplete={handleAlignmentComplete} />;
      
      case 'analysis':
        return profile && preferences ? (
          <CareerAnalyzer 
            profile={profile} 
            preferences={preferences} 
            onCareerSelect={handleCareerSelect} 
          />
        ) : null;
      
      case 'dashboard':
        return profile && preferences && selectedCareer ? (
          <Dashboard
            profile={profile}
            preferences={preferences}
            selectedCareer={selectedCareer}
            onRetakeInterview={handleRetakeInterview}
            onExploreCareer={handleExploreCareer}
            onGenerateRoadmap={handleGenerateRoadmap}
          />
        ) : null;
      
      default:
        return <Landing onGetStarted={handleGetStarted} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        {renderCurrentView()}
      </main>
    </div>
  );
};

export default Index;
