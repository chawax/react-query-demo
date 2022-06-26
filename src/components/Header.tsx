import * as React from 'react';

import { Flex, Heading, Spacer, VStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import DisplayModeContext from '../context/DisplayModeContext';
import ChooseDisplayMode from './ChooseDisplayMode';
import ChooseLanguage from './ChooseLanguage';

const Header = () => {
  const { t } = useTranslation();
  const { displayMode } = React.useContext(DisplayModeContext);
  const navbarColor = displayMode === 'dark' ? 'dark' : 'light';
  const textColor = displayMode === 'dark' ? '#FFF' : '#000';

  return (
    <Flex width="inherit" padding={5} bgColor="blue.500">
      <Link to="/">
        <Heading as="h1">{t('app.title')}</Heading>
      </Link>
      <Spacer />
      <VStack>
        <div>
          <ChooseLanguage code="fr" label="FR" />
          &nbsp;|&nbsp;
          <ChooseLanguage code="en" label="EN" />
        </div>
        <div>
          <ChooseDisplayMode code="dark" label="DARK" />
          &nbsp;|&nbsp;
          <ChooseDisplayMode code="light" label="LIGHT" />
        </div>
      </VStack>{' '}
    </Flex>
  );
};

export default Header;
