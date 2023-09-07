import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import {useNavigation} from '@react-navigation/native';
import VoucherCard from '../components/VoucherCard';

const Voucher = () => {
  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
      <VoucherCard />
    </View>
  )
}

export default Voucher
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    // backgroundColor: 'white',
    flex: 1,
  },
})