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
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text>Welcome Back</Text>
        <Text>Login</Text>
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
          <TouchableOpacity activeOpacity={0.5} style={styles.buttonLogin} onPress={() => navigation.navigate('Authentication')}>
            <Text style={{color: colors.white}}>Continue</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('Tabs')}>
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
});
