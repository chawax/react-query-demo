import { History } from 'history';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { Alert, Spinner } from 'reactstrap';
import PandaForm, { PandaFormValues } from '../../components/PandaForm';
import useCreatePanda from '../../hooks/useCreatePanda';

const CreatePandaView = () => {
  const { t } = useTranslation();

  const history: History = useHistory();

  const createPandaMutation = useCreatePanda();

  const handleSubmit = useCallback(
    async (values: PandaFormValues) => {
      const panda = {
        name: values.name,
        interests: values.interests.split(','),
        image: values.image,
      };
      await createPandaMutation.mutateAsync(panda);
      history.replace('/pandas');
    },
    [createPandaMutation, history],
  );

  const handleCancel = useCallback(() => {
    history.replace('/pandas');
  }, [history]);

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
