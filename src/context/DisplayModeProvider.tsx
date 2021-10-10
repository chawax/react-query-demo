import React, { useState } from 'react';
import { DisplayMode } from '../types/DisplayMode';
import DisplayModeContext from './DisplayModeContext';

export type DisplayModeProviderProps = {
  children: React.ReactNode;
};

export const DisplayModeProvider = (props: DisplayModeProviderProps) => {
  const [displayMode, setDisplayMode] = useState<DisplayMode>('dark');
  const toggleDisplayMode = () => {
    setDisplayMode(displayMode === 'dark' ? 'light' : 'dark');
  };
  return (
    <DisplayModeContext.Provider value={{ displayMode, toggleDisplayMode }}>
      {props.children}
    </DisplayModeContext.Provider>
  );
};
