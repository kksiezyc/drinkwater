import Slider from '@react-native-community/slider';
import React from 'react';
import {ReactElement} from 'react';
import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import {deviceWidth} from '../utils/constants';

const styles = StyleSheet.create({
  sliderContainer: {
    flexDirection: 'column',
  },
  slider: {
    width: deviceWidth,
    height: 40,
  },
});

interface SliderProps {
  value: number;
  onValueChange: (value: number) => void;
  style: ViewStyle;
}
export const SliderWithValue = ({
  value,
  onValueChange,
  style,
}: SliderProps): ReactElement => (
  <View style={[styles.sliderContainer, style]}>
    <Text>{`${value} ML`}</Text>
    <Slider
      style={styles.slider}
      minimumValue={0}
      maximumValue={500}
      value={value}
      onValueChange={onValueChange}
      step={50}
      minimumTrackTintColor="blue"
      maximumTrackTintColor="#000000"
    />
  </View>
);
