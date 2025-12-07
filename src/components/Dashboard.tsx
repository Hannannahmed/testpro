import React, { useState } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Button,
  Switch,
  FormControlLabel,
  IconButton,
  useMediaQuery,
  useTheme,
  AppBar,
  Toolbar,
} from '@mui/material';
import {
  AutoAwesome,
  BookmarkBorder,
  ViewColumn,
  CalendarToday,
  Menu as MenuIcon,
  FileUploadOutlined,
} from '@mui/icons-material';
import IncomeStatementTable from './IncomeStatementTable';

interface DashboardProps {
  onMenuClick: () => void;
}

const tabs = [
  { label: 'Summary', value: 'summary' },
  { label: 'Income Statement', value: 'income' },
  { label: 'Balance Sheet', value: 'balance' },
  { label: 'Cashflow', value: 'cashflow' },
  { label: 'Trends', value: 'trends' },
  { label: 'Variance Analysis', value: 'variance' },
];

const Dashboard: React.FC<DashboardProps> = ({ onMenuClick }) => {
  const [activeTab, setActiveTab] = useState('income');
  const [showForecast, setShowForecast] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', bgcolor: '#FFFFFF', minHeight: '100vh' }}>
      {/* Header */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          bgcolor: 'white',
          borderBottom: '1px solid #E5E7EB',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', minHeight: { xs: 56, sm: 64 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {isTablet && (
              <IconButton
                edge="start"
                onClick={onMenuClick}
                sx={{ color: '#374151' }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                color: '#1F2937',
                fontSize: { xs: 18, sm: 24 },
              }}
            >
              Income Statement
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button
              variant="outlined"
              startIcon={<AutoAwesome />}
              sx={{
                borderColor: '#E5E7EB',
                color: '#374151',
                textTransform: 'none',
                fontSize: 13,
                px: { xs: 1, sm: 2 },
                display: { xs: 'none', sm: 'flex' },
                '&:hover': {
                  borderColor: '#D1D5DB',
                  bgcolor: '#F9FAFB',
                },
              }}
            >
              Ask AI for Insights
            </Button>
            <IconButton
              sx={{
                display: { xs: 'flex', sm: 'none' },
                color: '#374151',
              }}
            >
              <AutoAwesome />
            </IconButton>
          <IconButton
  sx={{
    border: '1px solid #E5E7EB',
    borderRadius: 1,
    color: '#374151',
  }}
>
  <FileUploadOutlined sx={{ fontSize: 18 }} />
</IconButton>

            <Button
              variant="outlined"
              startIcon={<BookmarkBorder />}
              sx={{
                borderColor: '#E5E7EB',
                color: '#374151',
                textTransform: 'none',
                fontSize: 13,
                display: { xs: 'none', sm: 'flex' },
                '&:hover': {
                  borderColor: '#D1D5DB',
                  bgcolor: '#F9FAFB',
                },
              }}
            >
              Save
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Content */}
      <Box sx={{ flex: 1, p: { xs: 2, sm: 3 }, overflow: 'auto' }}>
        {/* Tabs */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'stretch', md: 'center' },
            mb: 3,
            gap: 2,
          }}
        >
          <Box
            sx={{
              bgcolor: 'white',
              borderRadius: 2,
              p: 0.5,
              display: 'inline-flex',
              overflowX: 'auto',
              '&::-webkit-scrollbar': { display: 'none' },
            }}
          >
            <Tabs
              value={activeTab}
              onChange={(_, v) => setActiveTab(v)}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                minHeight: 36,
                '& .MuiTabs-indicator': {
                  display: 'none',
                },
                '& .MuiTab-root': {
                  minHeight: 32,
                  minWidth: 'auto',
                  px: { xs: 1.5, sm: 2 },
                  py: 0.5,
                  fontSize: { xs: 12, sm: 13 },
                  fontWeight: 500,
                  color: '#6B7280',
                  borderRadius: 1.5,
                  textTransform: 'none',
                  '&.Mui-selected': {
                    color: 'white',
                    bgcolor: 'black',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                  },
                },
              }}
            >
              {tabs.map((tab) => (
                <Tab key={tab.value} label={tab.label} value={tab.value} />
              ))}
            </Tabs>
          </Box>

          
        </Box>

        {/* Table */}
        <IncomeStatementTable />
      </Box>
    </Box>
  );
};

export default Dashboard;
