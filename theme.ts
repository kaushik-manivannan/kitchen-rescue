import { GridColumnHeadersProps } from './node_modules/@mui/x-data-grid/components/GridColumnHeaders.d';
'use client';

import { createTheme, Theme } from '@mui/material/styles';
import type {} from '@mui/x-data-grid/themeAugmentation';

const theme: Theme = createTheme({
    palette: {
        primary: {
            main: '#2B2E4A',
        },
        secondary: {
            main: '#6EACDA',
        },
        error: {
            main: '#FF4C4C',
        },
        background: {
            default: '#2B2E4A',
        },
    },
    components: {
        MuiDataGrid: {
          styleOverrides: {
            root: {
            },
            columnHeaderTitle: {
            },
          },
        },
      },
});

export default theme;