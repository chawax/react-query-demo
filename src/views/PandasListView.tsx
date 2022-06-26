import { Spinner } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import ErrorAndRetry from '../components/ErrorAndRetry';
import PandasList from '../components/PandasList';
import usePandas from '../hooks/usePandas';

const PandasListView = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Hook to load pandas

  const { isLoading, isSuccess, data, error, refetch } = usePandas();

  // Event handlers

  const handlePress = (id: string) => {
    navigate(`/pandas/${id}`);
  };

  const handleNewPanda = () => {
    navigate('/pandas/new');
  };

  return (
    <>
      {isLoading && <Spinner />}
      {error && <ErrorAndRetry message={error.message} onRetry={refetch} />}
      {isSuccess && data && (
        <>
          <PandasList pandas={data} onPress={handlePress} />
          <div style={{ padding: 20 }}>
            <Button
              colorScheme="blue"
              marginRight={10}
              marginTop={10}
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
