/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  Text,
  View,
} from 'react-native';
import {Colors, Header} from 'react-native/Libraries/NewAppScreen';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [data, setData] = useState(null);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    fetch('http://10.0.2.2:3600/movies')
      .catch(err => console.log(err))
      .then(res => res.json())
      .then(data => setData(data));
  }, []);
  const renderItem = ({item, index}) => {
    console.log(item);
    return <Text key={index}> {item} </Text>;
  };
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.container}>
        {data ? (
          <FlatList
            ListHeaderComponent={() => <Text style={styles.title}>Movies</Text>}
            renderItem={renderItem}
            data={data}
          />
        ) : (
          <Text>loading</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 120,
    padding: 12,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  title: {
    fontSize: 36,
  },
});

export default App;
