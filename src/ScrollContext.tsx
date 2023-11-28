import React, { createContext, useState, ReactNode } from 'react';

// Define the type for the context value
interface ScrollContextType {
  scrollToRef: ((ref: React.RefObject<any>) => void) | null;
  setScrollToRef: React.Dispatch<React.SetStateAction<((ref: React.RefObject<any>) => void) | null>>;
}

// Create the context with a default value
export const ScrollContext = createContext<ScrollContextType>({
  scrollToRef: null,
  setScrollToRef: () => {},
});

// Define the type for the provider props
interface ScrollProviderProps {
  children: ReactNode;
}

// Create the provider component
export const ScrollProvider: React.FC<ScrollProviderProps> = ({ children }) => {
  const [scrollToRef, setScrollToRef] = useState<((ref: React.RefObject<any>) => void) | null>(null);

  return (
    <ScrollContext.Provider value={{ scrollToRef, setScrollToRef }}>
      {children}
    </ScrollContext.Provider>
  );
};
