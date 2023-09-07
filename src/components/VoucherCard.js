import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React from 'react';
import {windowWidth} from '../utils/Dimession';

const VoucherCard = () => {
  return (
    <View>
      <Text style={styles.heading}>Sẵn sàng sử dụng</Text>
      <TouchableOpacity activeOpacity={1} style={styles.card}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.voucherImage}>
            <Image
              source={require('../assets/images/Logo-Cong-Ca-Phe.webp')}
              style={styles.image}
            />
          </View>

          <View style={styles.cardTitle}>
            <Text style={{fontSize: 15}}>
              Sed architecto sit saepe ut quia quam neque eveniet ut. Deserunt
              hic rerum nihil.{' '}
            </Text>
            <Text style={{fontSize: 14, color: 'gray'}}>Validation</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default VoucherCard;

const styles = StyleSheet.create({
  heading: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
  },
  card: {
    marginTop: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    width: windowWidth - 30,
  },
  voucherImage: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  cardTitle: {
    justifyContent: 'space-between',
    width: windowWidth - 130,
  },
});
