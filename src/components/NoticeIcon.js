import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../assets/colors';

const NoticeIcon = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity activeOpacity={0.5}>
      <View style={styles.iconBox}>
        <MaterialCommunityIcons name="bell-outline" size={20} color="green" />
        <View style={styles.numberNotice}>
          <Text style={{color: colors.white, fontWeight: 'bold'}}>30</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default NoticeIcon;

const styles = StyleSheet.create({
  iconBox: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    borderRadius: 50,
    paddingVertical: 9,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    elevation: 5,
  },
  numberNotice: {
    position: 'absolute',
    top: -5,
    right: -5,
    paddingVertical: 2,
    paddingHorizontal: 2,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
});
