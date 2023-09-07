import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import WeatherIcon from '../components/WeatherIcon';
import Carousel from '../components/Carousel';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import VoucherIcon from '../components/VoucherIcon';
import NoticeIcon from '../components/NoticeIcon';
import QuickBar from '../components/QuickBar';
import History from '../components/History';
import {windowHeight} from '../utils/Dimession';

const Home = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState(null);
  const [rank, setRank] = useState(null);

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
          }
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    } else {
      setUsername(null);
    }
  }, []);

  const greetingMessage = username ? `Chào, ${username}` : 'Chào bạn';

  return (
    <SafeAreaView style={{backgroundColor: 'white'}}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <WeatherIcon />
          <Text style={{fontSize: 16, marginLeft: 5}}>{greetingMessage}</Text>
        </View>
        <View style={styles.headerRight}>
          <VoucherIcon />
          <NoticeIcon />
        </View>
      </View>
      <View style={styles.container}>
        <FlatList
          style={{
            marginBottom: windowHeight * 0.06,
          }}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => (
            <>
              <QuickBar />
            </>
          )}
          ListEmptyComponent={() => (
            <>
              <History />
              <Carousel />
              <Carousel />
              <Carousel />
              <Carousel />
              <Carousel />
            </>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 3,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
  },
});
