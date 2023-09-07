import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Points = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState(null);

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

  return (
    <View style={styles.container}>
      <View style={styles.pointCard}>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>{`${
          username || 'Khách'
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
