// your-toast.jsx
import * as ToastPrimitive from '@radix-ui/react-toast';

interface propsType {
  title: string;
  content: string;
  children: any;
}
export const Toast = ({ title, content, children, ...props }: propsType) => {
  return (
    <ToastPrimitive.Provider>
      <ToastPrimitive.Root {...props}>
        {title && <ToastPrimitive.Title>{title}</ToastPrimitive.Title>}
        <ToastPrimitive.Description>{content}</ToastPrimitive.Description>
        {children && (
          <ToastPrimitive.Action asChild altText='Perform action'>
            {children}
          </ToastPrimitive.Action>
        )}
        <ToastPrimitive.Close aria-label='Close'>
          <span aria-hidden>×</span>
        </ToastPrimitive.Close>
      </ToastPrimitive.Root>
    </ToastPrimitive.Provider>
  );
};
