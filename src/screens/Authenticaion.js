import {LogBox} from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth';

const Authentication = ({route}) => {
  const navigation = useNavigation();
  const {phone, confirmation} = route.params;

  let textInput = useRef(null);
  let clockCall = null;
  const lengthInput = 6;
  const defaultCountdown = 30;
  const [internalVal, setInternalVal] = useState('');
  const [countdown, setCountdown] = useState(defaultCountdown);
  const [enableResend, setEnableResend] = useState(false);

  const confirmCode = async otpValue => {
    try {
      // console.log(otpValue);
      await confirmation.confirm(otpValue);
      // console.log(t);
      navigation.navigate('Tabs');
    } catch (error) {
      console.log('Invalid code.');
      console.log(otpValue);
    }
  };

  useEffect(() => {
    clockCall = setInterval(() => {
      decrementClock();
    }, 1000);
    return () => {
      clearInterval(clockCall);
    };
  });

  const decrementClock = () => {
    if (countdown === 0) {
      setEnableResend(true);
      setCountdown(0);
      clearInterval(clockCall);
    } else {
      setCountdown(countdown - 1);
    }
  };

  const onChangeText = val => {
    setInternalVal(val);
    if (val.length === lengthInput) {
      console.log('Input Length:', val.length);
      console.log('Input Value:', val);
      confirmCode(val);
    }
  };

  const onResendOTP = async () => {
    if (enableResend) {
      setCountdown(defaultCountdown);
      setEnableResend(false);
      clearInterval(clockCall);
      clockCall = setInterval(() => {
        decrementClock();
      }, 1000);
      try {
        const newConfirmation = await auth().signInWithPhoneNumber(phone);
        setConfirm(newConfirmation);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onChangeNumber = () => {
    setInternalVal('');
  };

  useEffect(() => {
    textInput.focus();
  }, []);

  const openKeyboard = () => {
    textInput.focus();
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={50}
        behavior={'padding'}
        style={styles.containerAvoidingView}>
        <Text style={styles.textTile}>
          {'Enter your OTP code sent via SMS'}
        </Text>
        <View>
          <TextInput
            ref={input => (textInput = input)}
            onChangeText={onChangeText}
            style={{width: 0, height: 0}}
            value={internalVal}
            maxLength={lengthInput}
            keyboardType="numeric"
          />
          <View style={styles.containerInput}>
            {Array(lengthInput)
              .fill()
              .map((data, index) => (
                <View
                  key={index}
                  style={[
                    styles.cellView,
                    {
                      borderBottomColor:
                        index === internalVal.length ? '#FB6C6A' : '#234DB7',
                    },
                  ]}>
                  <Text
                    style={styles.cellText}
                    onPress={() => textInput.focus()}>
                    {internalVal && internalVal.length > 0
                      ? internalVal[index]
                      : ''}
                  </Text>
                </View>
              ))}
          </View>
        </View>

        <View style={styles.openKeyboardButtonContainer}>
          <TouchableOpacity onPress={openKeyboard}>
            <MaterialIcons name="keyboard" size={30} color="#234DB7" />
          </TouchableOpacity>
        </View>

        <View style={styles.bottomView}>
          <TouchableOpacity activeOpacity={0.5} onPress={onChangeNumber}>
            <View style={styles.btnChangeNumber}>
              <Text style={styles.textChange}>Change Number</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5} onPress={onResendOTP}>
            <View style={styles.btnResend}>
              <Text
                style={[
                  styles.textResend,
                  {
                    color: enableResend ? '#234DB7' : 'gray',
                  },
                ]}>
                Resend OTP ({countdown})
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Authentication;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerAvoidingView: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  textTile: {
    marginTop: 50,
    marginBottom: 50,
    fontSize: 16,
  },
  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellView: {
    paddingVertical: 11,
    width: 40,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1.5,
  },
  cellText: {
    textAlign: 'center',
    fontSize: 16,
  },
  bottomView: {
    flexDirection: 'row',
    flex: 1,
    marginBottom: 50,
    alignItems: 'flex-end',
  },
  btnChangeNumber: {
    width: 150,
    height: 50,
    borderRadius: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  textChange: {
    color: '#234DB7',
    alignItems: 'center',
    fontSize: 15,
  },
  btnResend: {
    width: 150,
    height: 50,
    borderRadius: 10,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  textResend: {
    alignItems: 'center',
    fontSize: 15,
  },
  openKeyboardButtonContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
});
