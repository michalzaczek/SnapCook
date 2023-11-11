import { ReactNode, createContext, useContext, useMemo, useState } from 'react';
import { IUIMessageContext } from './ui-message-context.interface';
import { AlertColor } from '@mui/material';

const UIMessageContext = createContext<IUIMessageContext | undefined>(
  undefined
);

function UIMessageProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string>();
  const [open, setOpen] = useState<boolean>(false);
  const [severity, setSeverity] = useState<AlertColor>();

  const value: IUIMessageContext = useMemo(() => {
    return {
      setSeverity,
      setMessage,
      setOpen,
      severity,
      message,
      open,
    };
  }, [open]);

  return (
    <UIMessageContext.Provider value={value}>
      {children}
    </UIMessageContext.Provider>
  );
}

function useUIMessage() {
  const context = useContext(UIMessageContext);

  if (context === undefined)
    throw new Error('UIMessageContext was used outside of the RecipesProvider');
  return context;
}

export { UIMessageProvider, useUIMessage };
