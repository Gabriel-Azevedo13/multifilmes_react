import { Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { store } from './store';
import { Router } from './routes';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const theme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <Container>
          <ToastContainer />
          <Router />
        </Container>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
