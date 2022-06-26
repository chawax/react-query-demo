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

const ChooseLanguage = ({ code, label }: ChooseLanguageProps) => {
  const { i18n } = useTranslation();

  const handleChangeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  const style: React.CSSProperties =
    i18n.language === code
      ? (styles.languageEnabled as React.CSSProperties)
      : (styles.languageDisabled as React.CSSProperties);

  return (
    <span
      style={style}
      onClick={() => {
        handleChangeLanguage(code);
      }}
    >
      {label}
    </span>
  );
};

export default ChooseLanguage;
