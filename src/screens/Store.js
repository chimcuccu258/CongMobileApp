import { View, Text, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, { useState } from 'react';
import { windowWidth } from '../utils/Dimession';
import { colors } from '../assets/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Store = () => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    console.log('Searching for:', searchText);
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <View style={styles.searchBar}>
          <MaterialCommunityIcons name='magnify' size={26} color={colors.gray} />
          <TextInput
            style={styles.searchInput}
            placeholder='Tìm kiếm'
            placeholderTextColor={colors.gray}
            onChangeText={(text) => setSearchText(text)}
            onSubmitEditing={handleSearch}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Store;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    backgroundColor: 'white',
    flex: 1,
  },
  searchBar: {
    marginTop: 10,
    backgroundColor: colors.lightGray,
    height: 45,
    width: windowWidth - 30,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderWidth: 0.3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: colors.black,
  },
});
