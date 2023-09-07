import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const History = () => {
  const navigation = useNavigation();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    const user = auth().currentUser;

    if (user) {
      setUserLoggedIn(true);

      const fetchOrders = async () => {
        try {
          const ordersRef = firestore()
            .collection('TblBill')
            .where('uid', '==', user.uid);
          const querySnapshot = await ordersRef.get();

          if (!querySnapshot.empty) {
            const userOrders = [];
            querySnapshot.forEach(documentSnapshot => {
              const orderData = documentSnapshot.data();
              userOrders.push(orderData);
            });
            setOrders(userOrders);
          } else {
            setOrders([]);
          }
        } catch (error) {
          console.error('Error fetching user orders:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchOrders();
    } else {
      setUserLoggedIn(false);
      setLoading(false);
    }
  }, []);

  return (
    <View style={{marginTop: 20}}>
      <FlatList
        data={orders}
        keyExtractor={item => item.orderId}
        renderItem={({item}) => (
          <View></View>
        )}
      />

      <Text style={{fontSize: 16, fontWeight: 'bold', marginTop: 20}}>
        Bạn có muốn đặt lại đơn
      </Text>
      {loading && <Text>Loading...</Text>}
      {!userLoggedIn && (
        <View style={{marginTop: 20}}>
          <Text
            style={styles.noticeText}>
            Bạn cần đăng nhập để xem lịch sử mua hàng
          </Text>
        </View>
      )}
      {userLoggedIn && orders.length === 0 && (
        <View style={{marginTop: 20}}>
          <Text style={styles.noticeText}>
            Bạn chưa có đơn nào
          </Text>
        </View>
      )}
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
  noticeText: {
    fontSize: 13, fontStyle: 'italic', alignSelf: 'center'
  }
});