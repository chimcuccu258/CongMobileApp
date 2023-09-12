import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../assets/colors';
import {windowHeight} from '../../utils/Dimession';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Information = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [isForm, setIsForm] = useState(false);

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
            setPhone(userData.phone);
            setEmail(userData.email);
            setGender(userData.gender === '0' ? 'Nam' : 'Nữ');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };
    getUserData();
  }, []);

  const handleUpdate = async () => {
    try {
      const user = auth().currentUser;

      if (user) {
        const querySnapshot = await firestore()
          .collection('TblUsers')
          .where('phone', '==', user.phoneNumber)
          .get();

        if (!querySnapshot.empty) {
          const docRef = querySnapshot.docs[0].ref;
          const userData = {
            lastName,
            firstName,
          };

          await docRef.update(userData);

          Alert.alert('Thông báo', 'Cập nhật thông tin thành công 🎉', [
            {
              text: 'OK',
              onPress: () => console.log('OK Pressed'),
            },
          ]);
        } else {
          console.error('User data not found');
        }
      } else {
        console.error('User not found');
      }
    } catch (error) {
      console.error('Error during update:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Họ"
        value={lastName}
        placeholderTextColor="black"
        onChangeText={text => {
          setLastName(text);
          setIsForm(true);
        }}
      />

      <TextInput
        style={styles.input}
        placeholder="Tên"
        value={firstName}
        placeholderTextColor="black"
        onChangeText={text => {
          setFirstName(text);
          setIsForm(true);
        }}
      />

      <TextInput
        style={styles.input}
        placeholder={email}
        editable={false}
        placeholderTextColor="black"
        backgroundColor="#D3d4d3"
      />

      <TextInput
        style={styles.input}
        placeholder={phone}
        editable={false}
        placeholderTextColor="black"
        backgroundColor="#D3d4d3"
      />

      <TextInput
        style={styles.input}
        placeholder={gender}
        editable={false}
        placeholderTextColor="black"
        backgroundColor="#D3d4d3"
      />

      <TouchableOpacity
        activeOpacity={1}
        style={[
          styles.buttonContainer,
          {backgroundColor: isForm ? colors.green1 : '#cccccc'},
        ]}
        disabled={!isForm}
        onPress={handleUpdate}>
        <Text style={styles.buttonTitle}>Cập nhật tài khoản</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Information;

const styles = StyleSheet.create({
  container: {
    height: windowHeight,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#cccccc',
    fontSize: 14,
    color: '#333333',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  buttonContainer: {
    height: 50,
    backgroundColor: colors.green1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 15,
  },
  buttonTitle: {
    fontSize: 15,
    color: 'white',
  },
  deleteAccount: {
    height: 50,
    backgroundColor: 'white',
    justifyContent: 'flex-end',
  },
  deleteAccountTitle: {
    color: colors.green1,
    fontSize: 15,
    textAlign: 'center',
    marginTop: 15,
  },
});
