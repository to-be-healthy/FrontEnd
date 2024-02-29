import { forwardRef } from 'react';

import { useDialogContext } from './useDialog';

const Close = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(function DialogClose(props, ref) {
  const { setOpen } = useDialogContext();
  return <button type='button' {...props} ref={ref} onClick={() => setOpen(false)} />;
});

export default Close;
