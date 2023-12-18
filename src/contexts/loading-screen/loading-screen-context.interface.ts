import { Dispatch } from 'react';

export interface ILoadingScreenContext {
  isLoading: boolean;
  setIsLoading: Dispatch<boolean>;
}
