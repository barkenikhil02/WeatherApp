import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

const Form = ({ search, onSetSearch, onSubmit }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Load favorites from storage when component mounts
    AsyncStorage.getItem('favorites').then((data) => {
      if (data !== null) {
        setFavorites(JSON.parse(data));
      }
    });
  }, []);

  const addFavorite = () => {
    // Add search city to favorites
    const newFavorites = [...favorites, search];
    AsyncStorage.setItem('favorites', JSON.stringify(newFavorites)).then(() => {
      setFavorites(newFavorites);
    });
  };

  const removeFavorite = (index) => {
    // Remove favorite city from favorites
    const newFavorites = [...favorites];
    newFavorites.splice(index, 1);
    AsyncStorage.setItem('favorites', JSON.stringify(newFavorites)).then(() => {
      setFavorites(newFavorites);
    });
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.heading}>Enter city name and press search button</Text> */}
      <View style={styles.searchContainer}>
        <TextInput 
          style={styles.input} 
          placeholder="Search city name" 
          value={search} 
          onChangeText={onSetSearch} 
          autoCapitalize="words" 
          autoCorrect={false} 
        />
        <TouchableOpacity style={styles.roundedButton} onPress={onSubmit}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>
      {favorites.length > 0 && (
        <View style={styles.favoritesContainer}>
          <Text style={styles.favoritesHeading}>Favorites:</Text>
          <Picker
            selectedValue={search}
            onValueChange={(itemValue) => {
              onSetSearch(itemValue);
            }}
          >
            <Picker.Item label="Select a favorite city" value="" />
            {favorites.map((favorite, index) => (
              <Picker.Item key={favorite} label={favorite} value={favorite} />
            ))}
          </Picker>
          {favorites.length > 0 && (
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.roundedButton} onPress={() => {
                const selectedIndex = favorites.findIndex((item) => item === search);
                if (selectedIndex >= 0) {
                  removeFavorite(selectedIndex);
                }
              }}>
                <Text style={styles.buttonText}>Remove selected favorite</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.roundedButton} onPress={addFavorite}>
            <Text style={styles.buttonText}>Add to favorites</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
  
};

const styles = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    },
    heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    },
    searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    },
    input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
    paddingHorizontal: 10,
    },
    roundedButton: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    },
    buttonText: {
    color: '#fff',
    fontSize: 16,
    },
    favoritesContainer: {
    marginTop: 20,
    },
    favoritesHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    },
    buttonContainer: {
    marginTop: 10,
    },
    });

export default Form;