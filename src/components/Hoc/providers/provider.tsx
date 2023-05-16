import { Provider } from 'react-redux';
import { store } from '../../../app/store';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../../theme/theme';

type ProvidersProps = {
  children: any;
};

function Providers({ children }: ProvidersProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Provider>
  );
}

export default Providers;
