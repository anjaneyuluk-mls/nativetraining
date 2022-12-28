/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import List from './screens/List';
import {ThemeProvider, createTheme} from '@rneui/themed';
import {Button} from '@rneui/base';

const theme = createTheme({
  lightColors: {
    primary: '#e7e7e8',
  },
  darkColors: {
    primary: '#000',
  },
  mode: 'light',
});
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <List />
    </ThemeProvider>
  );
};

export default App;
