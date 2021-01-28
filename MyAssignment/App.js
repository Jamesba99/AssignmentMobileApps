import 'react-native-gesture-handler';

import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
/**
Above adds all imports that are required for stack navigation
below includes all screens that are going to be called as part of the stack
**/

//import HomeScreen from './Components/HomeScreen';
import HomeScreen from './Components/home_with_buttons';
import About from './Components/About';
import Contact from './Components/Contact';

const Stack = createStackNavigator();// adds a stack navigator

class App extends Component{
  render(){
    return(
        <NavigationContainer>
          <Stack.Navigator>
              <Stack.Screen name="HomeScreen" component={HomeScreen} />
              <Stack.Screen name="About" component={About} />
              <Stack.Screen name="Contact" component={Contact} />
          </Stack.Navigator>
        </NavigationContainer>
      );
  }
}

export default App; // exports the app
