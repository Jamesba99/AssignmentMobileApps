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
import UserInfo from './Components/UserInfo';
import FlatListOutput from './Components/FlatListOutput';
import EditUSerDetails from './Components/EditUSerDetails';
import EditReviews from './Components/EditReviews';
import FavouriteAlocation from './Components/FavouriteAlocation'
import CameraScreen from "./Components/CameraScreen"
import ViewPhotos from "./Components/ViewPhotos"
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
            <Drawer.Screen  name="LoginScreen" component={Login} options={{headerShown: false}} />
            <Drawer.Screen name="HomeScreen" component={HomeScreen}options={{title:"Home Screen!"}} />
            <Drawer.Screen name="Register" component={Register} options={{title:"Register for an account!"}} />
            <Drawer.Screen name="LogoutScreen" component={LogoutScreen}options={{title:"Logout!"}}/>
            <Drawer.Screen name="LeaveReviews" component={LeaveReviews}options={{title:"Leave A Review"}}/>
            <Drawer.Screen name="ViewReviews" component={ViewReviews}options={{title:"View A Review"}}/>
            <Drawer.Screen name="SeeLocalCoffee" component={SeeLocalCoffee}options={{title:"See Local Coffee Near You"}}/>
            <Drawer.Screen name="UserInfo" component={UserInfo}options={{title:"Profile"}}/>
            <Drawer.Screen name="FlatListOutput" component={FlatListOutput}options={{title:"Remove this screen from being shown"}}/>
            <Drawer.Screen name="EditUSerDetails" component={EditUSerDetails}options={{title:"Remove this screen from being shown"}}/>
            <Drawer.Screen name="EditReviews" component={EditReviews}options={{title:"Remove this screen from being shown"}}/>
            <Drawer.Screen name="FavouriteAlocation" component={FavouriteAlocation}options={{title:"Remove this screen from being shown"}}/>
            <Drawer.Screen name="CameraScreen" component={CameraScreen}options={{title:"Remove this screen from being shown"}}/>
            <Drawer.Screen name="ViewPhotos" component={ViewPhotos}options={{title:"Remove this screen from being shown"}}/>
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}

export default App; // exports the apps
