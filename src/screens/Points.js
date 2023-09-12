import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Points = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [phone, setPhone] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      const user = auth().currentUser;

      if (user) {
        try {
          const querySnapshot = await firestore()
            .collection('TblUsers')
            .where('phone', '==', user.phoneNumber)
            .get();

          if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            setFirstName(userData.firstName);
            setLastName(userData.lastName);
            const phone = userData.phone;
            setPhone(phone);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    getUserData();
  }, []);

  const fullName = lastName + ' ' + firstName;

  return (
    <View style={styles.container}>
      <View style={styles.pointCard}>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>{`${
          fullName || 'Khách'
        }`}</Text>
      </View>
    </View>
  );
};

export default Points;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  pointCard: {
    backgroundColor: 'pink',
    height: 300,
    width: '100%',
    borderRadius: 10,
    justifyContent: 'top',
    alignItems: 'center',
    padding: 20,
  },
});
