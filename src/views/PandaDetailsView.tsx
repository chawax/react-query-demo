import { Button, Container, Spinner, Stack, VStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import Alert from '../components/Alert';
import ErrorAndRetry from '../components/ErrorAndRetry';
import PandaDetails from '../components/PandaDetails';
import useDeletePanda from '../hooks/useDeletePanda';
import usePandaDetails from '../hooks/usePandaDetails';

const PandaDetailsView = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Hook to load panda details

  const { id } = useParams<{ id: string }>();
  const {
    isLoading: isLoadingPanda,
    isSuccess: isSuccessOnLoadingPanda,
    isError: isErrorOnLoadingPanda,
    data: pandaDetails,
    error: loadingPandaError,
    refetch: refetchPanda,
  } = usePandaDetails(id!);

  // Hook to delete panda

  const {
    isLoading: isDeletingPanda,
    isError: isErrorOnDeletingPanda,
    mutateAsync: mutateDeletePanda,
  } = useDeletePanda();

  // Event handlers

  const handleClose = () => {
    navigate('/pandas');
  };

  const handleEdit = () => {
    navigate(`/pandas/${id}/edit`);
  };

  const handleDelete = async () => {
    await mutateDeletePanda(id!);
    navigate('/pandas');
  };

  return (
    <Container>
      {(isLoadingPanda || isDeletingPanda) && <Spinner />}
      {isErrorOnLoadingPanda && loadingPandaError && (
        <ErrorAndRetry
          message={loadingPandaError.message}
          onRetry={refetchPanda}
        />
      )}
      {isErrorOnDeletingPanda && (
        <Alert message={t('pandaDetails.error.delete')} />
      )}
      {isSuccessOnLoadingPanda && pandaDetails && (
        <VStack spacing={10}>
          <PandaDetails panda={pandaDetails} />
          <Stack
            direction={{ base: 'column', md: 'row' }}
            spacing={{ base: 5, md: 10 }}
          >
            <Button colorScheme="blue" onClick={handleClose}>
              {t('common.close')}
            </Button>
            <Button colorScheme="blue" onClick={handleEdit}>
              {t('pandaDetails.editPanda')}
            </Button>
            <Button colorScheme="blue" onClick={handleDelete}>
              {t('pandaDetails.deletePanda')}
            </Button>
          </Stack>
        </VStack>
      )}
    </Container>
  );
};

export default PandaDetailsView;
