import React, { useState } from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { muiTheme } from '@/theme/muiTheme';
import Sidebar from '@/components/Sidebar';
import Dashboard from '@/components/Dashboard';

const DRAWER_WIDTH = 240;

const Index: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <Box
          component="nav"
          sx={{
            width: { md: DRAWER_WIDTH },
            flexShrink: { md: 0 },
          }}
        >
          <Sidebar mobileOpen={mobileOpen} onMobileClose={handleDrawerToggle} />
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: { xs: '100%', md: `calc(100% - ${DRAWER_WIDTH}px)` },
            minHeight: '100vh',
            bgcolor: '#FFFFFF',
          }}
        >
          <Dashboard onMenuClick={handleDrawerToggle} />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Index;
