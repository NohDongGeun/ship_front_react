import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#3A98DA',
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: `
              #__next {
                display: flex;
                min-height: 100vh;
              }
            `,
        },
        MuiFormControl: {
            styleOverrides: {
                root: {
                    height: '36px',
                },
            },
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    fontSize: 14,
                    height: '36px',
                },
                input: {
                    height: '36px',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    fontSize: 12,
                },
            },
        },
    },
    typography: {
        fontFamily: 'Apple SD Gothic Neo,sans-serif', // 원하는 폰트 패밀리로 변경
    },
});
