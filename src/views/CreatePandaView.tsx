import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Alert, Spinner } from 'reactstrap';

import PandaForm, { PandaFormValues } from '../components/PandaForm';
import useCreatePanda from '../hooks/useCreatePanda';

const CreatePandaView = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Hook to create panda

  const { isLoading, isError, mutateAsync } = useCreatePanda();

  // Event handlers

  const handleSubmit = async (values: PandaFormValues) => {
    const panda = {
      name: values.name,
      interests: values.interests.split(','),
      image: values.image,
    };
    await mutateAsync(panda);
    navigate('/pandas', { replace: true });
  };

  const handleCancel = () => {
    navigate('/pandas', { replace: true });
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>{t('createPanda.title')}</h2>
      {isLoading && <Spinner />}
      {isError && <Alert color="danger">{t('createPanda.error')}</Alert>}
      <PandaForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </div>
  );
};

export default CreatePandaView;
