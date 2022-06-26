import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { Alert, Button, Col, Container, Row, Spinner } from 'reactstrap';

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
    <>
      {(isLoadingPanda || isDeletingPanda) && <Spinner />}
      {isErrorOnLoadingPanda && loadingPandaError && (
        <ErrorAndRetry
          message={loadingPandaError.message}
          onRetry={refetchPanda}
        />
      )}
      {isErrorOnDeletingPanda && (
        <Alert color="danger">{t('pandaDetails.error.delete')}</Alert>
      )}
      {isSuccessOnLoadingPanda && pandaDetails && (
        <>
          <PandaDetails panda={pandaDetails} />
          <Container>
            <Row>
              <Col style={{ padding: 10 }}>
                <Button color="primary" onClick={handleClose}>
                  {t('common.close')}
                </Button>
              </Col>
            </Row>
            <Row>
              <Col style={{ padding: 10 }}>
                <Button color="primary" onClick={handleEdit}>
                  {t('pandaDetails.editPanda')}
                </Button>
              </Col>
            </Row>

            <Row>
              <Col style={{ padding: 10 }}>
                <Button color="primary" onClick={handleDelete}>
                  {t('pandaDetails.deletePanda')}
                </Button>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  );
};

export default PandaDetailsView;
