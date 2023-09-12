import {
  View,
  Text,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../assets/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

const QuickBar = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.box}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => navigation.navigate('Points')}>
        <View style={styles.groupAccess}>
          <View style={styles.roundBox}>
            <MaterialCommunityIcons
              name="barcode-scan"
              size={30}
              color="#1f6f23"
            />
          </View>
          <Text style={styles.text}>Tích điểm</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={1}>
        <View style={styles.groupAccess}>
          <View style={styles.roundBox}>
            <MaterialCommunityIcons
              name="crown-outline"
              size={30}
              color="#1f6f23"
            />
          </View>
          <Text style={styles.text}>Đổi thưởng</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={1}>
        <View style={styles.groupAccess}>
          <View style={styles.roundBox}>
            <MaterialCommunityIcons
              name="bike-fast"
              size={30}
              color="#1f6f23"
            />
          </View>
          <Text style={styles.text}>Đặt hàng</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={1}>
        <View style={styles.groupAccess}>
          <View style={styles.roundBox}>
            <MaterialCommunityIcons
              name="phone-in-talk-outline"
              size={30}
              color="#1f6f23"
            />
          </View>
          <Text style={styles.text}>Liên hệ</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default QuickBar;

const styles = StyleSheet.create({
  box: {
    marginTop: 20,
    backgroundColor: colors.white,
    paddingVertical: 10,
    borderRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderColor: 'gray',
  },
  groupAccess: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
  },
  roundBox: {
    backgroundColor: colors.lightGreen,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 5,
    fontSize: 12,
  },
});
