import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { Alert, Button, Col, Container, Row, Spinner } from 'reactstrap';
import ErrorAndRetry from '../../components/ErrorAndRetry';
import PandaDetails from '../../components/PandaDetails';
import useDeletePanda from '../../hooks/useDeletePanda';
import usePandaDetails from '../../hooks/usePandaDetails';

const PandaDetailsView = () => {
  const { id } = useParams<{ id: string }>();
  const { isLoading, isSuccess, data, error, refetch } = usePandaDetails(id!);
  const { t } = useTranslation();

  const navigate = useNavigate();

  const deletePandaMutation = useDeletePanda();

  const handleClose = () => {
    navigate('/pandas');
  };

  const handleEdit = () => {
    navigate(`/pandas/${id}/edit`);
  };

  const handleDelete = async () => {
    await deletePandaMutation.mutateAsync(id!);
    navigate('/pandas');
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
