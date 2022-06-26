import { Button, VStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import Alert from './Alert';

type ErrorAndRetryProps = {
  message: string;
  onRetry?: () => void;
};

const ErrorAndRetry = ({ message, onRetry }: ErrorAndRetryProps) => {
  const { t } = useTranslation();
  return (
    <VStack padding={10}>
      <Alert message={message} />
      {onRetry && (
        <Button colorScheme="red" onClick={onRetry} size="sm">
          {t('common.retry')}
        </Button>
      )}
    </VStack>
  );
};

export default ErrorAndRetry;
