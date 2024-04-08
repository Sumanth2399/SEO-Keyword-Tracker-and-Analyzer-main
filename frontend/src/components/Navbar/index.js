import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { createTheme } from '@mui/material/styles';

const Navbar = () => {
  const customTheme = createTheme({
    palette: {
      primary: {
        main: '#000000', 
      },
      type: 'dark', 
    },
  });
  
  return (
    <AppBar style={{ height: '60px' }} sx={{ backgroundColor: customTheme.palette.primary.main }}>
      <Toolbar style={{ justifyContent: 'center' }}>
        <Typography variant='h6' component='div'>
          SEO Keyword Tracker and Analyser
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
