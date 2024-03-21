import { forwardRef } from 'react';

import { Slot } from '@/shared/utils/slot';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
  asChild?: boolean;
}
const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { asChild = false, ...rest } = props;
  return asChild ? <Slot ref={ref} {...rest} /> : <button ref={ref} {...rest} />;
});

Button.displayName = 'Button';

export default Button;
