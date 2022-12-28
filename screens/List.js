/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Fragment, useEffect, useState} from 'react';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import {Text, Card, Button, Icon} from '@rneui/themed';
import {Colors, Header} from 'react-native/Libraries/NewAppScreen';
import { SafeAreaView } from 'react-native-safe-area-context';

const List = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [data, setData] = useState(null);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    fetch('http://10.0.2.2:3600/movies')
      .catch(err => console.log(err))
      .then(res => res.json())
      .then(data => setData(data.items));
  }, []);
  const renderItem = ({item, index}) => {
    console.log(item);
    return (
      <Card key={item.id}>
        <Card.Title>{item.name}</Card.Title>
        <Card.Divider />
        <Text>{item.release_date}</Text>
        <Text>{item.hit}</Text>
      </Card>
    );
  };
  return (
    <SafeAreaView style={backgroundStyle}>
      {/* <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      /> */}
      <View style={styles.container}>
        {data ? (
          <FlatList
            style={{width: '100%'}}
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
    marginTop: 20,
    padding: 12,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
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

export default List;
