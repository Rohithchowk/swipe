
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { Avatar, Chip, Typography, Popper, Paper, ClickAwayListener, List, ListItemButton, ListItemIcon, ListItemText, Box, Stack, Divider } from '@mui/material';
import { IconLogout, IconSettings } from '@tabler/icons-react';
import axios from 'axios';
import User1 from 'assets/images/users/user-round.svg';

const ProfileSection = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null); // State to store user profile data
  const [open, setOpen] = useState(false); // State to control the profile popper

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:8000/auth/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }); 
        const { user } = response.data;
        setUserProfile(user); // Set user profile data
      } catch (error) {
        console.error('Error fetching user profile:', error);
        if (!localStorage.getItem('token')) {
          navigate('/'); // Redirect to home page only if no token found
        }
      }
    };
  
    fetchUserProfile();
  }, []);
  

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found.');
        return;
      }
  
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
  
      await axios.post('http://localhost:8000/auth/logout', null, config);
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('usertype');
      console.log(`user logged out${token}`)
      setUserProfile(null); // Clear user profile data upon logout
      setOpen(false); // Close the profile popper after logout
      navigate('/'); // Redirect to home page
      window.location.reload();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  const handleClick = () => {
    setOpen((prevOpen) => !prevOpen); // Toggle the profile popper
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const anchorRef = useRef(null);

  if (!userProfile) {
    return null; // Render nothing if user profile data is not available
  }

  return (
    <>
      <div style={{ position: 'relative' }}>
        <Chip
          ref={anchorRef}
          sx={{
            height: '48px',
            alignItems: 'center',
            borderRadius: '27px',
            transition: 'all .2s ease-in-out',
            borderColor: theme.palette.primary.light,
            backgroundColor: theme.palette.primary.light,
            '&[aria-controls="menu-list-grow"], &:hover': {
              borderColor: theme.palette.primary.main,
              background: `${theme.palette.primary.main}!important`,
              color: theme.palette.primary.light,
              '& svg': {
                stroke: theme.palette.primary.light
              }
            },
            '& .MuiChip-label': {
              lineHeight: 0
            }
          }}
          icon={
            <Avatar
              src={userProfile.photo || User1}
              sx={{
                ...theme.typography.mediumAvatar,
                margin: '8px 0 8px 8px !important',
                cursor: 'pointer'
              }}
              color="inherit"
            />
          }
          label={<IconSettings stroke={1.5} size="1.5rem" color={theme.palette.primary.main} />}
          variant="outlined"
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleClick}
          color="primary"
        />
        {open && (
          <div
          id="menu-list-grow"
          style={{
            zIndex: 9999,
            position: 'absolute',
            top: 'calc(100% + 5px)',
            right: 0,
            width: 'fit-content', // Adjust width to fit content
            minWidth: '250px', // Set a minimum width
            backgroundColor: 'white', // Set background color to white
            borderRadius: '8px', // Add border radius for rounded corners
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)' // Add box shadow for better visibility
          }}
        >
        
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <Box sx={{ p: 2 }}>
                  <Stack>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <Typography variant="h4" sx={{ fontWeight: 400 }}>Hello,</Typography>
                      <Typography component="span" variant="h4" >
                        {userProfile && userProfile.username}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Divider />
                  <List>
                    <ListItemButton onClick={handleLogout}>
                      <ListItemIcon>
                        <IconLogout stroke={1.5} size="1.3rem" />
                      </ListItemIcon>
                      <ListItemText primary={<Typography variant="body2">Logout</Typography>} />
                    </ListItemButton>
                  </List>
                </Box>
              </ClickAwayListener>
            </Paper>
          </div>
        )}
      </div>
    </>
  );
  
  
  
  
};

export default ProfileSection;








