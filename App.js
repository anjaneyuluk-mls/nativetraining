import { createTheme, ThemeProvider } from '@rneui/themed';
import * as React from 'react';
import StackNavigator from './src/navigators/StackNavigation';

const theme = createTheme({
  components: {
    Button: {
      raised: true,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <StackNavigator />
    </ThemeProvider>
  );
}

export default App;
