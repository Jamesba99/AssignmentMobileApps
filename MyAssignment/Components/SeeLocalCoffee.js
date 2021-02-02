import React, { Component } from 'react';
import { Text, View, Button, Alert, PermissionsAndroid } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';
//async thing slide 15
async function requestLocationPermission(){
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      { title: 'Lab04 Location Permission',
      message:
        'this app requires your location',
      buttonNeutral: 'Ask me later',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    },
  );
  if (granted === PermissionsAndroid.RESULTS.GRANTED){
    console.log('you can acess location');
    return true;
  } else {
    console.log('location permission denied');
    return false;
    }
  }catch (err){
    console.warn(err);
  }
}
// watch this to implement maps - https://www.youtube.com/watch?v=4qq0GQPkfjI
class SeeLocalCoffee extends Component{

  componentDidMount(){
      this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.checkLoggedIn();
      this.findCoordinates();
    });

      }
  componentWillUnmount (){
      this.unsubscribe();
  }

  constructor(props){
    super(props);

    this.state = {
      location: null,
      locationPermission: false
    }
    this.findCoordinates = this.findCoordinates.bind(this);
  }


  findCoordinates= () => {
      console.log("state", this.state);
      if( !this.state.locationPermission){
        console.log("asking for permission");
        this.state.locationPermission = requestLocationPermission();
    }
    Geolocation.getCurrentPosition((position) => {
        const location = JSON.stringify(position);
        console.log(location);
        this.setState({location:location});
        console.log(location);
      },(error) => {
        Alert.alert(error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maxiumAge: 1000
      });

  }
  checkLoggedIn = async () => {
    const value = await AsyncStorage.getItem('@session_token');
    if (value == null) {
        this.props.navigation.navigate('Login');
    }
  };
  render(){
      const navigation = this.props.navigation;
      return(
        <View>
          <Button title= "Get my coords" onPress={() => {this.findCoordinates()}}/>

        </View>
    );
  }
}

export default SeeLocalCoffee;
