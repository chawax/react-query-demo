import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Alert, Spinner } from 'reactstrap';
import PandaForm, { PandaFormValues } from '../../components/PandaForm';
import useCreatePanda from '../../hooks/useCreatePanda';

const CreatePandaView = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const createPandaMutation = useCreatePanda();

  const handleSubmit = useCallback(
    async (values: PandaFormValues) => {
      const panda = {
        name: values.name,
        interests: values.interests.split(','),
        image: values.image,
      };
      await createPandaMutation.mutateAsync(panda);
      navigate('/pandas', { replace: true });
    },
    [createPandaMutation, navigate],
  );

  const handleCancel = useCallback(() => {
    navigate('/pandas', { replace: true });
  }, [navigate]);

  return (
    <div style={{ padding: 20 }}>
      <h2>{t('createPanda.title')}</h2>
      {createPandaMutation.isLoading && <Spinner />}
      {createPandaMutation.isError && (
        <Alert color="danger">{t('createPanda.error')}</Alert>
      )}
      <PandaForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </div>
  );
};

export default CreatePandaView;
