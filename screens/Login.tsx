import React, { useEffect, useState, useContext } from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  Pressable,
  Button,
} from 'react-native';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { RootTabScreenProps } from '../types';
import { AuthContext } from '../context/AuthContext'

export default function Loops({ navigation }: RootTabScreenProps<'TabOne'>) {
  const loginSchema = Yup.object().shape({
    formikEmail: Yup.string()
      .email('Invalid email')
      .required('Email is required'),
    formikPassword: Yup.string()
      .min(6, 'Password must be at least 6 characters long')
      .max(20, 'Password cannot be mor than 20 characters long')
      .required('Password is required'),
  });

  const navigateToSignup = () => {
    navigation.navigate('Signup');
  };

  const { onLogin, error, isAuthenticated } = useContext(AuthContext)

  const handleLogin = (values) => {
    onLogin(values)
    console.log(`isAuthenticated: ${isAuthenticated}`)
    if (isAuthenticated) {
      navigation.navigate('Main')
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.authHeader}>Login</Text>

      <Formik
        initialValues={{ formikEmail: '', formikPassword: '' }}
        onSubmit={(values) => handleLogin(values)}
        validationSchema={loginSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <Text>Email:</Text>
            <TextInput
              onChangeText={handleChange('formikEmail')}
              onBlur={handleBlur('formikEmail')}
              value={values.formikEmail}
              style={styles.authInput}
            />
            <Text style={styles.errorMsg}>
              <ErrorMessage name="formikEmail" />
            </Text>
            <Text>Password</Text>
            <TextInput
              onChangeText={handleChange('formikPassword')}
              onBlur={handleBlur('formikPassword')}
              value={values.formikPassword}
              style={styles.authInput}
              secureTextEntry
            />
            <Text style={styles.errorMsg}>
              <ErrorMessage name="formikPassword" />
            </Text>
            <Text>{error}</Text>
            <Button onPress={handleSubmit} title="LOG IN" />
          </View>
        )}
      </Formik>
      <View style={styles.loginMsg}>
        <Text style={styles.alreadyText}>Don't have an account?</Text>
        <Pressable
          style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1.0 }]}
          onPress={navigateToSignup}
        >
          <Text style={styles.loginBtnText}>Signup</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 70,
  },
  authHeader: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  authInput: {
    borderWidth: 1,
    marginBottom: 10,
    marginTop: 5,
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 5,
  },
  alreadyText: {
    marginRight: 10,
  },
  loginMsg: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginBtn: {
    marginLeft: 5,
  },
  loginBtnText: {
    color: 'green',
  },
  signupBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  authBtn: {
    backgroundColor: 'green',
    width: 90,
    alignSelf: 'center',
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
  },
  errorMsg: {
    color: 'red',
  },
});
