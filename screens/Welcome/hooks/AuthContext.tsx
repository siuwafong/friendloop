import React, { useState, createContext } from 'react';
import * as firebaseAuth from 'firebase/auth';
import { User, UserCredential } from 'firebase/auth';

interface formikCredentials {
  formikEmail: string;
  formikPassword: string;
  formikConfirmPassword?: string;
}

export const AuthContext = createContext(undefined);

export const AuthContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<UserCredential | User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onLogout = (usr) => {
    const auth = firebaseAuth.getAuth();
    firebaseAuth.signOut(auth).then(() => {
      setUser(null);
      setError(null);
    });

    firebaseAuth.onAuthStateChanged(auth, (usr) => {
      if (usr) {
        setUser(usr);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    });
  };

  const onRegister = (values: formikCredentials) => {
    setIsLoading(true)
    const auth = firebaseAuth.getAuth();
    if (values.formikPassword !== values.formikConfirmPassword) {
      setError('Error: Passwords do not match');
      return;
    }
    firebaseAuth
      .createUserWithEmailAndPassword(
        auth,
        values.formikEmail,
        values.formikPassword
      )
      .then((u) => {
        setUser(u);
        setIsLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setIsLoading(false);
        setError(e.toString());
      });
  };

  const onLogin = (values: formikCredentials) => {
    const auth = firebaseAuth.getAuth();
    firebaseAuth
      .signInWithEmailAndPassword(
        auth,
        values.formikEmail,
        values.formikPassword
      )
      .then((u) => {
        console.log('successfully signed in');
        setUser(u);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.toString());
      });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        error,
        onLogin,
        onRegister,
        onLogout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
