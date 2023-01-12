import { Button } from '@rneui/base';
import React, { useState } from 'react';
import { View, Text } from 'react-native';

export const Counter = () => {
  let [count, setCount] = useState(0);
  const increase = () => {
    count = count + 1;
    setCount(count);
    console.log({ count });
  };
  return (
    <View>
      <Text>{count}</Text>
      <Button onPress={increase}>increment</Button>
    </View>
  );
};
