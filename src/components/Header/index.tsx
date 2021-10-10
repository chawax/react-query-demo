import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavbarBrand } from 'reactstrap';
import DisplayModeContext from '../../context/DisplayModeContext';
import ChooseDisplayMode from './ChooseDisplayMode';
import ChooseLanguage from './ChooseLanguage';

const Header: React.FC = () => {
  const { t } = useTranslation();
  const { displayMode } = useContext(DisplayModeContext);
  const navbarColor = displayMode === 'dark' ? 'dark' : 'light';
  const textColor = displayMode === 'dark' ? '#FFF' : '#000';
  return (
    <Navbar
      color={navbarColor}
      expand="md"
      className="d-flex justify-content-between"
    >
      <Link to="/">
        <NavbarBrand style={{ color: textColor }}>
          <h1>{t('app.title')}</h1>
        </NavbarBrand>
      </Link>
      <Nav style={{ color: textColor, flexDirection: 'column' }}>
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
      </Nav>
    </Navbar>
  );
};

export default Header;
