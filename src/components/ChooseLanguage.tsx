import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

const styles = {
  languageEnabled: {
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  languageDisabled: {
    cursor: 'pointer',
    fontWeight: 'normal',
  },
};

export type ChooseLanguageProps = {
  code: string;
  label: string;
};

const ChooseLanguage = (props: ChooseLanguageProps) => {
  const { i18n } = useTranslation();

  const handleChangeLanguage = useCallback(
    (language: string) => {
      i18n.changeLanguage(language);
    },
    [i18n],
  );

  const style: React.CSSProperties =
    i18n.language === props.code
      ? (styles.languageEnabled as React.CSSProperties)
      : (styles.languageDisabled as React.CSSProperties);

  return (
    <span
      style={style}
      onClick={() => {
        handleChangeLanguage(props.code);
      }}
    >
      {props.label}
    </span>
  );
};

export default ChooseLanguage;
