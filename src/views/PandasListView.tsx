import { Container, Flex, HStack, Spinner, VStack } from '@chakra-ui/react';
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
    <Flex width="full">
      {isLoading && <Spinner />}
      {error && <ErrorAndRetry message={error.message} onRetry={refetch} />}
      {isSuccess && data && (
        <VStack width="100%">
          <PandasList pandas={data} onPress={handlePress} />
          <HStack>
            <Button colorScheme="blue" marginTop={2} onClick={handleNewPanda}>
              {t('pandaList.addNewPanda')}
            </Button>
          </HStack>
        </VStack>
      )}
    </Flex>
  );
};

export default PandasListView;
