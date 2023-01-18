import React, { useState } from 'react';
import styled from 'styled-components';
import { Text, View, Button, Alert, ActivityIndicator } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { CheckBox, Input } from '@rneui/themed';
import { axiosInstance } from '../services/axios';
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isInProgress,
  types,
} from 'react-native-document-picker';

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
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      console.log(key, data[key]);
      formData.append(key, data[key]);
    });
    axiosInstance({
      url: 'movie',
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    }).then((res) => {
      setLoading(false);
      navigation.navigate('Movies');
    });
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
            name="hit"
          />
          <Controller
            control={control}
            rules={{
              maxLength: 100,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Button
                title="open picker for single file selection"
                onPress={async () => {
                  try {
                    const pickerResult = await DocumentPicker.pickSingle({
                      presentationStyle: 'fullScreen',
                      copyTo: 'cachesDirectory',
                    });
                    onChange(pickerResult);
                  } catch (e) {}
                }}
              />
            )}
            name="image"
          />

          <Button title="Submit" onPress={handleSubmit(onSubmit)} />
        </View>
      )}
    </Container>
  );
}
