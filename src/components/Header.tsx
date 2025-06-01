import { Flex, Heading, HStack, Spacer, Text, VStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import ChooseLanguage from '@/components/ChooseLanguage';

const Header = () => {
  const { t } = useTranslation();
  return (
    <Flex width="inherit" padding={5} bgColor="gray.100">
      <Link to="/">
        <Heading as="h1">{t('app.title')}</Heading>
      </Link>
      <Spacer />
      <VStack>
        <HStack>
          <ChooseLanguage code="fr" label="FR" />
          <Text>&nbsp;|&nbsp;</Text>
          <ChooseLanguage code="en" label="EN" />
        </HStack>
      </VStack>
    </Flex>
  );
};

export default Header;
