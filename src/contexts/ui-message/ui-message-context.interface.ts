import { AlertColor } from '@mui/material';
import { Dispatch } from 'react';

export interface IUIMessageContext {
  open: boolean;
  message: string | undefined;
  severity?: AlertColor;
  setSeverity: Dispatch<AlertColor>;
  setOpen: Dispatch<boolean>;
  setMessage: Dispatch<string>;
}
