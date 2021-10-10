import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { Button, Spinner } from 'reactstrap';
import ErrorAndRetry from '../../components/ErrorAndRetry';
import PandasList from '../../components/PandasList';
import usePandas from '../../hooks/usePandas';

const PandasListView = () => {
  const history = useHistory();
  const { t } = useTranslation();

  const handlePress = useCallback(
    (id: string) => {
      history.push(`/pandas/${id}`);
    },
    [history],
  );

  const handleNewPanda = () => {
    history.push('/pandas/new');
  };

  const { isLoading, isSuccess, data, error, refetch } = usePandas();
  return (
    <>
      {isLoading && <Spinner />}
      {error && <ErrorAndRetry message={error.message} onRetry={refetch} />}
      {isSuccess && data && (
        <>
          <PandasList pandas={data} onPress={handlePress} />
          <div style={{ padding: 20 }}>
            <Button
              color="primary"
              style={{ marginTop: 10, marginRight: 10 }}
              onClick={handleNewPanda}
            >
              {t('pandaList.addNewPanda')}
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default PandasListView;
