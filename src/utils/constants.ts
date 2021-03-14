import {Dimensions} from 'react-native';

const {width: deviceWidth, height: deviceHeight} = Dimensions.get('window');

export {deviceHeight, deviceWidth};

export const maxGlassValue = 500;

export const availableDailyDose = [
  {label: '2L', value: 2000},
  {label: '2.5L', value: 2500},
  {label: '3L', value: 3000},
];
