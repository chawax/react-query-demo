import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { Alert, Spinner } from 'reactstrap';
import ErrorAndRetry from '../components/ErrorAndRetry';
import PandaForm, { PandaFormValues } from '../components/PandaForm';
import usePandaDetails from '../hooks/usePandaDetails';
import useUpdatePanda from '../hooks/useUpdatePanda';
import { Panda } from '../types/Panda';

const EditPandaView = () => {
  const { id } = useParams<{ id: string }>();
  const { isLoading, isSuccess, data, error, refetch } = usePandaDetails(id!);

  const { t } = useTranslation();

  const navigate = useNavigate();
  const handleCancel = useCallback(() => {
    navigate(`/pandas/${id}`, { replace: true });
  }, [navigate, id]);

  const updatePandaMutation = useUpdatePanda();

  const handleSubmit = useCallback(
    (values: PandaFormValues) => {
      const panda: Panda = {
        key: id,
        name: values.name,
        interests: values.interests.split(','),
        image: values.image,
      };
      updatePandaMutation.mutate(panda);
      navigate(`/pandas`, { replace: true });
    },
    [updatePandaMutation, navigate, id],
  );

  const initialValues: PandaFormValues | undefined = useMemo(() => {
    if (data) {
      return {
        name: data.name,
        interests: data.interests.join(','),
        image: data.image,
      };
    } else {
      return undefined;
    }
  }, [data]);

  return (
    <>
      {isLoading && <Spinner />}
      {updatePandaMutation.isLoading && <Spinner />}
      {error && <ErrorAndRetry message={error.message} onRetry={refetch} />}
      {updatePandaMutation.isError && (
        <Alert color="danger">{t('editPanda.errors.update')}</Alert>
      )}
      {isSuccess && data && (
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
