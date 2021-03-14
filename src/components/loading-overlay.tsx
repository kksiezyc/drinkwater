import React from 'react';
import {ReactElement} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {deviceHeight, deviceWidth} from '../utils/constants';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    width: deviceWidth,
    height: deviceHeight,
  },
});

export const LoadingOverlay = ({visible}: {visible: boolean}): ReactElement => {
  if (!visible) {
    return <></>;
  }
  return (
    <View style={styles.container}>
      <ActivityIndicator color="00ff00" size="large" />
    </View>
  );
};
