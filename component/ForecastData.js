import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { openweathermap_api_key } from '../config.json';

const ForecastData = ({ route }) => {
  const { city, country } = route.params;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [forecastData, setForecastData] = useState([]);

  useEffect(() => {
    console.log(city)
    console.log(country)
    setLoading(true);
    setError(false);

    axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${openweathermap_api_key}`)
      .then(response => {
        // filter for 12:00:00
        setForecastData(response.data.list.filter(data => data.dt_txt.includes("12:00:00"))); 
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error fetching data. Please try again later.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* {console.log} */}
      <Text style={styles.cityText}>{city}, {country}</Text>
      {forecastData.map((data, index) => (
        <View key={index} style={styles.forecastContainer}>
          <Text style={styles.dateText}>{new Date(data.dt * 1000).toLocaleDateString()}</Text>
          <Text style={styles.weatherText}>{data.weather[0].description}</Text>
          <Text style={styles.tempText}>{(data.main.temp - 273.15).toFixed(1)}°C</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    fontSize: 20,
  },
  errorText: {
    fontSize: 20,
    color: 'red',
  },
  cityText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  forecastContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 10,
  },
  dateText: {
    fontSize: 16,
  },
  weatherText: {
    fontSize: 16,
    textTransform: 'capitalize',
  },
  tempText: {
    fontSize: 16,
  },
});

export default ForecastData;
