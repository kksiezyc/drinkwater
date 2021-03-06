import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import React, {useCallback, useEffect, useState} from 'react';
import {ReactElement} from 'react';
import {
  AppState,
  AppStateStatus,
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {availableDailyDose} from '../utils/constants';
import {DrinkWaterValues} from '../utils/enums';
import {LoadingOverlay} from './loading-overlay';
import {ProgressBar} from './progress-bar';
import {SliderWithValue} from './slider';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  slider: {
    marginTop: 'auto',
    alignItems: 'center',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  buttonWrapper: {
    width: 150,
  },
});

export const Main = (): ReactElement => {
  const [sliderValue, setSliderValue] = useState<number>(250);
  const [dailyWater, setDailyWater] = useState<number>(0);
  const [dailyDose, setDailyDose] = useState<number>(2000);
  const [loading, setLoading] = useState<boolean>(true);

  const onSliderValueChange = useCallback((value: number) => {
    setSliderValue(value);
  }, []);

  const addDailyWater = useCallback(() => {
    setDailyWater((currentState) => currentState + sliderValue);
  }, [sliderValue]);

  const removeDailywater = useCallback(() => {
    setDailyWater((currentState) => currentState - sliderValue);
  }, [sliderValue]);

  const restart = useCallback(() => {
    setDailyWater(0);
  }, []);

  const logout = useCallback(() => {
    auth().signOut();
  }, []);

  useEffect(() => {
    AsyncStorage.getItem(DrinkWaterValues.DailyWater).then((value) => {
      if (value) {
        setDailyWater(Number(value));
      }
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const saveStateToPersistentStorage = async (state: AppStateStatus) => {
      if (state === 'background') {
        await AsyncStorage.setItem(
          DrinkWaterValues.DailyWater,
          dailyWater.toString(),
        );
      }
    };
    AppState.addEventListener('change', saveStateToPersistentStorage);

    return () => {
      AppState.removeEventListener('change', saveStateToPersistentStorage);
    };
  }, [dailyWater]);

  return (
    <>
      <LoadingOverlay visible={loading} />
      <Text>select daily target</Text>
      <RNPickerSelect
        value={dailyDose}
        onValueChange={setDailyDose}
        items={availableDailyDose}
      />
      <ProgressBar value={dailyWater} dailyDose={dailyDose} />
      <SliderWithValue
        style={styles.slider}
        value={sliderValue}
        onValueChange={onSliderValueChange}
      />
      <View style={styles.buttons}>
        <View style={styles.buttonWrapper}>
          <Button onPress={removeDailywater} title={'remove'} />
        </View>
        <View style={styles.buttonWrapper}>
          <Button onPress={addDailyWater} title={'add'} />
        </View>
      </View>
      <Button onPress={restart} title={'restart'} />
      <Button onPress={logout} title={'logout'} />
    </>
  );
};
