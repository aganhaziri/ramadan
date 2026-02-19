'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { cityAdjustments, type CityAdjustment } from '../data/ramadanSchedule';

interface CityContextType {
  selectedCity: CityAdjustment;
  setSelectedCity: (city: CityAdjustment) => void;
  cities: CityAdjustment[];
}

const CityContext = createContext<CityContextType | undefined>(undefined);

export function CityProvider({ children }: { children: ReactNode }) {
  const [selectedCity, setSelectedCity] = useState<CityAdjustment>(
    cityAdjustments.find((c) => c.id === 'base') ?? cityAdjustments[0]
  );

  return (
    <CityContext.Provider
      value={{
        selectedCity,
        setSelectedCity,
        cities: cityAdjustments,
      }}
    >
      {children}
    </CityContext.Provider>
  );
}

export function useCity() {
  const context = useContext(CityContext);
  if (context === undefined) {
    throw new Error('useCity must be used within a CityProvider');
  }
  return context;
}
