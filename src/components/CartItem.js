import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { colors } from '../assets/colors';

const formatPrice = price => {
  return new Intl.NumberFormat('vi-VN', {
    currency: 'VND',
    minimumFractionDigits: 0,
  }).format(price);
};

const CartItem = ({ item, onIncrease, onDecrease, onDelete }) => {
  return (
    <View key={item.menuItem} style={styles.cartItem}>
      <View style={styles.cartList}>
        <Image source={item.image} style={styles.itemImage} />
        <View style={{ justifyContent: 'space-between' }}>
          <Text style={{ fontWeight: 'bold' }}>{item.menuItem}</Text>
          <View style={styles.quantityControls}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => onDecrease(item)}
              style={styles.quantityButton}
            >
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{item.quantity}</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => onIncrease(item)}
              style={styles.quantityButton}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Text>{formatPrice(item.totalPrice)}đ</Text>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => onDelete(item)}
        style={styles.deleteButton}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    marginTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cartList: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemImage: {
    width: 70,
    height: 70,
    borderRadius: 5,
    marginRight: 10,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  quantityButtonText: {
    fontSize: 20,
    color: 'white',
  },
  quantityText: {
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: colors.error,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  deleteButtonText: {
    color: 'white',
  },
});

export default CartItem;
