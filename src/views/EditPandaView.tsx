import * as React from 'react';

import { Container, Heading, Spinner } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import Alert from '../components/Alert';
import ErrorAndRetry from '../components/ErrorAndRetry';
import PandaForm, { PandaFormValues } from '../components/PandaForm';
import usePandaDetails from '../hooks/usePandaDetails';
import useUpdatePanda from '../hooks/useUpdatePanda';
import { Panda } from '../types/Panda';

const EditPandaView = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Hook to load panda details

  const { id } = useParams<{ id: string }>();
  const {
    isLoading: isLoadingPandaDetails,
    isSuccess: isSuccessOnLoadingPanda,
    isError: isErrorOnLoadingPanda,
    data: pandaDetails,
    error: pandaLoadingError,
    refetch,
  } = usePandaDetails(id!);

  // Hook to update panda
  const {
    isPending: isUpdatingPanda,
    isError: isErrorOnUpdatePanda,
    mutateAsync,
  } = useUpdatePanda();

  // Event handlers

  const handleCancel = () => {
    navigate(`/pandas/${id}`, { replace: true });
  };

  const handleSubmit = async (values: PandaFormValues) => {
    const panda: Panda = {
      key: id,
      name: values.name,
      interests: values.interests.split(','),
      image: values.image,
    };
    await mutateAsync(panda);
    navigate(`/pandas`, { replace: true });
  };

  const initialValues: PandaFormValues | undefined = React.useMemo(() => {
    if (pandaDetails) {
      return {
        name: pandaDetails.name,
        interests: pandaDetails.interests.join(','),
        image: pandaDetails.image,
      };
    } else {
      return undefined;
    }
  }, [pandaDetails]);

  return (
    <Container>
      <Heading as="h2">{t('editPanda.title', { id })}</Heading>
      {(isLoadingPandaDetails || isUpdatingPanda) && <Spinner />}
      {isErrorOnLoadingPanda && (
        <ErrorAndRetry message={pandaLoadingError.message} onRetry={refetch} />
      )}
      {isErrorOnUpdatePanda && <Alert message={t('editPanda.errors.update')} />}
      {isSuccessOnLoadingPanda && pandaDetails && (
        <PandaForm
          initialValues={initialValues}
          onCancel={handleCancel}
          onSubmit={handleSubmit}
        />
      )}
    </Container>
  );
};

export default EditPandaView;
