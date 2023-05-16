import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme({
  palette: {
    primary: {
      light: '#106470',
      main: '#000000'
    },
    secondary: {
      light: '#f7f8fa',
      main: '#f4f4f4'
    }
  },
  typography: {
    h6: {
      fontWeight: '700',
      fontSize: '1.2rem'
    },
    h5: {
      fontWeight: '700',
      fontSize: '1.5rem'
    },
    h4: {
      fontWeight: '700',
      fontSize: '2rem'
    },
    h3: {
      fontWeight: '700',
      fontSize: '2.5rem'
    },
    body1: {
      fontSize: 22,
    },
    body2: {
      fontSize: 18,
    }
  },
  spacing: 10
});

theme = responsiveFontSizes(theme, {
  breakpoints: ['xs', 'sm', 'md', 'lg'],
  factor: 3,
  disableAlign: true
});

export default theme;
