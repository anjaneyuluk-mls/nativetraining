import React, { useState } from 'react';
import styled from 'styled-components';
import { Text, View, Button, Alert, ActivityIndicator } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { CheckBox, Input } from '@rneui/themed';
import { axiosInstance } from '../services/axios';

const Container = styled.View`
  padding: 7px;
`;

export default function NewMovie({ navigation }) {
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      hit: true,
    },
  });
  const onSubmit = async (data) => {
    setLoading(true);
    console.log({ data });
    await axiosInstance.post('movie', data);
    setLoading(false);
    navigation.navigate('Movies');
  };

  return (
    <Container>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="name"
              />
            )}
            name="name"
          />
          {errors.name && <Text>This is required.</Text>}

          <Controller
            control={control}
            rules={{
              maxLength: 100,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CheckBox
                center
                title="hit"
                checked={value}
                onPress={() => onChange(!value)}
              />
            )}
            name="lastName"
          />

          <Button title="Submit" onPress={handleSubmit(onSubmit)} />
        </View>
      )}
    </Container>
  );
}
