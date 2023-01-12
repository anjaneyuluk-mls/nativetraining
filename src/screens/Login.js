import React, { useEffect } from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  BackHandler,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { axiosInstance } from '../services/axios';
import AsyncStorage from '@react-native-community/async-storage';
import styled from 'styled-components';
import { Input } from '@rneui/base';

const Container = styled.View`
  flex: 1;
  background-color: white;
  align-items: center;
  justify-content: center;
`;
export default function Login({ navigation }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });
  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to go back?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        { text: 'YES', onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  const onSubmit = (data) => {
    console.log({ data });
    axiosInstance.post('signIn', data).then((res) => {
      AsyncStorage.setItem('token', res.data.token);
      navigation.navigate('List');
    });
  };

  return (
    <Container>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            style={styles.input}
            onBlur={onBlur}
            placeholder="username"
            onChangeText={onChange}
            value={value}
            leftIcon={{ type: 'font-awesome', name: 'user' }}
          />
        )}
        name="username"
      />
      {errors.firstName && <Text>This is required.</Text>}

      <Controller
        control={control}
        rules={{
          maxLength: 100,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            style={styles.input}
            onBlur={onBlur}
            placeholder="password"
            leftIcon={{ type: 'font-awesome', name: 'lock' }}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="password"
      />

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </Container>
  );
}

const styles = StyleSheet.create({
  input: {
    // color: 'black',
  },
});
