import { Button, HStack, VStack } from '@chakra-ui/react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import TextInput from '@/components/TextInput';

export type PandaFormValues = {
  name: string;
  interests: string;
  image: string;
};

export type PandaFormProps = {
  initialValues?: PandaFormValues;
  onCancel: () => void;
  onSubmit: (values: PandaFormValues) => void;
};

const PandaForm = ({ onCancel, onSubmit, initialValues }: PandaFormProps) => {
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<PandaFormValues>({
    mode: 'onChange',
    defaultValues: initialValues,
  });
  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <VStack gap={5}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextInput
              label={t('pandaForm.name.label')}
              placeholder={t('pandaForm.name.placeholder') ?? undefined}
              error={errors.name?.message}
              {...field}
            />
          )}
          rules={{
            required: {
              value: true,
              message: t('pandaForm.name.errors.required'),
            },
          }}
        />
        <Controller
          name="interests"
          control={control}
          render={({ field }) => (
            <TextInput
              label={t('pandaForm.interests.label')}
              placeholder={t('pandaForm.interests.placeholder') ?? undefined}
              error={errors.interests?.message}
              {...field}
            />
          )}
          rules={{
            required: {
              value: true,
              message: t('pandaForm.interests.errors.required'),
            },
          }}
        />
        <Controller
          name="image"
          control={control}
          render={({ field }) => (
            <TextInput
              label={t('pandaForm.image.label')}
              placeholder={t('pandaForm.image.placeholder') ?? undefined}
              error={errors.image?.message}
              {...field}
            />
          )}
          rules={{
            required: {
              value: true,
              message: t('pandaForm.image.errors.required'),
            },
            pattern: {
              value: /^https?:\/\/.*/,
              message: t('pandaForm.image.errors.invalid'),
            },
          }}
        />
        <HStack>
          <Button
            colorScheme="blue"
            marginRight={10}
            disabled={!isValid}
            type="submit"
          >
            {t('common.submit')}
          </Button>
          <Button colorScheme="gray" onClick={onCancel}>
            {t('common.cancel')}
          </Button>
        </HStack>
      </VStack>
    </form>
  );
};

export default PandaForm;
