import React, { useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
  Collapse,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Home,
  Dashboard,
  Analytics,
  Description,
  AccountBalance,
  SmartToy,
  Settings,
  IntegrationInstructions,
  HelpOutline,
  ExpandMore,
  ExpandLess,
  Menu as MenuIcon,
  AutoAwesome,
} from '@mui/icons-material';

const DRAWER_WIDTH = 240;

interface SidebarProps {
  mobileOpen: boolean;
  onMobileClose: () => void;
}

const menuItems = [
  { icon: <Home />, label: 'Home', path: '/' },
  { icon: <Dashboard />, label: 'Dashboard', path: '/dashboard' },
  { icon: <Analytics />, label: 'Analytics & Insights', path: '/analytics' },
  { icon: <Description />, label: '3-Statement', path: '/statements', active: true },
  { icon: <AccountBalance />, label: 'Financial Control', path: '/financial' },
  { 
    icon: <SmartToy />, 
    label: 'AI Agents', 
    path: '/ai-agents',
    hasSubmenu: true,
  },
];

const bottomMenuItems = [
  { icon: <Settings />, label: 'Settings', path: '/settings' },
  { icon: <IntegrationInstructions />, label: 'System & Integration', path: '/integration' },
  { icon: <HelpOutline />, label: 'Help & Support', path: '/help' },
];

const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, onMobileClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [aiAgentsOpen, setAiAgentsOpen] = useState(false);

  const drawerContent = (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'white',
      }}
    >
      {/* Logo */}
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: 1,
            bgcolor: 'black',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography sx={{ color: 'white', fontWeight: 700, fontSize: 14 }}>F</Typography>
        </Box>
       <Typography variant="h6" sx={{ color: 'black', fontWeight: 600, fontSize: 18 }}>
  finmetrx
</Typography>

      </Box>

      {/* Main Menu */}
      <List sx={{ flex: 1, px: 1, pt: 2 }}>
        {menuItems.map((item) => (
          <React.Fragment key={item.label}>
            <ListItemButton
              selected={item.active}
              onClick={() => item.hasSubmenu && setAiAgentsOpen(!aiAgentsOpen)}
              sx={{
                borderRadius: 1,
                mb: 0.5,
                color: item.active ? 'black' : 'rgba(0,0,0,0.7)',

                bgcolor: item.active ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                '&:hover': {
                  bgcolor: item.active ? 'rgba(59, 130, 246, 0.15)' : 'rgba(255,255,255,0.05)',
                },
              }}
            >
              <ListItemIcon sx={{ color: 'inherit', minWidth: 36 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.label} 
                primaryTypographyProps={{ fontSize: 14, fontWeight: item.active ? 500 : 400 }}
              />
              {item.hasSubmenu && (aiAgentsOpen ? <ExpandLess /> : <ExpandMore />)}
            </ListItemButton>
            {item.hasSubmenu && (
              <Collapse in={aiAgentsOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 6, color: 'rgba(0,0,0,0.6)'
 }}>
                    <ListItemText primary="Agent 1" primaryTypographyProps={{ fontSize: 13 }} />
                  </ListItemButton>
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>

      {/* Bottom Menu */}
      <List sx={{ px: 1 ,backgroundColor: "white"}}>
        {bottomMenuItems.map((item) => (
          <ListItemButton
            key={item.label}
            sx={{
              borderRadius: 1,
              mb: 0.5,
              color: 'rgba(0,0,0,0.7)',

              '&:hover': {
                bgcolor: 'rgba(0,0,0,0.04)',

              },
            }}
          >
            <ListItemIcon sx={{ color: 'inherit', minWidth: 36 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.label} 
              primaryTypographyProps={{ fontSize: 14 }}
            />
          </ListItemButton>
        ))}
      </List>

      {/* Fintelligent Button */}
  <Box sx={{ px: 2, pb: 1, backgroundColor: "white" }}>
  <Box
    sx={{
      bgcolor: "#000",
      borderRadius: 2,
      py: 1.2,
      px: 1.4,
      width: "100%",
      display: "flex",
      alignItems: "center",
      gap: 1.2,
      cursor: "pointer",
      boxShadow: "0px 2px 10px rgba(0,0,0,0.12)",
      "&:hover": {
        bgcolor: "#111",
      },
    }}
  >

    <AutoAwesome sx={{ fontSize: 20, color: "white" }} />
    <Typography sx={{ fontWeight: 500, fontSize: 14, color: "white" }}>
      Fintelligent
    </Typography>
  </Box>
</Box>


    
    <Box
  sx={{
    p: 2,
    bgcolor: 'white',          
    borderTop: '0px solid rgba(0,0,0,0.1)', 
    display: 'flex',
    alignItems: 'center',
    gap: 1.5,
  }}
>

        <Avatar
          sx={{ width: 36, height: 36, bgcolor: '#6366F1' }}
          src=""
        >
          RJ
        </Avatar>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography sx={{ fontSize: 14, fontWeight: 500, color: 'black' }}>
            Rameena J.
          </Typography>
          <Typography sx={{ fontSize: 12, color: 'rgba(0,0,0,0.5)'
}}>
            Executive Dashboard
          </Typography>
        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Mobile Drawer */}
    <Drawer
  variant="temporary"
  open={mobileOpen}
  onClose={onMobileClose}
  ModalProps={{
    keepMounted: true,
    BackdropProps: {
      style: { backgroundColor: "transparent" }, // remove fade overlay
    },
  }}
  sx={{
    display: { xs: 'block', md: 'none' },
    '& .MuiDrawer-paper': {
      width: DRAWER_WIDTH,
      boxSizing: 'border-box',
    },
  }}
>
  {drawerContent}
</Drawer>

      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            borderRight: 'none',
            backgroundColor: '#FFFFFF',
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;
