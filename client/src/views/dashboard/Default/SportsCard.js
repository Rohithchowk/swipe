import PropTypes from 'prop-types';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, Grid, Typography } from '@mui/material';
import swipe from '../../../assets/images/e-invoice.jpg';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';

// assets
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundImage: `url(${swipe})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
  color: '#fff',
  overflow: 'hidden',
  position: 'relative',
}));

// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

const Mytest = ({ isLoading }) => {
  const theme = useTheme();

  return (
    <>
      {isLoading ? (
        <EmojiEmotionsIcon />
      ) : (
        <CardWrapper border={false} content={false}>
          <Box sx={{ p: 2.25 }}>
            <Grid container direction="column">
              <Grid item>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <Avatar
                      variant="rounded"
                      sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.largeAvatar,
                        backgroundColor: theme.palette.primary[800],
                        mt: 1,
                        a:{
                          color: '#ffffff',
                        }
                      }}
                    >
                      <NavLink to='/viewinvoice' ><EmojiEmotionsIcon/></NavLink>
                    </Avatar>
                  </Grid>
                  {/* Removed the second Avatar component */}
                </Grid>
              </Grid>
              <Grid item>
                <Grid container alignItems="center">
                  <Grid item>
                    <Typography sx={{color:'white',fontSize: '1.550rem', fontWeight: 400, mr: 1, mt: 1.75, mb: 0.75 }}>We make your life easy</Typography>
                  </Grid>
                  <Grid item>
                    <Avatar
                      sx={{
                        cursor: 'pointer',
                        ...theme.typography.smallAvatar,
                        backgroundColor: theme.palette.primary[200],
                        a:{
                          color: theme.palette.primary.dark
                        } 
                      }}
                    >
                      <NavLink to='/viewinvoice' ><ArrowUpwardIcon fontSize="inherit" sx={{ transform: 'rotate3d(1, 1, 1, 45deg)' }} /></NavLink>
                    </Avatar>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sx={{ mb: 1.25 }}>
                <Typography
                  sx={{
                    fontSize: '1rem',
                    fontWeight: 500,
                    color: theme.palette.secondary[800]
                  }}
                >
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </CardWrapper>
      )}
    </>
  );
};

Mytest.propTypes = {
  isLoading: PropTypes.bool
};

export default Mytest;