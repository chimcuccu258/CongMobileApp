import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../assets/colors';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    gender: '',
    dateOfBirth: '',
    email: '',
    province: '',
    city: '',
    street: '',
  });

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSignUp = () => {
    // Implement your sign-up logic here using the formData state.
    console.log('Form Data:', formData);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Đăng ký</Text>

        {/* Username */}
        <TextInput
          style={styles.input}
          placeholder="Tên đăng nhập"
          onChangeText={(text) => handleChange('username', text)}
        />

        {/* Gender */}
        <TextInput
          style={styles.input}
          placeholder="Giới tính"
          onChangeText={(text) => handleChange('gender', text)}
        />

        {/* Date of Birth */}
        <TextInput
          style={styles.input}
          placeholder="Ngày sinh (dd/mm/yyyy)"
          onChangeText={(text) => handleChange('dateOfBirth', text)}
        />

        {/* Email */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => handleChange('email', text)}
        />

        {/* Province */}
        <TextInput
          style={styles.input}
          placeholder="Tỉnh/Thành phố"
          onChangeText={(text) => handleChange('province', text)}
        />

        {/* City */}
        <TextInput
          style={styles.input}
          placeholder="Quận/Huyện"
          onChangeText={(text) => handleChange('city', text)}
        />

        {/* Street */}
        <TextInput
          style={styles.input}
          placeholder="Đường/Phố"
          onChangeText={(text) => handleChange('street', text)}
        />

        {/* Sign-up Button */}
        <TouchableOpacity
          style={styles.signupButton}
          onPress={handleSignUp}
        >
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
