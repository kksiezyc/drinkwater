import React, {useEffect, useState} from 'react';
import {ReactElement} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Main} from './src/components/main';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {Login} from './src/components/login';
import {LoadingOverlay} from './src/components/loading-overlay';
import {LocalNotifications} from './src/services/notifications';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});

const App = (): ReactElement => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((userState) => {
      if (userState) {
        LocalNotifications.getInstance().registerToLocalNotifications();
      } else {
        LocalNotifications.getInstance().unregisterToLocalNotifications();
      }
      setUser(userState);
      if (initializing) {
        setInitializing(false);
      }
    });
    return subscriber;
  }, [initializing]);

  return (
    <SafeAreaView style={styles.container}>
      <LoadingOverlay visible={initializing} />
      {!initializing && user ? <Main /> : <Login />}
    </SafeAreaView>
  );
};

export default App;
