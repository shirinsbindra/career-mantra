import { useState } from 'react';
import { Landing } from '@/components/Landing';
import { UploadPanel, ParsedProfile } from '@/components/UploadPanel';
import { AlignmentWizard, UserPreferences } from '@/components/AlignmentWizard';
import { CareerAnalyzer } from '@/components/CareerAnalyzer';
import { Dashboard } from '@/components/Dashboard';
import { Roadmap } from '@/components/Roadmap';
import { ScheduleStudyTime } from '@/components/ScheduleStudyTime';
import { InterviewSimulator } from '@/components/InterviewSimulator';

type AppState = 'landing' | 'upload' | 'alignment' | 'analysis' | 'dashboard' | 'roadmap' | 'schedule' | 'interview';

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
    setCurrentState('interview');
  };

  const handleExploreCareer = () => {
    setCurrentState('analysis');
  };

  const handleGenerateRoadmap = () => {
    setCurrentState('roadmap');
  };

  const handleScheduleStudyTime = () => {
    setCurrentState('schedule');
  };

  const handleBackToDashboard = () => {
    setCurrentState('dashboard');
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
            onScheduleStudyTime={handleScheduleStudyTime}
          />
        ) : null;
      
      case 'roadmap':
        return profile && preferences && selectedCareer ? (
          <Roadmap
            profile={profile}
            preferences={preferences}
            selectedCareer={selectedCareer}
            onBack={handleBackToDashboard}
          />
        ) : null;
      
      case 'schedule':
        return preferences ? (
          <ScheduleStudyTime
            preferences={preferences}
            onBack={handleBackToDashboard}
          />
        ) : null;
      
      case 'interview':
        return profile && preferences && selectedCareer ? (
          <InterviewSimulator
            profile={profile}
            preferences={preferences}
            selectedCareer={selectedCareer}
            onBack={handleBackToDashboard}
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
