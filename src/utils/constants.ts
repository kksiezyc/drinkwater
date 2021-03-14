import {Dimensions} from 'react-native';

const {width: deviceWidth, height: deviceHeight} = Dimensions.get('window');

export {deviceHeight, deviceWidth};

export const maxGlassValue = 500;

export const availableDailyDose = [
  {label: '2000', value: 2000},
  {label: '2500', value: 2500},
  {label: '3000', value: 3000},
];
