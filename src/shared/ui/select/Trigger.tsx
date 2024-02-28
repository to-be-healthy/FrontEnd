import { useMergeRefs } from '@floating-ui/react';
import { forwardRef } from 'react';

import { useSelectContext } from './useSelect';

const TRIGGER_NAME = 'SelectTrigger';

interface ButtonOwnState {
  open: boolean;
  selectedIndex: number | null;
}

type TriggerProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  children:
    | (({ open, selectedIndex }: ButtonOwnState) => React.ReactNode)
    | React.ReactNode;
};

const Trigger = forwardRef<HTMLElement, TriggerProps>((props, forwaredRef) => {
  const { children, ...rest } = props;
  const { refs, getReferenceProps, open, selectedIndex, setOpen } = useSelectContext();
  const ref = useMergeRefs([refs.setReference, forwaredRef]);
  const childrenComp =
    typeof children === 'function' ? children({ open, selectedIndex }) : children;

  return (
    <button
      ref={ref}
      type='button'
      data-state={open ? 'open' : 'closed'}
      {...getReferenceProps(rest)}
      onClick={(e) => {
        e.preventDefault();
        setOpen(!open);
      }}>
      {childrenComp}
    </button>
  );
});

Trigger.displayName = TRIGGER_NAME;

export default Trigger;
