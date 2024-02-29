// import { useId } from '@floating-ui/react';
import { forwardRef, useId, useLayoutEffect } from 'react';

import { useDialogContext } from './useDialog';

const Heading = forwardRef<HTMLHeadingElement, React.HTMLProps<HTMLHeadingElement>>(
  function DialogHeading({ children, ...props }, ref) {
    const { setLabelId } = useDialogContext();
    const id = useId();

    // Only sets `aria-labelledby` on the Dialog root element
    // if this component is mounted inside it.
    useLayoutEffect(() => {
      setLabelId(id);
      return () => setLabelId(undefined);
    }, [id, setLabelId]);

    return (
      <h2 {...props} ref={ref} id={id}>
        {children}
      </h2>
    );
  }
);

export default Heading;
