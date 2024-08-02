'use client';

import { createTheme, Theme } from '@mui/material/styles';
import type {} from '@mui/x-data-grid/themeAugmentation';

const theme: Theme = createTheme({
    palette: {
        primary: {
            main: '#3D392A',
        },
        secondary: {
            main: '#C05F3D',
            dark: '#753A25',
            light: '#DAA08B'
        },
        error: {
            main: '#FF4C4C',
        },
        background: {
            default: '#EEEDE3',
        },
    },
    components: {
        MuiContainer: {
          styleOverrides: {
            root: {
                minWidth: '100vw'
            },
          },
        },
        MuiFormHelperText:{
            styleOverrides: {
                root: {
                    marginTop: '12px'
                },
            },
        },
      },
});

export default theme;