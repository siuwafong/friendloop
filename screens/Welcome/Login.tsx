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
import { RootStackParamList, RootTabScreenProps } from '../../navigation/types';
import { AuthContext } from './hooks/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export function Login() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

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
    navigation.navigate('Auth', { screen: 'Signup' });
  };

  const { onLogin, error, isAuthenticated, isLoading } = useContext(AuthContext);

  const handleLogin = (values) => {
    console.log('logging in');
    onLogin(values);
    if (isAuthenticated) {
      navigation.navigate('Main');
    }
  };

  return (
    isLoading ? 
        <View>
            <Text>Loading...</Text>
        </View>
        :
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
