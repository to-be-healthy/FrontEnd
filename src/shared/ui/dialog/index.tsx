import React from 'react';

import Close from './Close';
import Content from './Content';
import Description from './Description';
import Heading from './Heading';
import Trigger from './Trigger';
import { DialogContext, DialogOptions, useDialog } from './useDialog';

export function Dialog({
  children,
  ...options
}: {
  children: React.ReactNode;
} & React.PropsWithChildren<DialogOptions>) {
  const dialogBox = useDialog(options);
  return <DialogContext.Provider value={dialogBox}>{children}</DialogContext.Provider>;
}

Dialog.Root = Dialog;
Dialog.Content = Content;
Dialog.Trigger = Trigger;
Dialog.Heading = Heading;
Dialog.Description = Description;
Dialog.Close = Close;
