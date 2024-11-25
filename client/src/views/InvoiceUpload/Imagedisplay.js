import React from 'react';
import { Grid, Box } from '@mui/material';
import pdflogo from '../../assets/images/pdflogo1.png'
import pnglogo from '../../assets/images/pnglogo.png'
import jpglogo from '../../assets/images/jpglogo.png'

const ImageRow = () => {
  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item xs={12} sm={4} md={4} lg={4}>
        <Box 
          component="img" 
          src={pdflogo}
          alt="Image 1" 
          width="90%" 
          height="auto"
        />
      </Grid>
      <Grid item xs={12} sm={4} md={4} lg={4}>
        <Box 
          component="img" 
          src={pnglogo}
          alt="Image 2" 
          width="90%" 
          height="100%"
        />
      </Grid>
      <Grid item xs={12} sm={4} md={4} lg={4}>
        <Box 
          component="img" 
          src={jpglogo}
          alt="Image 3" 
          width="85%" 
          height="auto"
        />
      </Grid>
    </Grid>
  );
};

export default ImageRow;
