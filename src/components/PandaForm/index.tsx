import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Button } from 'reactstrap';
import TextInput from '../TextInput';

export type PandaFormValues = {
  name: string;
  interests: string;
  image: string;
};

export type PandaFormProps = {
  initialValues?: PandaFormValues;
  onCancel(): void;
  onSubmit(values: any): void;
};

const PandaForm = (props: PandaFormProps) => {
  const { onCancel, onSubmit, initialValues } = props;
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    errors,
    formState: { isValid },
  } = useForm<PandaFormValues>({
    mode: 'onChange',
    defaultValues: initialValues,
  });
  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        innerRef={register({
          required: {
            value: true,
            message: t('pandaForm.name.errors.required'),
          },
        })}
        name="name"
        label={t('pandaForm.name.label')}
        placeholder={t('pandaForm.name.placeholder')}
        error={errors.name?.message}
      />
      <TextInput
        innerRef={register({
          required: {
            value: true,
            message: t('pandaForm.interests.errors.required'),
          },
        })}
        name="interests"
        label={t('pandaForm.interests.label')}
        placeholder={t('pandaForm.interests.placeholder')}
        error={errors.interests?.message}
      />
      <TextInput
        innerRef={register({
          required: {
            value: true,
            message: t('pandaForm.image.errors.required'),
          },
          pattern: {
            value: /^https?:\/\/.*/,
            message: t('pandaForm.image.errors.invalid'),
          },
        })}
        name="image"
        label={t('pandaForm.image.label')}
        placeholder={t('pandaForm.image.placeholder')}
        error={errors.image?.message}
      />
      <Button color="primary" style={{ marginRight: 10 }} disabled={!isValid}>
        {t('common.submit')}
      </Button>
      <Button onClick={onCancel}>{t('common.cancel')}</Button>
    </form>
  );
};

export default PandaForm;
