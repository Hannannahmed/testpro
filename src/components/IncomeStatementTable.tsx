import React, { useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Typography,
  Collapse,
  useMediaQuery,
  useTheme,
  FormControlLabel,
  Switch,
  Button,
} from '@mui/material';
import { Add, CalendarToday, Event, KeyboardArrowDown, KeyboardArrowUp, ViewColumn } from '@mui/icons-material';

interface RowData {
  id: string;
  account: string;
  actuals: string;
  jan2025: string;
  feb2025: string;
  mar2025: string;
  mar2025_2?: string;
  apr2025: string;
  may2025: string;
  forecast?: string;
  delta?: string;
  isCategory?: boolean;
  isTotal?: boolean;
  isHighlight?: boolean;
  children?: RowData[];
}

const incomeData: RowData[] = [
  {
    id: 'current-assets',
    account: 'Current Assets',
    actuals: '',
    jan2025: '',
    feb2025: '',
    mar2025: '',
    apr2025: '',
    may2025: '',
    isCategory: true,
    children: [
      {
        id: 'product-sales',
        account: 'Product Sales',
        actuals: '$45,200',
        jan2025: '$48,500',
        feb2025: '$51,000',
        mar2025: '$49,800',
        apr2025: '$52,400',
        may2025: '$54,900',
        delta: '5%',
      },
      {
        id: 'service-revenue',
        account: 'Service Revenue',
        actuals: '$22,800',
        jan2025: '$23,200',
        feb2025: '$25,100',
        mar2025: '$26,400',
        apr2025: '$27,100',
        may2025: '$29,300',
        delta: '4%',
      },
    ],
  },

  {
    id: 'total-current-assets',
    account: 'Total Current Assets',
    actuals: '$68,000',
    jan2025: '$71,700',
    feb2025: '$76,100',
    mar2025: '$76,200',
    apr2025: '$79,500',
    may2025: '$84,200',
    delta: '6%',
    isTotal: true,
  },

  {
    id: 'cost-of-goods',
    account: 'Cost of Goods Sold',
    actuals: '',
    jan2025: '',
    feb2025: '',
    mar2025: '',
    apr2025: '',
    may2025: '',
    isCategory: true,
    children: [
      {
        id: 'raw-material',
        account: 'Raw Material',
        actuals: '$12,400',
        jan2025: '$13,200',
        feb2025: '$14,100',
        mar2025: '$14,500',
        apr2025: '$15,200',
        may2025: '$16,000',
        delta: '3%',
      },
      {
        id: 'direct-labor',
        account: 'Direct Labor',
        actuals: '$9,800',
        jan2025: '$10,100',
        feb2025: '$10,500',
        mar2025: '$11,200',
        apr2025: '$11,400',
        may2025: '$12,000',
        delta: '2%',
      },
    ],
  },

  {
    id: 'total-cost-goods',
    account: 'Total Cost of Goods Sold',
    actuals: '$22,200',
    jan2025: '$23,300',
    feb2025: '$24,600',
    mar2025: '$25,700',
    apr2025: '$26,600',
    may2025: '$28,000',
    delta: '4%',
    isTotal: true,
  },

  {
    id: 'gross-profit',
    account: 'Gross Profit',
    actuals: '$45,800',
    jan2025: '$48,400',
    feb2025: '$51,500',
    mar2025: '$50,500',
    apr2025: '$52,900',
    may2025: '$56,200',
    delta: '7%',
    isHighlight: true,
  },

  {
    id: 'operating-expense',
    account: 'Operating Expense',
    actuals: '',
    jan2025: '',
    feb2025: '',
    mar2025: '',
    apr2025: '',
    may2025: '',
    isCategory: true,
    children: [
      {
        id: 'sales-marketing',
        account: 'Sales and Marketing',
        actuals: '',
        jan2025: '',
        feb2025: '',
        mar2025: '',
        apr2025: '',
        may2025: '',
        isCategory: true,
        children: [
          {
            id: 'salaries-wages',
            account: 'Salaries and Wages',
            actuals: '$9,500',
            jan2025: '$9,800',
            feb2025: '$10,200',
            mar2025: '$10,500',
            apr2025: '$10,900',
            may2025: '$11,300',
            delta: '2%',
          },
          {
            id: 'marketing-advertising',
            account: 'Marketing & Advertising',
            actuals: '$5,400',
            jan2025: '$5,900',
            feb2025: '$6,300',
            mar2025: '$6,800',
            apr2025: '$7,100',
            may2025: '$7,600',
            delta: '3%',
          },
        ],
      },

      {
        id: 'total-sales-marketing',
        account: 'Total Sales & Marketing',
        actuals: '$14,900',
        jan2025: '$15,700',
        feb2025: '$16,500',
        mar2025: '$17,300',
        apr2025: '$18,000',
        may2025: '$18,900',
        delta: '4%',
        isTotal: true,
      },
    ],
  },

  {
    id: 'general-admin',
    account: 'General & Administrative',
    actuals: '',
    jan2025: '',
    feb2025: '',
    mar2025: '',
    apr2025: '',
    may2025: '',
    isCategory: true,
    children: [
      {
        id: 'admin-salaries',
        account: 'Administrative Salaries',
        actuals: '$8,200',
        jan2025: '$8,600',
        feb2025: '$8,900',
        mar2025: '$9,100',
        apr2025: '$9,300',
        may2025: '$9,800',
        delta: '2%',
      },
      {
        id: 'legal-fees',
        account: 'Legal & Professional Fees',
        actuals: '$4,300',
        jan2025: '$4,700',
        feb2025: '$5,000',
        mar2025: '$5,200',
        apr2025: '$5,500',
        may2025: '$5,900',
        delta: '3%',
      },
      {
        id: 'office-utilities',
        account: 'Office & Utilities',
        actuals: '$3,800',
        jan2025: '$4,000',
        feb2025: '$4,300',
        mar2025: '$4,500',
        apr2025: '$4,700',
        may2025: '$5,000',
        delta: '2%',
      },
    ],
  },

  {
    id: 'total-general-admin',
    account: 'Total General & Administrative',
    actuals: '$16,300',
    jan2025: '$17,300',
    feb2025: '$18,200',
    mar2025: '$18,800',
    apr2025: '$19,500',
    may2025: '$20,700',
    delta: '3%',
    isTotal: true,
  },

  {
    id: 'research-dev',
    account: 'Research & Development',
    actuals: '',
    jan2025: '',
    feb2025: '',
    mar2025: '',
    apr2025: '',
    may2025: '',
    isCategory: true,
    children: [
      {
        id: 'rd-personnel',
        account: 'R&D Personnel',
        actuals: '$6,800',
        jan2025: '$7,200',
        feb2025: '$7,500',
        mar2025: '$7,900',
        apr2025: '$8,300',
        may2025: '$8,700',
        delta: '3%',
      },
    ],
  },
];


interface CategoryRowProps {
  row: RowData;
  level: number;
}

const CategoryRow: React.FC<CategoryRowProps> = ({ row, level }) => {
  const [open, setOpen] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const renderRow = (rowData: RowData, depth: number) => {
    const paddingLeft = 16 + depth * 24;
    
    return (
      <React.Fragment key={rowData.id}>
        <TableRow
          sx={{
            bgcolor: rowData.isHighlight 
              ? '#F9FAFB' 
              : rowData.isTotal 
                ? 'transparent' 
                : 'transparent',
            '&:hover': {
              bgcolor: '#FAFAFA',
            },
          }}
        >
          <TableCell
            sx={{
              pl: `${paddingLeft}px`,
              fontWeight: rowData.isCategory || rowData.isTotal || rowData.isHighlight ? 500 : 400,
              color: rowData.isTotal ? '#374151' : '#1F2937',
              borderBottom: '1px solid #E5E7EB',
              minWidth: isMobile ? 150 : 200,
              position: 'sticky',
              left: 0,
              bgcolor: 'white',
              zIndex: 1,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              {rowData.isCategory && rowData.children && (
                <IconButton
                  size="small"
                  onClick={() => setOpen(!open)}
                  sx={{ p: 0.25, mr: 0.5 }}
                >
                  {open ? <KeyboardArrowUp fontSize="small" /> : <KeyboardArrowDown fontSize="small" />}
                </IconButton>
              )}
              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: rowData.isCategory || rowData.isTotal || rowData.isHighlight ? 500 : 400,
                }}
              >
                {rowData.account}
              </Typography>
            </Box>
          </TableCell>
          <TableCell align="right" sx={{ color: '#6B7280', fontSize: 13, minWidth: 100 }}>
            {rowData.actuals}
          </TableCell>
          <TableCell align="right" sx={{ color: '#6B7280', fontSize: 13, minWidth: 100 }}>
            {rowData.jan2025}
          </TableCell>
          <TableCell align="right" sx={{ color: '#6B7280', fontSize: 13, minWidth: 100 }}>
            {rowData.feb2025}
          </TableCell>
          <TableCell align="right" sx={{ color: '#6B7280', fontSize: 13, minWidth: 100 }}>
            {rowData.mar2025}
          </TableCell>
          <TableCell align="right" sx={{ color: '#6B7280', fontSize: 13, minWidth: 100 }}>
            {rowData.mar2025_2 || rowData.mar2025}
          </TableCell>
          <TableCell align="right" sx={{ color: '#6B7280', fontSize: 13, minWidth: 100 }}>
            {rowData.apr2025}
          </TableCell>
          <TableCell 
            align="right" 
            sx={{ 
              color: '#22C55E', 
              fontSize: 13,
              minWidth: 100,
              bgcolor: rowData.may2025 ? '#F0FDF4' : 'transparent',
            }}
          >
            {rowData.may2025}
          </TableCell>
          <TableCell 
            align="center" 
            sx={{ 
              color: '#6B7280', 
              fontSize: 13,
              minWidth: 50,
            }}
          >
            {rowData.delta}
          </TableCell>
        </TableRow>
        {rowData.children && (
          <TableRow>
            <TableCell colSpan={9} sx={{ p: 0, border: 'none' }}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Table size="small">
                  <TableBody>
                    {rowData.children.map((child) => (
                      <CategoryRow key={child.id} row={child} level={depth + 1} />
                    ))}
                  </TableBody>
                </Table>
              </Collapse>
            </TableCell>
          </TableRow>
        )}
      </React.Fragment>
    );
  };

  return renderRow(row, level);
};

const IncomeStatementTable: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
const [showForecast, setShowForecast] = useState(true);
  return (
    <TableContainer
      sx={{
        
        overflow: 'auto',
        border: '1px solid #E5E7EB',
        borderRadius: 1,
        padding:'10px'
      }}
    >
     <Box
  sx={{
    display: "flex",
    alignItems: "center",
    justifyContent: "end",
    gap: { xs: 1, sm: 2 },
    flexWrap: "wrap",
    marginBottom: { xs: 1, sm: 2 },
  }}
>
  {/* Calendar Button */}
  <Button
    variant="outlined"
    startIcon={<Event sx={{ fontSize: 18 }} />} // Better icon
    sx={{
      borderColor: "#E5E7EB",
      color: "#111827",
      textTransform: "none",
      fontSize: { xs: 11, sm: 13 },
      py: 0.75,
      px: { xs: 1, sm: 1.5 },
      borderRadius: 2,
      boxShadow: "0 1px 2px rgba(0,0,0,0.10)",
      "&:hover": {
        borderColor: "#D1D5DB",
        bgcolor: "#F9FAFB",
      },
    }}
  >
    Jan – Mar 2025
  </Button>

  {/* Toggle + Label */}
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 1,
      border: "1px solid #E5E7EB",
      px: 1.5,
      py: 0.5,
      borderRadius: 2,
      boxShadow: "0 1px 2px rgba(0,0,0,0.10)",
    }}
  >
    <Switch
      checked={showForecast}
      onChange={(e) => setShowForecast(e.target.checked)}
      size="small"
      sx={{
        "& .MuiSwitch-switchBase.Mui-checked": {
          color: "#111827",
        },
        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
          backgroundColor: "#111827",
        },
        "& .MuiSwitch-track": {
          backgroundColor: "#D1D5DB",
        },
      }}
    />
    <Typography sx={{ fontSize: { xs: 11, sm: 13 }, color: "#111827" }}>
      Show Forecast
    </Typography>
  </Box>

  {/* Insert Column */}
  <Button
    variant="outlined"
    startIcon={<Add sx={{ fontSize: 18 }} />} // + Icon Added
    sx={{
      borderColor: "#E5E7EB",
      color: "#111827",
      textTransform: "none",
      fontSize: { xs: 11, sm: 13 },
      py: 0.75,
      px: { xs: 1, sm: 1.5 },
      borderRadius: 2,
      boxShadow: "0 1px 2px rgba(0,0,0,0.10)",
      "&:hover": {
        borderColor: "#D1D5DB",
        bgcolor: "#F9FAFB",
      },
    }}
  >
    Insert Column
  </Button>
</Box>

      <Table stickyHeader size="small">
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                fontWeight: 600,
                bgcolor: '#FFFFFF',
                borderBottom: '1px solid #E5E7EB',
                minWidth: isMobile ? 150 : 200,
                position: 'sticky',
                left: 0,
                zIndex: 3,
              }}
            >
              Accounts
            </TableCell>
            <TableCell
              colSpan={2}
              align="center"
              sx={{
                fontWeight: 600,
                bgcolor: '#FFFFFF',
                borderBottom: '1px solid #E5E7EB',
                color: '#6B7280',
              }}
            >
              Actuals
            </TableCell>
            <TableCell
              colSpan={5}
              align="center"
              sx={{
                fontWeight: 600,
                bgcolor: '#FFFFFF',
                borderBottom: '1px solid #E5E7EB',
                color: '#6B7280',
              }}
            >
              
            </TableCell>
            <TableCell
              align="center"
              sx={{
                fontWeight: 600,
                bgcolor: '#F0FDF4',
                borderBottom: '1px solid #E5E7EB',
                color: '#22C55E',
              }}
            >
              Forecast
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              sx={{
                bgcolor: '#F9FAFB',
                fontWeight: 500,
                color: '#6B7280',
                fontSize: 12,
                position: 'sticky',
                left: 0,
                zIndex: 3,
              }}
            >
              
            </TableCell>
            <TableCell align="right" sx={{ bgcolor: '#F9FAFB', fontWeight: 500, color: '#6B7280', fontSize: 12 }}>
              Actuals
            </TableCell>
            <TableCell align="right" sx={{ bgcolor: '#F9FAFB', fontWeight: 500, color: '#6B7280', fontSize: 12 }}>
              Jan 2025
            </TableCell>
            <TableCell align="right" sx={{ bgcolor: '#F9FAFB', fontWeight: 500, color: '#6B7280', fontSize: 12 }}>
              Feb 2025
            </TableCell>
            <TableCell align="right" sx={{ bgcolor: '#F9FAFB', fontWeight: 500, color: '#6B7280', fontSize: 12 }}>
              Mar 2025
            </TableCell>
            <TableCell align="right" sx={{ bgcolor: '#F9FAFB', fontWeight: 500, color: '#6B7280', fontSize: 12 }}>
              Mar 2025
            </TableCell>
            <TableCell align="right" sx={{ bgcolor: '#F9FAFB', fontWeight: 500, color: '#6B7280', fontSize: 12 }}>
              Apr 2025
            </TableCell>
            <TableCell align="right" sx={{ bgcolor: '#F0FDF4', fontWeight: 500, color: '#22C55E', fontSize: 12 }}>
              May 2025
            </TableCell>
            <TableCell align="center" sx={{ bgcolor: '#F9FAFB', fontWeight: 500, color: '#6B7280', fontSize: 12 }}>
              Δ
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {incomeData.map((row) => (
            <CategoryRow key={row.id} row={row} level={0} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default IncomeStatementTable;
