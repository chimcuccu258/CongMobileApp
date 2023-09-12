import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../assets/colors';
import PhoneInput from 'react-native-phone-number-input';
import {windowWidth} from '../utils/Dimession';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {fonts} from '../assets/fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const navigation = useNavigation();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState(null);

  const signInWithPhoneNumber = async phone => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phone);
      console.log(confirmation);
      setConfirm(confirmation);
      navigation.navigate('Authentication', {phone, confirmation});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.loginTitle}>Enter phone number to login</Text>
        <View style={styles.loginBox}>
          <PhoneInput
            defaultValue={phone}
            defaultCode={'VN'}
            withShadow
            containerStyle={{width: '100%'}}
            onChangeFormattedText={text => {
              setPhone(text);
            }}
          />
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.buttonLogin}
            onPress={() => signInWithPhoneNumber(phone)}>
            <Text style={{color: colors.white}}>Continue</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.navigate('Tabs')}>
          <Text>Skip</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
    paddingVertical: 20,
    alignItems: 'center',
  },
  loginBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 50,
    color: colors.black,
  },
  buttonLogin: {
    top: 20,
    backgroundColor: colors.primary,
    padding: 20,
    borderRadius: 30,
    width: windowWidth - 200,
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    marginTop: 30,
  },
  loginTitle: {
    fontSize: 16,
    marginTop: 30,
  },
});
