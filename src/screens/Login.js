import React, {useState} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Login = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* <Text>Login</Text> */}
      <View style={styles.container}>
        <Text>Welcome Back</Text>
        <View>
          
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
  }
})