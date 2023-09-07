import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {windowWidth} from '../utils/Dimession';

const Carousel = () => {
  const carouselData = [
    {
      id: 1,
      image: require('../assets/images/carousel/carousel_1.png'),
    },
    {
      id: 2,
      image: require('../assets/images/carousel/carousel_2.png'),
    },
    {
      id: 3,
      image: require('../assets/images/carousel/carousel_3.jpg'),
    },
    {
      id: 4,
      image: require('../assets/images/carousel/carousel_4.png'),
    },
    {
      id: 5,
      image: require('../assets/images/carousel/carousel_5.jpg'),
    },
  ];

  return (
    <View style={{marginTop: 20}}>
      <FlatList
        data={carouselData}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        pagingEnabled
        renderItem={({item}) => (
          <View>
            <TouchableOpacity
              activeOpacity={0.5}
              showsVerticalScrollIndicator={false}>
              <View style={styles.carouselView}>
                <Image source={item.image} style={styles.carouselImage} />
              </View>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  carouselView: {
    width: windowWidth - 20,
    height: 200,
    padding: 2,
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
});
