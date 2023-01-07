/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Fragment, useEffect, useState } from 'react';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import { Text, Card, Button, Icon } from '@rneui/themed';
import { Colors, Header } from 'react-native/Libraries/NewAppScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input } from '@rneui/base';
import { axiosInstance } from '../services/axios';

const List = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [data, setData] = useState(null);
  const [name, setName] = useState('');
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const fetchMovies = () => {
    axiosInstance
      .get('http://10.0.2.2:3600/movies')
      .then((res) => setData(res.data.items));
  };
  useEffect(() => {
    fetchMovies();
  }, []);
  const renderItem = ({ item, index }) => {
    return (
      <Card key={item.id}>
        <Card.Title>{item.name}</Card.Title>
        <Card.Divider />
        <Text>{item.release_date}</Text>
        <Text>{item.hit}</Text>
      </Card>
    );
  };
  const add = async () => {
    const data = { name: name };
    await axiosInstance.post('movie', data);
    fetchMovies();
  };
  return (
    <SafeAreaView style={backgroundStyle}>
      {/* <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      /> */}
      <View style={styles.container}>
        <View style={{ width: '100%', height: 120 }}>
          <Input placeholder="type name" onChangeText={setName} />
          <Button style={{ width: 80 }} onPress={add}>
            add
          </Button>
        </View>
        <View style={{ width: '100%', flex: 1 }}>
          {data ? (
            <FlatList
              style={{ width: '100%' }}
              ListHeaderComponent={() => (
                <Text style={styles.title}>Movies</Text>
              )}
              renderItem={renderItem}
              data={data}
            />
          ) : (
            <Text>loading</Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 12,
    marginBottom: 200,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
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
