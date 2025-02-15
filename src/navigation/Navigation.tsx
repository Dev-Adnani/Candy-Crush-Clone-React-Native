import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from '../utils/NavigationUtil';
import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import LevelScreen from '../screens/LevelScreen';
import GameScreen from '../screens/GameScreen';
import {SoundProvider} from './SoundContext';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <SoundProvider>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName="SplashScreen">
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen
            name="HomeScreen"
            options={{
              animation: 'fade',
            }}
            component={HomeScreen}
          />
          <Stack.Screen
            options={{
              animation: 'fade',
            }}
            name="GameScreen"
            component={GameScreen}
          />
          <Stack.Screen
            options={{
              animation: 'fade',
            }}
            name="LevelScreen"
            component={LevelScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SoundProvider>
  );
};

export default Navigation;
