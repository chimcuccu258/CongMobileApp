import React, {useCallback, useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {colors} from '../assets/colors';
import formatPrice from '../components/FormatPrice';
import {formatDateTime} from '../utils/DateTime';
import {windowWidth} from '../utils/Dimession';

const OrderHistory = () => {
  const navigation = useNavigation();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const user = auth().currentUser;

      if (user) {
        setUserLoggedIn(true);
        firestore()
          .collection('TblBill')
          .orderBy('createdAt', 'desc')
          .get()
          .then(querySnapshot => {
            const orderData = querySnapshot.docs.map(doc => doc.data());
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
          data={orders}
          keyExtractor={item => `${item.orderId}-${item.createdAt}`}
          renderItem={({item}) => {
            const formattedPrice = formatPrice(item.totalPrice);
            return (
              <View style={styles.orderItem}>
                <View style={styles.imageBox}>
                  <Image
                    source={require('../assets/images/shipping.png')}
                    style={styles.image}
                  />
                </View>
                <View style={styles.cardContent}>
                  <View
                    style={{
                      width: windowWidth * 0.5,
                    }}>
                    <Text style={styles.refText}>
                      {item.menuitem && Array.isArray(item.menuitem)
                        ? item.menuitem.join(', ')
                        : item.menuitem}
                    </Text>
                    <Text style={styles.dateTime}>
                      {formatDateTime(item.createdAt)}
                    </Text>
                  </View>
                  <View>
                    <Text style={{fontWeight: 'bold'}}>{formattedPrice}đ</Text>
                  </View>
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

export default OrderHistory;

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
    marginBottom: 5,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowOffset: {width: 0, height: 0},
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: 0,
    elevation: 5,
  },
  refText: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
  },
  container: {
    paddingHorizontal: 10,
    marginTop: 10,
  },
  dateTime: {
    fontSize: 12,
    color: 'gray',
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: windowWidth * 0.75,
    alignItems: 'center',
  },
});
