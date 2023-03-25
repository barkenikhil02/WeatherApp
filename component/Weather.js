/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import WeatherData from './WeatherData';
// const Stack = createStackNavigator();

const Weather = ({ loading, data, error }) => {
  if (error) {
    return <View style={styles.container}>
      <Text style={styles.error}>{error}</Text>
    </View>;
  }

  return (
    
    <View style={styles.container}>
      { loading ?? <ActivityIndicator size="large" color="#00d1b2" /> }
      { data && <WeatherData data={data} /> }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
  },
  error: {
    color: 'red',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default () => (
      <Weather />
  );
