/**
 * @format
 */
import React from 'react';
import { Navigation } from 'react-native-navigation';
import { registerScreens } from './src/Navigation/config';



registerScreens();

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: 'Initializing'
      }
    },

  });
});
