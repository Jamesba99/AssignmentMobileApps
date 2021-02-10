import React, { Component } from 'react';
import { Text, View, Button, Alert, PermissionsAndroid,  StyleSheet, TextInput } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
//async thing slide 15
async function requestLocationPermission(){
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      { title: 'Local Permission',
      message:
        'this app requires your location',
      buttonNeutral: 'Ask me later',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    },
  );
  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can access location');
      return true;
    } else {
      console.log('Location permission denied');
      return false;
    }
  } catch (err) {
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
      locationPermission: false,
      isLoading: true,
      destination: "",
      myLocation:{
        latitude: 0,
        longitude: 0,
      }
    }
  //  this.findCoordinates = this.findCoordinates.bind(this);
  }

  findCoordinates= () => {
      console.log("state", this.state);
      if(!this.state.locationPermission){
        console.log("asking for permission");
        this.state.locationPermission = requestLocationPermission();
    }

    Geolocation.getCurrentPosition((position) => {
        const location = JSON.stringify(position);
        const lat = JSON.stringify(position.coords.latitude);
        const lng = JSON.stringify(position.coords.longitude);
        this.setState({myLocation:{
          longitude: position.coords.longitude,
          latitude: position.coords.latitude
        }});
        console.log(lat);
        console.log(lng);


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
        this.props.navigation.navigate('LoginScreen');
    }
  };

  render(){
    const navigation = this.props.navigation;
      return(
        <View style={styles.map}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={{
              latitude: this.state.myLocation.latitude,
              longitude: this.state.myLocation.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005
            }}
          >
              <Marker
                coordinate={this.state.myLocation}
                title="My location"
                description="hello"
                />
            </MapView>
        
            <Button
              title="Back"
              onPress={() =>navigation.goBack()}
            />
        </View>

      );
  }
}
const styles = StyleSheet.create({
   container: {

    // ...StyleSheet.absoluteFillObject,
     height: 400,
     width: 400,
     justifyContent: 'flex-end',
     alignItems: 'center',
   },
   map: {
     flex: 2,
     height: 400,
     width: 400,
     //...StyleSheet.absoluteFillObject,
   },
  });
export default SeeLocalCoffee;
