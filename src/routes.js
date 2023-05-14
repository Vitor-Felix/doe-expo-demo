import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Feed from './pages/Feed';
import PostDetails from './pages/PostDetails';
import NewPost from './pages/NewPost';
import TakePicture from './pages/TakePicture';

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Feed" component={Feed} />
      <Stack.Screen name="PostDetails" component={PostDetails} />
      <Stack.Screen name="Register" component={Register} />        
      <Stack.Screen name="Profile" component={Profile} />        
      <Stack.Screen name="NewPost" component={NewPost} />        
      <Stack.Screen name="TakePicture" component={TakePicture} />        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
