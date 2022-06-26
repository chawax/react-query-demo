import React, { useMemo } from 'react';

import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { Alert, Spinner } from 'reactstrap';

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
    isLoading: isUpdatingPanda,
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

  const initialValues: PandaFormValues | undefined = useMemo(() => {
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
    <>
      {(isLoadingPandaDetails || isUpdatingPanda) && <Spinner />}
      {isErrorOnLoadingPanda && (
        <ErrorAndRetry message={pandaLoadingError.message} onRetry={refetch} />
      )}
      {isErrorOnUpdatePanda && (
        <Alert color="danger">{t('editPanda.errors.update')}</Alert>
      )}
      {isSuccessOnLoadingPanda && pandaDetails && (
        <div style={{ padding: 20 }}>
          <h2>{t('editPanda.title', { id })}</h2>
          <PandaForm
            initialValues={initialValues}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </div>
      )}
    </>
  );
};

export default EditPandaView;
