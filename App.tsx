/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import LandingPage from './components/LandingPage';
import SignUpPage from './components/SignUpPage';
import SplashScreen from './components/SplashScreen';
import Header from './components/Header';
import Legend from './components/Legend';
import MapOverlay from './components/MapOverlay';
import RecommendationCard from './components/RecommendationCard';
import Footer from './components/Footer';
import ServicesPage from './components/ServicesPage';
import LifestylePage from './components/LifestylePage';
import SavedCitiesPage from './components/SavedCitiesPage';
import CityDetailPage from './components/CityDetailPage';
import { motion } from 'motion/react';

export default function App() {
  const [selectedArea, setSelectedArea] = React.useState<string | null>('Vikaspuri');
  const [userPreferences, setUserPreferences] = React.useState<{
    category: string | null;
    subCategory: string | null;
    details: string;
  }>({
    category: 'Settlers',
    subCategory: 'Student',
    details: 'DTU Delhi engineering collage janakpuri west branch near district centre'
  });
  const [view, setView] = React.useState<'splash' | 'signup' | 'landing' | 'main' | 'services' | 'lifestyle' | 'saved-cities' | 'city-detail'>('splash');
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [initialCategory, setInitialCategory] = React.useState<any>(undefined);
  
  // Hoisted bookmark states
  const [servicesBookmarks, setServicesBookmarks] = React.useState<string[]>([]);
  const [lifestyleBookmarks, setLifestyleBookmarks] = React.useState<string[]>([]);
  
  if (view === 'splash') {
    return <SplashScreen onComplete={() => setView('signup')} />;
  }

  if (view === 'signup') {
    return <SignUpPage onSignUp={() => setView('landing')} />;
  }

  if (view === 'landing') {
    return (
      <LandingPage 
        onStart={(data) => {
          setUserPreferences(data);
          setView('main');
        }} 
      />
    );
  }

  if (view === 'services') {
    return (
      <ServicesPage 
        onBack={() => {
          if (isEditMode) {
            setIsEditMode(false);
            setView('city-detail');
          } else {
            setView('main');
          }
        }} 
        onNext={() => setView('lifestyle')} 
        bookmarked={servicesBookmarks}
        onToggleBookmark={(id) => setServicesBookmarks(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])}
        lifestyleBookmarked={lifestyleBookmarks}
        hideNext={isEditMode}
        initialCategory={initialCategory}
      />
    );
  }

  if (view === 'lifestyle') {
    return (
      <LifestylePage 
        onBack={() => {
          if (isEditMode) {
            setIsEditMode(false);
            setView('city-detail');
          } else {
            setView('services');
          }
        }} 
        onNext={() => setView('saved-cities')}
        bookmarked={lifestyleBookmarks}
        onToggleBookmark={(id) => setLifestyleBookmarks(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])}
        servicesBookmarked={servicesBookmarks}
        hideNext={isEditMode}
        initialCategory={initialCategory}
      />
    );
  }

  if (view === 'saved-cities') {
    return (
      <SavedCitiesPage 
        onBack={() => setView('lifestyle')}
        onPlanNew={() => {
          setSelectedArea('Vikaspuri');
          setServicesBookmarks([]);
          setLifestyleBookmarks([]);
          setView('landing');
        }}
        onSelectCity={() => setView('city-detail')}
        selectedArea={selectedArea || 'Vikaspuri'}
        userPreferences={userPreferences}
      />
    );
  }

  if (view === 'city-detail') {
    return (
      <CityDetailPage 
        onBack={() => setView('saved-cities')}
        servicesBookmarked={servicesBookmarks}
        lifestyleBookmarked={lifestyleBookmarks}
        onAddMore={(type, category) => {
          setIsEditMode(true);
          setInitialCategory(category);
          setView(type as any);
        }}
        selectedArea={selectedArea || 'Vikaspuri'}
        userPreferences={userPreferences}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header onBack={() => setView('landing')} />
      
      <main className="max-w-7xl mx-auto w-full px-6 flex-grow">
        <Legend />
        
        <div className="mb-8">
          <MapOverlay selectedArea={selectedArea} onSelectArea={setSelectedArea} />
        </div>

        {/* Warning Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 mb-8"
        >
          <span className="text-amber-600 font-black text-2xl leading-none">!</span>
          <p className="text-amber-900 font-bold text-sm tracking-tight">Selection Required: Please select at least one area to proceed</p>
        </motion.div>

        {/* Recommendations Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <RecommendationCard 
            title="Vikaspuri"
            price="₹ 8k–15k"
            description="Closest to your workplace with great amenities and safe residential colonies."
            badge="Best fit"
            type="best"
            icons={['bike', 'walk']}
          />
          <RecommendationCard 
            title="Shiv vihar"
            price="₹ 5k–10k"
            description="Most affordable options nearby, though commute might take slightly longer."
            badge="Budget fit"
            type="budget"
            icons={['bus', 'bike']}
          />
          <RecommendationCard 
            title="Rajouri garden"
            price="₹ 10k–18k"
            description="Excellent connectivity via Blue & Pink lines. Vibrant market and food scene."
            badge="Metro compatible"
            type="metro"
            icons={['metro', 'bus']}
          />
        </div>
      </main>

      <Footer selectedArea={selectedArea} onNext={() => setView('services')} />
    </div>
  );
}
