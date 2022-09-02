import { Box, Container, Heading, Spinner } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import PandaForm, { PandaFormValues } from '../components/PandaForm';
import useCreatePanda from '../hooks/useCreatePanda';

const CreatePandaView = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Hook to create panda

  const { isLoading, isError, createPanda } = useCreatePanda();

  // Event handlers

  const handleSubmit = async (values: PandaFormValues) => {
    const panda = {
      name: values.name,
      interests: values.interests.split(','),
      image: values.image,
    };
    await createPanda(panda);
    navigate('/pandas', { replace: true });
  };

  const handleCancel = () => {
    navigate('/pandas', { replace: true });
  };

  return (
    <Container>
      <Heading as="h2">{t('createPanda.title')}</Heading>
      {isLoading && <Spinner />}
      {isError && (
        <Box bg="tomato" color="white">
          {t('createPanda.error')}
        </Box>
      )}
      <PandaForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </Container>
  );
};

export default CreatePandaView;
