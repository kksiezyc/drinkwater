import React from 'react';
import {ReactElement} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Main} from './src/components/main';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});

const App = (): ReactElement => {
  return (
    <SafeAreaView style={styles.container}>
      <Main />
    </SafeAreaView>
  );
};

export default App;
