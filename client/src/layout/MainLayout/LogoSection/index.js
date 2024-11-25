import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ButtonBase, useMediaQuery } from '@mui/material';
import config from 'config';
import Logo from 'ui-component/Logo'; // Import the default logo
import MobileLogo from 'ui-component/MobileLogo'; // Import the mobile logo
import { MENU_OPEN } from 'store/actions';

const LogoSection = () => {
  const defaultId = useSelector((state) => state.customization.defaultId);
  const dispatch = useDispatch();
  const isMobileView = useMediaQuery('(max-width: 600px)');

  return (
    <ButtonBase
      disableRipple
      onClick={() => dispatch({ type: MENU_OPEN, id: defaultId })}
      component={Link}
      to={config.defaultPath}
      sx={{ paddingRight: 2 }}
    >
      {isMobileView ? <MobileLogo /> : <Logo />} {/* Render appropriate logo based on screen size */}
    </ButtonBase>
  );
};

export default LogoSection;
