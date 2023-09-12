import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../assets/colors';

const VoucherIcon = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => navigation.navigate('Tab4')}>
      <View style={styles.voucherBox}>
        <MaterialCommunityIcons
          name="ticket-confirmation-outline"
          size={20}
          color="green"
        />
        <Text style={{fontWeight: 'bold', marginLeft: 5}}>3</Text>
      </View>
    </TouchableOpacity>
  );
};

export default VoucherIcon;

const styles = StyleSheet.create({
  voucherBox: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    borderRadius: 50,
    paddingVertical: 9,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    elevation: 5,
  },
});
