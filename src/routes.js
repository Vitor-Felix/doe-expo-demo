import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './pages/Login';
// import Register from './pages/Register';
import Feed from './pages/Feed';

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Feed" component={Feed} />
        {/* <Stack.Screen name="Register" component={Register} /> */}        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
