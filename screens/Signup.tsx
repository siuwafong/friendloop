import React, { useContext } from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Button,
} from 'react-native';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { RootTabScreenProps } from '../types';
import { AuthContext } from '../context/AuthContext'

export default function Loops({ navigation }: RootTabScreenProps<'TabOne'>) {

  const signupSchema = Yup.object().shape({
    formikEmail: Yup.string()
      .email('Invalid email')
      .required('Email is required'),
    formikPassword: Yup.string()
      .min(6, 'Password must be at least 6 characters long')
      .max(20, 'Password cannot be more than 20 characters long')
      .required('Password is required'),
    formikConfirmPassword: Yup.string()
      .oneOf([Yup.ref('formikPassword'), null], 'Passwords must match')
  })

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  const { onRegister, error, isAuthenticated } = useContext(AuthContext)

  const handleRegister = (values) => {
    onRegister(values)
    if (isAuthenticated) {
      navigation.navigate('Main')
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.authHeader}>Signup</Text>
      <Formik
        initialValues={{ formikEmail: '', formikPassword: '' }}
        onSubmit={(values) => handleRegister(values)}
        validationSchema={signupSchema}
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
            <Text>Confirm Password</Text>
            <TextInput
              onChangeText={handleChange('formikConfirmPassword')}
              onBlur={handleBlur('formikConfirmPassword')}
              value={values.formikConfirmPassword}
              style={styles.authInput}
              secureTextEntry
            />
            <Text>{error}</Text>
            <Text style={styles.errorMsg}>
              <ErrorMessage name="formikConfirmPassword" />
            </Text>

            <Button onPress={handleSubmit} title="SIGN UP" />
          </View>
        )}
      </Formik>
      <View style={styles.loginMsg}>
        <Text style={styles.alreadyText}>Already have an account?</Text>
        <Pressable
          style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1.0 }]}
          onPress={navigateToLogin}
        >
          <Text style={styles.loginBtnText}>Login</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
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
