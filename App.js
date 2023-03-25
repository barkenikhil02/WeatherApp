import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomePage from './component/HomePage';
import ForecastData from './component/ForecastData';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomePage">
        <Stack.Screen name="Weather" component={HomePage} />
        <Stack.Screen name="ForecastData" component={ForecastData} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;