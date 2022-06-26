import { Button } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { Alert } from 'reactstrap';

type ErrorAndRetryProps = {
  message: string;
  onRetry?: () => void;
};

const ErrorAndRetry = (props: ErrorAndRetryProps) => {
  const { t } = useTranslation();
  return (
    <Alert color="danger">
      {props.message}
      {props.onRetry && (
        <Button colorScheme="red" onClick={props.onRetry} size="sm">
          {t('common.retry')}
        </Button>
      )}
    </Alert>
  );
};

export default ErrorAndRetry;
