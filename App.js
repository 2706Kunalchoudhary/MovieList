import React, { useEffect } from 'react'
import MovieList from './src/screens/movielist/MovieList'
import messaging from '@react-native-firebase/messaging'
import notifee from '@notifee/react-native';
import { colorConstants } from './src/utils/constants';
import { StatusBar } from 'react-native';

const App = () => {

  useEffect(()=>{
    getToken()
  },[])

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      displayNotification(remoteMessage)
    });

    return unsubscribe;
  }, []);

  // Function to display notification locally
  
  const displayNotification = async (data)=>{
    await notifee.requestPermission()

    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: data.notification.title,
      body: data.notification.body,
      android: {
        channelId,
        pressAction: {
          id: 'default',
        },
      },
  })}

  // Function To get device token

  const getToken = async ()=>{
    const token = await messaging().getToken();
    console.log(token,"token");
  }

  return (
    <>
    <StatusBar backgroundColor={colorConstants.black} />
    <MovieList/>
    </>
  )
}

export default App
