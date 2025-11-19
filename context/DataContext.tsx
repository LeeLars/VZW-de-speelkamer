import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Activity, TeamMember, NewsItem, Location, Pricing } from '../types';
import { INITIAL_ACTIVITIES, INITIAL_LOCATIONS, INITIAL_NEWS, INITIAL_TEAM, INITIAL_PRICING } from '../constants';

interface DataContextType {
  activities: Activity[];
  team: TeamMember[];
  news: NewsItem[];
  locations: Location[];
  pricing: Pricing;
  addActivity: (activity: Activity) => void;
  updateActivity: (activity: Activity) => void;
  deleteActivity: (id: string) => void;
  addTeamMember: (member: TeamMember) => void;
  updateTeamMember: (member: TeamMember) => void;
  deleteTeamMember: (id: string) => void;
  addNews: (item: NewsItem) => void;
  deleteNews: (id: string) => void;
  updatePricing: (pricing: Pricing) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize state from localStorage or fall back to constants
  const [activities, setActivities] = useState<Activity[]>(() => {
    const saved = localStorage.getItem('sk_activities');
    if (saved) {
      const savedActivities = JSON.parse(saved);
      // Merge: Add new activities from INITIAL_ACTIVITIES that don't exist in saved data
      const savedIds = new Set(savedActivities.map((a: Activity) => a.id));
      const newActivities = INITIAL_ACTIVITIES.filter(a => !savedIds.has(a.id));
      return [...savedActivities, ...newActivities];
    }
    return INITIAL_ACTIVITIES;
  });

  const [team, setTeam] = useState<TeamMember[]>(() => {
    const saved = localStorage.getItem('sk_team');
    return saved ? JSON.parse(saved) : INITIAL_TEAM;
  });

  const [news, setNews] = useState<NewsItem[]>(() => {
    const saved = localStorage.getItem('sk_news');
    return saved ? JSON.parse(saved) : INITIAL_NEWS;
  });

  const [pricing, setPricing] = useState<Pricing>(() => {
    const saved = localStorage.getItem('sk_pricing');
    return saved ? JSON.parse(saved) : INITIAL_PRICING;
  });

  const [locations] = useState<Location[]>(INITIAL_LOCATIONS);

  // Persistence effects
  useEffect(() => {
    localStorage.setItem('sk_activities', JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    localStorage.setItem('sk_team', JSON.stringify(team));
  }, [team]);

  useEffect(() => {
    localStorage.setItem('sk_news', JSON.stringify(news));
  }, [news]);

  useEffect(() => {
    localStorage.setItem('sk_pricing', JSON.stringify(pricing));
  }, [pricing]);

  // Actions
  const addActivity = (activity: Activity) => setActivities(prev => [...prev, activity]);
  const updateActivity = (updated: Activity) => setActivities(prev => prev.map(a => a.id === updated.id ? updated : a));
  const deleteActivity = (id: string) => setActivities(prev => prev.filter(a => a.id !== id));

  const addTeamMember = (member: TeamMember) => setTeam(prev => [...prev, member]);
  const updateTeamMember = (updated: TeamMember) => setTeam(prev => prev.map(m => m.id === updated.id ? updated : m));
  const deleteTeamMember = (id: string) => setTeam(prev => prev.filter(m => m.id !== id));

  const addNews = (item: NewsItem) => setNews(prev => [item, ...prev]);
  const deleteNews = (id: string) => setNews(prev => prev.filter(n => n.id !== id));

  const updatePricing = (newPricing: Pricing) => setPricing(newPricing);

  return (
    <DataContext.Provider value={{
      activities,
      team,
      news,
      locations,
      pricing,
      addActivity,
      updateActivity,
      deleteActivity,
      addTeamMember,
      updateTeamMember,
      deleteTeamMember,
      addNews,
      deleteNews,
      updatePricing
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};