import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {windowWidth} from '../utils/Dimession';
import firestore from '@react-native-firebase/firestore';
import {colors} from '../assets/colors';
import menu from '../assets/menu';

const ItemCard = ({id, addToCart}) => {
  const [menuItem, setMenuItem] = useState([]);
  const [price, setPrice] = useState([]);
  const [itemImage, setItemImage] = useState(null);

  const formatPrice = price => {
    return new Intl.NumberFormat('vi-VN', {
      currency: 'VND',
      minimumFractionDigits: 0,
    }).format(price);
  };

  useEffect(() => {
    const menuData = menu.find(item => item.id === id);
    firestore()
      .collection('TblMenu')
      .doc(id)
      .get()
      .then(doc => {
        if (doc.exists) {
          const data = doc.data();
          setMenuItem(data.MenuItemName);
          setPrice(data.Price);
          setItemImage(menuData.image);
        } else {
          console.log(`Document with id ${id} does not exist.`);
        }
      })
      .catch(error => {
        console.error('Error fetching MenuItem data:', error);
      });
  }, [id]);

  const handleAddToCart = () => {
    addToCart(menuItem, price, itemImage);
  };

  return (
    <View>
      <TouchableOpacity activeOpacity={1} style={styles.itemCard}>
        <View style={styles.itemTitle}>
          <View style={styles.image}>
            {itemImage && <Image source={itemImage} style={styles.itemImage} />}
          </View>
          <View>
            <Text style={styles.itemName}>{menuItem}</Text>
            <Text style={styles.price}>{formatPrice(price)}đ</Text>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.cardBtn}
          onPress={handleAddToCart}>
          <Text style={{fontSize: 16, color: 'white'}}>+</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};

export default ItemCard;

const styles = StyleSheet.create({
  itemCard: {
    borderRadius: 5,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemTitle: {
    flexDirection: 'row',
    width: windowWidth - 60,
  },
  itemName: {
    fontWeight: 'bold',
    fontSize: 13,
  },
  price: {
    fontSize: 13,
    marginTop: 5,
  },
  image: {
    width: 80,
    height: 80,
    backgroundColor: 'pink',
    borderRadius: 5,
    marginRight: 10,
  },
  cardBtn: {
    backgroundColor: colors.primary,
    width: 30,
    height: 30,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemImage: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
});
