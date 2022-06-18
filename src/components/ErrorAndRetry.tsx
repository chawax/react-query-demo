import React from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Button } from 'reactstrap';

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
        <Button
          color="danger"
          onClick={props.onRetry}
          className="float-right"
          size="sm"
        >
          {t('common.retry')}
        </Button>
      )}
    </Alert>
  );
};

export default ErrorAndRetry;
