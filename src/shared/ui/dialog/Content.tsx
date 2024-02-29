import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useMergeRefs,
} from '@floating-ui/react';
import { forwardRef } from 'react';

import { useDialogContext } from './useDialog';

const Content = forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
  function DialogContent(props, propRef) {
    const { context: floatingContext, ...context } = useDialogContext();
    const ref = useMergeRefs([context.refs.setFloating, propRef]);

    if (!floatingContext.open) return null;

    return (
      <FloatingPortal>
        <FloatingOverlay className='dialog-overlay' lockScroll>
          <FloatingFocusManager context={floatingContext}>
            <div
              ref={ref}
              aria-labelledby={context.labelId}
              aria-describedby={context.descriptionId}
              {...context.getFloatingProps(props)}>
              {props.children}
            </div>
          </FloatingFocusManager>
        </FloatingOverlay>
      </FloatingPortal>
    );
  }
);

export default Content;
