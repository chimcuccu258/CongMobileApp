import React, {useState} from 'react';
import {
  Modal,
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {windowHeight, windowWidth} from '../utils/Dimession';
import {colors} from '../assets/colors';

const formatPrice = price => {
  return new Intl.NumberFormat('vi-VN', {
    currency: 'VND',
    minimumFractionDigits: 0,
  }).format(price);
};

const CartModal = ({
  visible,
  onClose,
  cartItems,
  totalQuantity,
  totalPrice,
}) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  const visibleItems = expanded ? cartItems : cartItems.slice(0, 3);

  return (
    <Modal
      animationType="slide"
      presentationStyle="formSheet"
      visible={visible}
      onRequestClose={onClose}>
      <View>
        <View style={styles.modalHeader}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            Xác nhận đơn hàng
          </Text>
          <MaterialCommunityIcons
            name="close"
            size={24}
            onPress={onClose}
            style={{
              position: 'absolute',
              right: 20,
            }}
          />
        </View>
        <View style={styles.modalContent}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.rowHeader1}>Sản phẩm đã chọn</Text>
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
                      }}>
                      <TouchableOpacity
                        activeOpacity={1}
                        style={styles.updateCartBtn}
                        // onPress={() => decreaseItemQuantity(item.menuItem)}
                      >
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
                        // onPress={() => increaseItemQuantity(item.menuItem, item.totalPrice)}
                      >
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
              <Text style={styles.bottomPrice}>{formatPrice(totalPrice)}đ</Text>
            </View>
            <TouchableOpacity activeOpacity={1} style={styles.ordBtn}>
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
  modalHeader: {
    flexDirection: 'row',
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
    // color: 'blue',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowHeader1: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 10,
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
    // flexDirection: 'row',
    // justifyContent: 'space-between',
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
});
