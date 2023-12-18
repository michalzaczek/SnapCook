import { ReactNode, createContext, useContext, useMemo, useState } from 'react';
import { ILoadingScreenContext } from './loading-screen-context.interface';

const LoadingScreenContext = createContext<ILoadingScreenContext | undefined>(
  undefined
);

function LoadingScreenProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);

  const value: ILoadingScreenContext = useMemo(() => {
    return {
      isLoading,
      setIsLoading,
    };
  }, [isLoading]);

  return (
    <LoadingScreenContext.Provider value={value}>
      {children}
    </LoadingScreenContext.Provider>
  );
}

function useLoadingScreen() {
  const context = useContext(LoadingScreenContext);

  if (context === undefined)
    throw new Error(
      'LoadingScreenContext was used outside of the RecipesProvider'
    );
  return context;
}

export { LoadingScreenProvider, useLoadingScreen };
