import PropTypes from 'prop-types';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

// material-ui
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, Grid, Typography } from '@mui/material';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import swipe from '../../../assets/images/manualinvoice.jpg'
// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';

// assets
import EarningIcon from 'assets/images/icons/earning.svg';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { color } from 'framer-motion';

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundImage: `url(${swipe})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center center'
}));

// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

const EarningCard = ({ isLoading }) => {
  const theme = useTheme();

  return (
    <>
      {isLoading ? (
        <SkeletonEarningCard />
      ) : (
        <CardWrapper border={false} content={false}>
          <Box sx={{ p: 2.25 }}>
            <Grid container direction="column">
              <Grid item>
                <Avatar
                  variant="rounded"
                  sx={{
                    ...theme.typography.commonAvatar,
                    ...theme.typography.largeAvatar,
                    backgroundColor: '#941b1c',
                    a: {
                      color: 'white'
                    },
                    mt: 1
                  }}
                >
                  <NavLink to="/alldata">
                    <ReceiptLongIcon sx={{ color: 'white' }} />
                  </NavLink>
                </Avatar>
              </Grid>
              <Grid item>
                <Grid container alignItems="center">
                  <Grid item>
                    <Typography sx={{ color: theme.palette.primary.dark, fontSize: '1.470rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>Digitalize Billing System</Typography>
                  </Grid>
                  <Grid item>
                    <Avatar
                      sx={{
                        cursor: 'pointer',
                        ...theme.typography.smallAvatar,
                        backgroundColor: theme.palette.secondary[200],
                        a: {
                          color: theme.palette.secondary.dark
                        }
                      }}
                    >
                      <NavLink to="/alldata">
                        <ArrowUpwardIcon fontSize="inherit" sx={{ transform: 'rotate3d(1, 1, 1, 45deg)' }} />
                      </NavLink>
                    </Avatar>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sx={{ mb: 1.25 }}>
                <Typography
                  sx={{
                    fontSize: '1rem',
                    fontWeight: 500,
                    color: theme.palette.primary[800]
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

EarningCard.propTypes = {
  isLoading: PropTypes.bool
};

export default EarningCard;
