import auth from '@react-native-firebase/auth';
import React, {useCallback, useState} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {LoadingOverlay} from './loading-overlay';

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: 'grey',
    padding: 5,
    margin: 5,
    borderRadius: 5,
  },
});

export const Login = () => {
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const onLoginPress = useCallback(async () => {
    try {
      setLoading(true);
      await auth().signInWithEmailAndPassword(login, password);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setError(typeof e?.message === 'string' ? e.message : 'Error logging in');
    }
  }, [login, password]);

  return (
    <View>
      <LoadingOverlay visible={loading} />
      <TextInput style={styles.input} onChangeText={setLogin} value={login} />
      <TextInput
        style={styles.input}
        secureTextEntry
        onChangeText={setPassword}
      />
      <Button
        disabled={!login || !password}
        title={'login'}
        onPress={onLoginPress}
      />
      <Text>{error}</Text>
    </View>
  );
};
