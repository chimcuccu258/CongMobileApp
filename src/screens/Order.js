import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import firestore from '@react-native-firebase/firestore';
import {colors} from '../assets/colors';
import {windowHeight, windowWidth} from '../utils/Dimession';
import ItemCard from '../components/ItemCard';
import menu from '../assets/menu';
import CartModal from '../components/CartModal';

const formatPrice = price => {
  return new Intl.NumberFormat('vi-VN', {
    currency: 'VND',
    minimumFractionDigits: 0,
  }).format(price);
};

const Order = () => {
  const [chosenCategory, setChosenCategory] = useState(null);
  const [categoryMap, setCategoryMap] = useState({});
  const scrollViewRef = useRef(null);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [isCartVisible, setIsCartVisible] = useState(false);

  useEffect(() => {
    firestore()
      .collection('TblCategory')
      .orderBy('Position', 'asc')
      .get()
      .then(querySnapshot => {
        const categoryData = {};
        querySnapshot.forEach(doc => {
          categoryData[doc.id] = doc.data().CategoryName;
        });
        setCategoryMap(categoryData);
      })
      .catch(error => {
        console.error('Error fetching CategoryName data:', error);
      });
  }, []);

  useEffect(() => {
    if (chosenCategory) {
      const selectedIndex = Object.values(categoryMap).indexOf(chosenCategory);
      const scrollPosition = selectedIndex * 600 - windowHeight * 0.4;
      if (scrollViewRef.current && scrollViewRef.current.scrollTo) {
        scrollViewRef.current.scrollTo({
          y: scrollPosition,
          animated: true,
        });
      }
    }
  }, [chosenCategory, categoryMap]);

  const handleCategoryPress = item => {
    setChosenCategory(item);
  };

  const addToCart = (menuItem, price, image) => {
    const existingItemIndex = cart.findIndex(
      item => item.menuItem === menuItem,
    );

    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity++;
      updatedCart[existingItemIndex].totalPrice += price;
      setCart(updatedCart);
    } else {
      const newItem = {
        menuItem,
        quantity: 1,
        totalPrice: price,
        image,
      };
      setCart([...cart, newItem]);
    }
    setShowCart(true);
  };

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <>
      <View style={styles.container}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={Object.values(categoryMap)}
          style={styles.categoryList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => handleCategoryPress(item)}>
              <View
                style={[
                  styles.categoryItem,
                  {
                    backgroundColor:
                      chosenCategory === item ? colors.primary : 'transparent',
                    borderWidth: 1,
                    borderColor:
                      chosenCategory === item ? colors.primary : colors.outline,
                  },
                ]}>
                <Text
                  style={[
                    styles.categoryText,
                    {
                      color: chosenCategory === item ? 'white' : colors.primary,
                    },
                  ]}>
                  {item}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      <ScrollView
        style={styles.menu}
        showsVerticalScrollIndicator={false}
        ref={scrollViewRef}>
        {Object.keys(categoryMap).map(categoryID => (
          <View key={categoryID}>
            <Text style={styles.categoryHeader}>{categoryMap[categoryID]}</Text>
            {menu
              .filter(item => item.categoryID === categoryID)
              .map(item => (
                <ItemCard key={item.id} id={item.id} addToCart={addToCart} />
              ))}
          </View>
        ))}
      </ScrollView>

      {showCart && (
        <View style={styles.cart}>
          <TouchableOpacity
            activeOpacity={1}
            style={{flexDirection: 'row'}}
            onPress={() => setIsCartVisible(true)}>
            <View style={styles.quantity}>
              <Text style={styles.quantityText}>{totalQuantity}</Text>
            </View>
            <View style={styles.price}>
              <Text style={styles.priceText}>{formatPrice(totalPrice)}đ</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
      <CartModal
        visible={isCartVisible}
        onClose={() => setIsCartVisible(false)}
        cartItems={cart}
        totalQuantity={totalQuantity}
        totalPrice={totalPrice}
      />
    </>
  );
};

export default Order;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  categoryList: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  categoryItem: {
    marginRight: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  categoryHeader: {
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 15,
    marginLeft: 10,
  },
  menu: {
    paddingHorizontal: 5,
    backgroundColor: 'white',
  },
  cart: {
    position: 'absolute',
    backgroundColor: colors.green1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    bottom: 10,
    right: 50,
  },
  quantityText: {
    color: 'black',
  },
  quantity: {
    backgroundColor: 'white',
    borderRadius: 50,
    paddingHorizontal: 6,
    paddingVertical: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  priceText: {
    color: 'white',
  },
  price: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
