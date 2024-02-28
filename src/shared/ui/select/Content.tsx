import { FloatingFocusManager, FloatingList, useMergeRefs } from '@floating-ui/react';
import React, { forwardRef } from 'react';

import { useSelectContext } from './useSelect';

const Content = forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
  function Content({ children, ...props }, propRef) {
    const {
      context,
      open,
      floatingStyles,
      refs,
      getFloatingProps,
      elementsRef,
      labelsRef,
    } = useSelectContext();
    const ref = useMergeRefs([refs.setFloating, propRef]);

    if (!open) return null;

    return (
      <FloatingFocusManager context={context} modal={false}>
        <div
          ref={ref}
          style={{ ...floatingStyles, outline: '0' }}
          {...getFloatingProps(props)}>
          <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
            {children}
          </FloatingList>
        </div>
      </FloatingFocusManager>
    );
  }
);

export default Content;
