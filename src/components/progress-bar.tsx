import React, {useEffect, useMemo, useRef} from 'react';
import {ReactElement} from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';
import {deviceWidth} from '../utils/constants';

const styles = StyleSheet.create({
  container: {
    width: deviceWidth,
    height: 100,
    borderWidth: 3,
    borderColor: 'blue',
    backgroundColor: 'grey',
  },
  progressBar: {
    height: '100%',
    backgroundColor: 'blue',
    width: deviceWidth,
  },
  textWrapper: {
    position: 'absolute',
    top: 40,
    alignSelf: 'center',
  },
  text: {
    textAlign: 'center',
    color: 'white',
  },
});
interface ProgressBarProps {
  value: number;
  dailyDose: number;
}

export const ProgressBar = ({
  value,
  dailyDose,
}: ProgressBarProps): ReactElement => {
  const progression = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const calculatedValue = (value / dailyDose) * deviceWidth;
    Animated.timing(progression, {
      toValue: calculatedValue > deviceWidth ? deviceWidth : calculatedValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [value, progression, dailyDose]);

  const translateX = useMemo(
    () =>
      progression.interpolate({
        inputRange: [0, deviceWidth],
        outputRange: [-deviceWidth, 0],
      }),
    [progression],
  );
  return (
    <View style={styles.container}>
      <Animated.View
        style={{...styles.progressBar, transform: [{translateX: translateX}]}}
      />
      <View style={styles.textWrapper}>
        <Text style={styles.text}>{`${value} / ${dailyDose} ML`}</Text>
        {value >= dailyDose && (
          <Text style={styles.text}>Daily dose completed</Text>
        )}
      </View>
    </View>
  );
};
