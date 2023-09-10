import React, {useEffect, useState} from 'react';
import {
  Modal,
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  Alert,
  TextInput,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {windowHeight, windowWidth} from '../utils/Dimession';
import {colors} from '../assets/colors';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import formatPrice from './FormatPrice';

const CartModal = ({
  visible,
  onClose,
  cartItems,
  totalQuantity,
  totalPrice,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [address, setAddress] = useState('');

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  const visibleItems = expanded ? cartItems : cartItems.slice(0, 3);

  const placeOrder = async () => {
    try {
      const user = auth().currentUser;

      if (!user) {
        Alert.alert('OOPS 🌝', 'Bạn cần đăng nhập để đặt hàng.');
        return;
      }

      const db = firestore();
      const orderDate = firestore.FieldValue.serverTimestamp();

      const orderData = {
        userID: user.uid,
        address: address,
        menuitem: cartItems.map(item => item.menuItem),
        itemPrice: cartItems.map(item => item.totalPrice),
        quantity: cartItems.map(item => item.quantity),
        totalQuantity,
        totalPrice,
        createdAt: orderDate,
      };

      await db.collection('TblBill').add(orderData);

      onClose();
      clearCart();
      Alert.alert('Thành công 🎉', 'Đơn hàng của bạn đã được đặt.');
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  const shippingFee = 20000;

  const grandTotal = totalPrice + shippingFee;

  const [username, setUsername] = useState(null);
  const [phone, setPhone] = useState(null);

  useEffect(() => {
    const user = auth().currentUser;

    if (user) {
      firestore()
        .collection('TblUsers')
        .doc(user.uid)
        .get()
        .then(documentSnapshot => {
          if (documentSnapshot.exists) {
            const userData = documentSnapshot.data();
            const fetchedUsername = userData.username;
            setUsername(fetchedUsername);
            const phone = userData.phone;
            setPhone(phone);
          }
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, []);

  return (
    <Modal
      animationType="slide"
      presentationStyle="formSheet"
      visible={visible}
      onRequestClose={onClose}>
      <View>
        <View style={styles.modalHeader}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={clearCart}
            style={styles.headerCorner}>
            <Text style={{fontSize: 16}}>Xoá</Text>
          </TouchableOpacity>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            Xác nhận đơn hàng
          </Text>
          <MaterialCommunityIcons
            name="close"
            size={24}
            onPress={onClose}
            style={{
              position: 'absolute',
              paddingTop: 20,
              right: 20,
            }}
          />
        </View>
        <View style={styles.modalContent}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.rowHeader}>Địa chỉ giao hàng</Text>
            <Text>Thông tin người nhận: </Text>
            <View style={{flexDirection: 'row', paddingVertical: 10}}>
              <Text style={{marginRight: 20}}>{username}</Text>
              <Text>{phone}</Text>
            </View>
            <Text>Địa chỉ người nhận: </Text>
            <View style={{paddingVertical: 10}}>
            <TextInput
              onChangeText={text => setAddress(text)}
              value={address}
              placeholder="Nhập địa chỉ giao hàng"
            />
            </View>
            
            <Text style={styles.rowHeader}>Sản phẩm đã chọn</Text>
            {visibleItems.map((item, index) => (
              <View key={index} style={styles.cartItem}>
                <View style={styles.cartList}>
                  <Image source={item.image} style={styles.itemImage} />
                  <View style={{justifyContent: 'space-between'}}>
                    <Text style={{fontWeight: 'bold'}}>{item.menuItem}</Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: windowWidth * 0.2,
                      }}>
                      <TouchableOpacity
                        activeOpacity={1}
                        style={styles.updateCartBtn}
                        onPress={() => decreaseItemQuantity(item.menuItem)}>
                        <MaterialCommunityIcons
                          name="minus"
                          size={18}
                          color="white"
                        />
                      </TouchableOpacity>
                      <Text>{item.quantity}</Text>
                      <TouchableOpacity
                        activeOpacity={1}
                        style={styles.updateCartBtn}
                        onPress={() => increaseItemQuantity(item.menuItem)}>
                        <MaterialCommunityIcons
                          name="plus"
                          size={18}
                          color="white"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <Text>{formatPrice(item.totalPrice)}đ</Text>
              </View>
            ))}
            {cartItems.length > 3 && (
              <TouchableOpacity onPress={toggleExpansion}>
                {expanded ? (
                  <View style={styles.toggleText}>
                    <MaterialCommunityIcons name="chevron-up" size={26} />
                    <Text>Rút gọn</Text>
                  </View>
                ) : (
                  <View style={styles.toggleText}>
                    <MaterialCommunityIcons name="chevron-down" size={26} />
                    <Text>Xem thêm đơn hàng</Text>
                  </View>
                )}
              </TouchableOpacity>
            )}
            <Text style={styles.rowHeader}>Tổng cộng</Text>
            <View>
              <View style={styles.summaryRow}>
                <Text style={{fontSize: 15}}>Thành tiền:</Text>
                <Text style={{fontSize: 15}}>{formatPrice(totalPrice)}đ</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={{fontSize: 15}}>Phí vận chuyển:</Text>
                <Text style={{fontSize: 15}}>{formatPrice(shippingFee)}đ</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                  Số tiền thanh toán:
                </Text>
                <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                  {formatPrice(grandTotal)}đ
                </Text>
              </View>
            </View>
            <Text style={styles.rowHeader}>Thanh toán</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <FontAwesome name="money" size={24} color="green" />
              <Text style={{marginLeft: 10}}>Thanh toán khi nhận hàng</Text>
            </View>
          </ScrollView>
        </View>
        <View style={styles.bottomBar}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <View style={styles.bottomLeft}>
                <Text style={styles.bottomLeftText}>Giỏ hàng: </Text>
                <Text style={styles.bottomLeftText}>
                  {totalQuantity} sản phẩm
                </Text>
              </View>
              <Text style={styles.bottomPrice}>{formatPrice(grandTotal)}đ</Text>
            </View>
            <TouchableOpacity
              activeOpacity={1}
              style={styles.ordBtn}
              onPress={placeOrder}>
              <Text style={{fontSize: 16, fontWeight: '600'}}>Đặt hàng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CartModal;

const styles = StyleSheet.create({
  modalContent: {
    marginTop: 20,
    paddingHorizontal: 20,
    height: windowHeight * 0.76,
  },
  headerCorner: {
    position: 'absolute',
    paddingTop: 20,
    left: 20,
  },
  modalHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  cartItem: {
    marginTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemImage: {
    width: 70,
    height: 70,
    borderRadius: 5,
    marginRight: 10,
  },
  toggleText: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 15,
    width: windowWidth * 0.9,
  },
  cartList: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  bottomBar: {
    backgroundColor: colors.green1,
    height: windowHeight * 0.12,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  bottomLeft: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: windowWidth * 0.35,
    marginBottom: 5,
  },
  bottomLeftText: {
    color: 'white',
    fontSize: 16,
  },
  bottomPrice: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  ordBtn: {
    backgroundColor: 'white',
    width: windowWidth * 0.3,
    height: windowHeight * 0.04,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 5,
  },
  updateCartBtn: {
    backgroundColor: colors.green1,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
});
