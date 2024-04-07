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
  formOptions?: UseFormProps<TFormData>;
}

export const GenericForm = <TFormData extends FieldValues>({
  children,
  id,
  onSubmit,
  formOptions,
}: GenericFormInterface<TFormData>) => {
  const methods = useForm(formOptions);

  return (
    <FormProvider {...methods}>
      <form id={id} className='h-full' onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
};
