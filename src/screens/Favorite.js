import {View, Text} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const Favorite = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Favorite</Text>
    </View>
  );
};

export default Favorite;
