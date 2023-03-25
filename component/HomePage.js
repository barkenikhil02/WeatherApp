import React, { useState }  from 'react';
import { Text, View, StyleSheet, Alert, Button, Keyboard, ScrollView } from 'react-native';
import { useDispatch, useSelector, Provider } from 'react-redux';
import store from '../store/index';
import WeatherData from './WeatherData';
import ForecastData from './ForecastData';
import { useNavigation } from '@react-navigation/native';
import { getWeather } from '../store/actions/weatherActions';
import Form from './Form';

const HomePage = () => {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { data, error } = useSelector(({ weather }) => weather);

  const searchSubmitHandler = () => {
    if (search === '') {
      return Alert.alert('Validation', 'City name is required!', [{ text: 'OK' }]);
    }

    setLoading(true);
    dispatch(getWeather(search, () => setLoading(false)));
    setSearch('');
    Keyboard.dismiss();
  };

  const handleForecastPress = () => {
    navigation.navigate('ForecastData', { city: data.name, country: data.sys.country });
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps='always'>
      <Form
        search={search}
        onSetSearch={setSearch}
        onSubmit={searchSubmitHandler}
      />
      {data && !error && (
        <WeatherData data={data} />
      )}
      {data ? <Button title="Show 5-Day Forecast" onPress={handleForecastPress} /> : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    margin: 1,
  },
});

export default function Main() {
  return (
    <Provider store={store}>
      <HomePage />
    </Provider>
  );
}
