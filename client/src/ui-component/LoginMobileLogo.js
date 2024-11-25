
import React from 'react';
import mobileLogo from '../assets/images/swipe-mobile-logo.webp';

const MobileLogo = () => {
  const width = 270;
  const height = 80;

  return (
    <img src={mobileLogo} alt="Mobile Logo" width={width} height={height}/>
  );

  // This code is unreachable and should be removed or commented out
  // console.log('This code is unreachable');
};

export default MobileLogo;
