import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {colors} from '../assets/colors';
import {formatDateTime} from '../utils/DateTime';
import {windowWidth} from '../utils/Dimession';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FormatPrice from '../utils/Price';

const History = () => {
  const navigation = useNavigation();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [phone, setPhone] = useState('');

  useFocusEffect(
    useCallback(() => {
      const user = auth().currentUser;

      if (user) {
        setUserLoggedIn(true);
        firestore()
          .collection('TblBill')
          .where('userID', '==', user.uid)
          .orderBy('createdAt', 'desc')
          .get()
          .then(querySnapshot => {
            const orderData = [];
            querySnapshot.forEach(doc => {
              const data = doc.data();
              orderData.push(data);
            });
            setOrders(orderData);
            setLoading(false);
          })
          .catch(error => {
            console.error('Error fetching order data:', error);
            setLoading(false);
          });
      } else {
        setUserLoggedIn(false);
        setLoading(false);
      }
    }, []),
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lịch sử đặt hàng</Text>

      {!userLoggedIn ? (
        <View style={styles.loginNotice}>
          <Text style={styles.noticeText}>Bạn cần </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.linkText}>đăng nhập </Text>
          </TouchableOpacity>
          <Text style={styles.noticeText}>để xem lịch sử mua hàng</Text>
        </View>
      ) : loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : orders.length > 0 ? (
        <FlatList
          data={orders.slice(0, 3)}
          keyExtractor={item => `${item.orderId}-${item.createdAt}`}
          renderItem={({item}) => {
            const formattedPrice = FormatPrice(item.totalPrice);
            return (
              <View style={styles.orderItem}>
                <View style={styles.imageBox}>
                  <Image
                    source={require('../assets/images/shipping.png')}
                    style={styles.image}
                  />
                </View>
                <View
                  style={{
                    width: windowWidth * 0.8,
                  }}>
                  <Text>{formatDateTime(item.createdAt)}</Text>
                  <Text style={styles.refText}>{item.address}</Text>
                  <Text style={styles.refText}>
                    {item.menuitem && Array.isArray(item.menuitem)
                      ? item.menuitem.join(', ')
                      : item.menuitem}
                  </Text>
                  <Text style={{fontWeight: 'bold'}}>{formattedPrice}đ</Text>
                </View>
              </View>
            );
          }}
        />
      ) : (
        <View style={styles.emptyNotice}>
          <Text style={styles.emptyText}>Bạn chưa có đơn nào</Text>
        </View>
      )}
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  noticeText: {
    fontSize: 13,
    fontStyle: 'italic',
    alignSelf: 'center',
  },
  imageBox: {
    width: 50,
    height: 50,
    backgroundColor: 'white',
    marginRight: 10,
    padding: 5,
  },
  loginNotice: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  linkText: {
    fontSize: 13,
    fontStyle: 'italic',
    color: colors.green1,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  refText: {
    fontSize: 11,
    color: 'gray',
  },
  reOrder: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.green1,
    borderRadius: 20,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  reOrderText: {
    fontSize: 13,
    marginRight: 5,
    color: colors.green1,
  },
});
