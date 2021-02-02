import 'react-native-gesture-handler';

import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from './Components/DefaultHomeScreen';
import Register from './Components/Register';
import Login from './Components/Login';
import LogoutScreen from './Components/Logout';
import LeaveReviews from './Components/LeaveReviews';
import SeeLocalCoffee from './Components/SeeLocalCoffee';
import ViewReviews from './Components/ViewReviews';
//import AfterLoginScreen from './Components/AfterLoginScreen';
//import CoffeeRewviewHomePage from './Components/InApp/CoffeeRewviewHomePage'
/**
Stack screen can then add options which will change what the top panel will say
**/
const Drawer = createDrawerNavigator();

class App extends Component{
  render(){
    return(
      <NavigationContainer>
        <Drawer.Navigator>
            <Drawer.Screen name="Login" component={Login} />
            <Drawer.Screen name="HomeScreen" component={HomeScreen} />
            <Drawer.Screen name="Register" component={Register} options={{title:"Register for an account"}} />
            <Drawer.Screen name="LogoutScreen" component={LogoutScreen}/>
            <Drawer.Screen name="LeaveReviews" component={LeaveReviews}/>
            <Drawer.Screen name="ViewReviews" component={ViewReviews}/>
            <Drawer.Screen name="SeeLocalCoffee" component={SeeLocalCoffee}/>
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}

export default App; // exports the apps
