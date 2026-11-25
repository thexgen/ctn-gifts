import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { features } from '../config/features.js';

const FeaturesContext = createContext(null);

/** Feature flags + the shared age-gate state for alcohol products. */
export function FeaturesProvider({ children }) {
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [ageGateOpen, setAgeGateOpen] = useState(false);

  const requestAgeGate = useCallback(() => setAgeGateOpen(true), []);
  const closeAgeGate = useCallback(() => setAgeGateOpen(false), []);
  const confirmAge = useCallback(() => {
    setAgeConfirmed(true);
    setAgeGateOpen(false);
  }, []);

  const value = useMemo(() => ({
    features,
    ageConfirmed,
    ageGateOpen,
    requestAgeGate,
    closeAgeGate,
    confirmAge,
    alcoholEnabled: Boolean(features.ALCOHOL_ENABLED),
  }), [ageConfirmed, ageGateOpen, requestAgeGate, closeAgeGate, confirmAge]);

  return <FeaturesContext.Provider value={value}>{children}</FeaturesContext.Provider>;
}

export function useFeatures() {
  const context = useContext(FeaturesContext);
  if (!context) throw new Error('useFeatures must be used inside a FeaturesProvider');
  return context;
}

export default FeaturesContext;
