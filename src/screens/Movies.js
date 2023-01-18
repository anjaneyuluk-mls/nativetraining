/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Fragment, useEffect, useState } from 'react';
import {
  ActivityIndicator,
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
import { getBaseUrl } from '../services/api';

const Movies = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [data, setData] = useState(null);
  const [refreshing, setrefreshing] = useState(false);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const fetchMovies = async () => {
    setrefreshing(true);
    await axiosInstance
      .get('movies')
      .then((res) => setData(res.data.items.reverse()));
    setrefreshing(false);
  };
  useEffect(() => {
    fetchMovies();
  }, []);
  const renderItem = ({ item, index }) => {
    return (
      <Card key={item.id}>
        <Card.Title>{item.name}</Card.Title>
        <Card.Image
          style={{ padding: 0 }}
          source={{
            uri: item.image
              ? getBaseUrl() + '/' + item.image
              : 'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg',
          }}
        />
        <Card.Divider />
        <Text>Release date: {item.release_date}</Text>
        <Text> Is Hit ? {item.hit ? 'Yes' : 'No'}</Text>
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
        <View style={{ width: '100%' }}>
          <Text style={styles.title}>Favourite Movies </Text>
          {data ? (
            <FlatList
              refreshing={refreshing}
              onRefresh={fetchMovies}
              style={{ width: '100%' }}
              renderItem={renderItem}
              data={data}
            />
          ) : (
            <ActivityIndicator />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 150,
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

export default Movies;
