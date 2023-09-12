import React, {useMemo, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../assets/colors';
import DatePicker from 'react-native-date-picker';
import {useNavigation} from '@react-navigation/native';
import RadioGroup from 'react-native-radio-buttons-group';
import firestore from '@react-native-firebase/firestore';
import {Picker} from '@react-native-picker/picker';

const SignUp = ({route}) => {
  const navigation = useNavigation();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const phone = route?.params?.phone || '';

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const radioButtons = useMemo(
    () => [
      {
        id: '0',
        label: 'Nam',
        value: 'man',
      },
      {
        id: '1',
        label: 'Nữ',
        value: 'woman',
      },
    ],
    [],
  );

  const [gender, setGender] = useState('');

  const handleSignUp = async () => {
    try {
      if (!firstName || !lastName || !gender || !email) {
        console.error('Please fill in all required fields');
        return;
      }

      const userData = {
        lastName,
        firstName,
        gender,
        email,
        phone,
      };

      await firestore().collection('TblUsers').add(userData);

      navigation.navigate('Tabs');

      console.log('Sign up successful');
    } catch (error) {
      console.error('Error during sign up:', error);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.title}>Đăng ký</Text>

        <TextInput
          style={styles.input}
          placeholder="Họ"
          onChangeText={text => setLastName(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Tên"
          onChangeText={text => setFirstName(text)}
        />

        <RadioGroup
          layout="row"
          radioButtons={radioButtons}
          onPress={setGender}
          selectedId={gender}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={text => setEmail(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Số điện thoại"
          value={phone}
          editable={false}
        />

        <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
          <Text style={styles.signupButtonText}>Đăng ký</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    marginTop: 30,
  },
  selectedDate: {
    marginTop: 10,
    fontSize: 18,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  signupButton: {
    backgroundColor: colors.green1,
    borderRadius: 5,
    marginTop: 20,
    paddingVertical: 10,
    width: '100%',
  },
  signupButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
