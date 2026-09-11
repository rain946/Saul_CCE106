import { createContext, type PropsWithChildren, useContext, useState } from 'react';

const PreferencesContext = createContext({ showStudyTip: true, setShowStudyTip: (_value: boolean) => {} });
export function PreferencesProvider({ children }: PropsWithChildren) {
  const [showStudyTip, setShowStudyTip] = useState(true);
  return <PreferencesContext.Provider value={{ showStudyTip, setShowStudyTip }}>{children}</PreferencesContext.Provider>;
}
export const usePreferences = () => useContext(PreferencesContext);
