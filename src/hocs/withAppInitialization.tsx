import React, { useEffect } from 'react';
import { useAppStore } from '@stores/appStore';
import SplashScreen from '@screens/SplashScreen';

/**
 * Higher-Order Component for app initialization
 * 
 * Wraps the app with initialization logic and shows splash screen during loading
 * 
 * @param children - Child components to render after initialization
 * 
 * @example
 * ```tsx
 * <WithAppInitialization>
 *   <AppNavigator />
 * </WithAppInitialization>
 * ```
 */

interface WithAppInitializationProps {
  children: React.ReactNode;
}

function WithAppInitialization({ children }: WithAppInitializationProps) {
  const { isLoading, initializeApp } = useAppStore();

  useEffect(() => {
    initializeApp();
  }, [initializeApp]);

  if (isLoading) {
    return <SplashScreen />;
  }

  return <>{children}</>;
}

export default WithAppInitialization;
