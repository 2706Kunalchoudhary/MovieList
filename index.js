/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging'

// For background mode
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

// for kill mode
messaging().getInitialNotification(async remoteMessage => {
  console.log('Message handled in the kill mode!', remoteMessage);

})



AppRegistry.registerComponent(appName, () => App);
