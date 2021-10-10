import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import { Alert, Button, Spinner } from 'reactstrap';
import ErrorAndRetry from '../../components/ErrorAndRetry';
import PandaDetails from '../../components/PandaDetails';
import useDeletePanda from '../../hooks/useDeletePanda';
import usePandaDetails from '../../hooks/usePandaDetails';

const PandaDetailsView = () => {
  const { id } = useParams<{ id: string }>();
  const { isLoading, isSuccess, data, error, refetch } = usePandaDetails(id);
  const { t } = useTranslation();

  const history = useHistory();

  const deletePandaMutation = useDeletePanda();

  const handleClose = () => {
    history.push('/pandas');
  };

  const handleEdit = () => {
    history.push(`/pandas/${id}/edit`);
  };

  const handleDelete = async () => {
    await deletePandaMutation.mutateAsync(id);
    history.push('/pandas');
  };

  return (
    <>
      {isLoading && <Spinner />}
      {deletePandaMutation.isLoading && <Spinner />}
      {error && <ErrorAndRetry message={error.message} onRetry={refetch} />}
      {deletePandaMutation.isError && (
        <Alert color="danger">{t('pandaDetails.error.delete')}</Alert>
      )}
      {isSuccess && data && (
        <>
          <PandaDetails panda={data} />
          <div style={{ padding: 20 }}>
            <Button color="primary" onClick={handleClose}>
              {t('common.close')}
            </Button>
            <Button
              color="primary"
              onClick={handleEdit}
              style={{ marginLeft: 10 }}
            >
              {t('pandaDetails.editPanda')}
            </Button>
            <Button
              color="primary"
              onClick={handleDelete}
              style={{ marginLeft: 10 }}
            >
              {t('pandaDetails.deletePanda')}
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default PandaDetailsView;
