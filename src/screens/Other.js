import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {windowHeight, windowWidth} from '../utils/Dimession';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../assets/colors';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const Other = () => {
  const navigate = useNavigation();
  const touchLogout = () => {
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out!');
        navigate.navigate('Login');
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={{fontWeight: 'bold', fontSize: 18}}>Tiện ích</Text>
        <View style={styles.row1}>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.card1}
            onPress={() => navigate.navigate('OrderHistory')}>
            <Ionicons
              name="file-tray-stacked-outline"
              size={26}
              color={colors.green1}
            />
            <Text style={{fontWeight: 'bold', marginTop: 10}}>Đặt hàng</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.group}>
        <Text style={{fontWeight: 'bold', fontSize: 18, marginBottom: 10}}>
          Hỗ trợ
        </Text>
        <TouchableOpacity activeOpacity={1} style={styles.groupDetailTop}>
          <Ionicons name="star-outline" size={20} />
          <Text style={{fontSize: 15, marginLeft: 5}}>Đánh giá đơn hàng</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={1} style={styles.groupDetailBottom}>
          <Ionicons name="recording-outline" size={20} />
          <Text style={{fontSize: 15, marginLeft: 5}}>Liên hệ và góp ý</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.group}>
        <Text style={{fontWeight: 'bold', fontSize: 18, marginBottom: 10}}>
          Tài khoản
        </Text>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.groupDetailTop}
          onPress={() => navigate.navigate('Info')}>
          <Ionicons name="person-outline" size={20} />
          <Text style={{fontSize: 15, marginLeft: 5}}>Thông tin cá nhân</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={1} style={styles.groupDetail}>
          <Ionicons name="settings-outline" size={20} />
          <Text style={{fontSize: 15, marginLeft: 5}}>Cài đặt</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.groupDetailBottom}
          onPress={touchLogout}>
          <Ionicons name="log-out-outline" size={20} />
          <Text style={{fontSize: 15, marginLeft: 5}}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Other;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 25,
  },
  group: {
    marginTop: 25,
  },
  row1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  card1: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    width: windowWidth * 0.46,
    height: windowHeight * 0.08,
  },
  groupDetailTop: {
    backgroundColor: 'white',
    padding: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    width: windowWidth - 30,
    height: windowHeight * 0.05,
    alignItems: 'center',
    flexDirection: 'row',
  },
  groupDetail: {
    backgroundColor: 'white',
    padding: 10,
    width: windowWidth - 30,
    height: windowHeight * 0.05,
    alignItems: 'center',
    flexDirection: 'row',
  },
  groupDetailBottom: {
    backgroundColor: 'white',
    padding: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    width: windowWidth - 30,
    height: windowHeight * 0.05,
    alignItems: 'center',
    flexDirection: 'row',
  },
});
