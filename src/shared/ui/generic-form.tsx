'use client';

import { KeyboardEventHandler } from 'react';
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
  UseFormProps,
} from 'react-hook-form';

interface GenericFormInterface<TFormData extends FieldValues> {
  children: React.ReactNode;
  id: string;
  onSubmit: SubmitHandler<TFormData>;
  onKeyDown?: KeyboardEventHandler<HTMLFormElement>;
  formOptions?: UseFormProps<TFormData>;
}

export const GenericForm = <TFormData extends FieldValues>({
  children,
  id,
  onSubmit,
  onKeyDown,
  formOptions,
}: GenericFormInterface<TFormData>) => {
  const methods = useForm(formOptions);

  return (
    <FormProvider {...methods}>
      <form
        id={id}
        className='h-full'
        onKeyDown={onKeyDown}
        onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
};
