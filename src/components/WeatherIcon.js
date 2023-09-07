import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../assets/colors';

const WeatherIcon = () => {
  const [weatherIcon, setWeatherIcon] = useState('weather-sunny');
  const [iconColor, setIconColor] = useState('#FFD700');
  const navigation = useNavigation();

  useEffect(() => {
    const apiKey = '48508e72b228a42301c32c30a4881d0f';
    const city = 'Nha Trang';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const weatherId = data.weather[0].id;
        const isNight = isNightTime(data.sys.sunrise, data.sys.sunset);

        setWeatherIcon(getWeatherIcon(weatherId, isNight));
        setIconColor(getIconColor(weatherId, isNight));
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });
  }, []);

  const getWeatherIcon = (weatherId, isNight) => {
    if (isNight) {
      return 'weather-night';
    } else if (weatherId >= 200 && weatherId < 300) {
      return 'weather-lightning-rainy';
    } else if (weatherId >= 300 && weatherId < 600) {
      return 'weather-pouring';
    } else if (weatherId >= 600 && weatherId < 700) {
      return 'weather-snowy';
    } else if (weatherId >= 700 && weatherId < 800) {
      return 'weather-fog';
    } else if (weatherId === 800) {
      return 'weather-sunny';
    } else if (weatherId > 800 && weatherId < 900) {
      return 'weather-partly-cloudy';
    } else {
      return 'weather-cloudy';
    }
  };

  const getIconColor = (weatherId, isNight) => {
    if (isNight) {
      return '#000000'; 
    } else if (weatherId >= 200 && weatherId < 600) {
      return '#6495ED';
    } else if (weatherId >= 600 && weatherId < 700) {
      return '#FFFFFF';
    } else if (weatherId >= 700 && weatherId < 800) {
      return '#A9A9A9';
    } else {
      return '#FFD700';
    }
  };

  const isNightTime = (sunrise, sunset) => {
    const currentTime = new Date().getTime() / 1000;
    return currentTime < sunrise || currentTime > sunset;
  };

  return (
    <TouchableOpacity activeOpacity={0.5}>
      <View style={styles.weatherBox}>
        <MaterialCommunityIcons
          name={weatherIcon}
          size={26}
          color={iconColor}
        />
      </View>
    </TouchableOpacity>
  );
};

export default WeatherIcon;

const styles = StyleSheet.create({
  weatherBox: {
    backgroundColor: colors.white,
    borderRadius: 50,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    // shadowColor: colors.black,
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.2,
    // elevation: 5,
  },
});
