import React from 'react';
import pngLogo from '../assets/images/swipe-logo.webp';
import mobileLogo from '../assets/images/swipe-mobile-logo.webp';

const Logo = ({ isMobile }) => {
  const logoSrc = isMobile ? mobileLogo : pngLogo;
  const altText = isMobile ? 'Mobile Logo' : 'CBIT Logo';
  const width = isMobile ? 200 : 150;
  const height = isMobile ? 40 : 40;

  return (
    <img src={logoSrc} alt={altText} width={width} height={height}/>
  );
};

export default Logo;

