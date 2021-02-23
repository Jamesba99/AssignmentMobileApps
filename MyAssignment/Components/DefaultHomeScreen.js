import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, ToastAndroid, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SeeLocalCoffee from './SeeLocalCoffee';

class HomeScreen extends Component{
// adds a listener to check that the user is logged in
  constructor(props){
    super(props);

    this.state = {
      isLoading: true,
      listData: []
    }
  }
  componentDidMount(){
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
    });
    this.getData();
  }


// unsubscribed to clear the memory to stop clogedge
  componentWillUnmount (){
    this.unsubscribe();
  }


  getData = async () => {
    const value = await AsyncStorage.getItem('@session_token');
    return fetch("http://10.0.2.2:3333/api/1.0.0/find",{
        'headers' : {
          'X-Authorization': value
        }
    })
      .then((response) => {
          if(response.status === 200){
              return response.json()
          }else if(response.status === 401){
              ToastAndroid.show("you are not logged in" ,ToastAndroid.SHORT);
              this.props.navigation.navigate("Login");
          }else{
              throw 'Something went wrong';
          }
      })
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          listData: responseJson
        })

      })
      .catch((error) => {
          console.log(error);
          ToastAndroid.show(error,ToastAndroid.SHORT);
      })
  }

  checkLoggedIn = async () => {
    const value = await AsyncStorage.getItem('@session_token');
    if (value == null) {
        this.props.navigation.navigate('LoginScreen');
    }
  };
  render(){
   /**
   if the user clicks the navigation button it will stack the appropriate screen
   **/
    const navigation = this.props.navigation; // declaring the navigation constant

    if(this.state.isLoading){
      return(
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#41393E'
          }}>
          <Text style={customStyle.text}> Loading.... </Text>
      </View>
      );
    }else{
      return(
          <View style={customStyle.container}>
            <Text style={customStyle.titleText}>CoffeeDa</Text>
            <Image
              style={customStyle.stretch}
              source={require('./images/coffee.jpg')}
            />
            <TouchableOpacity
                style={customStyle.button1}
                  onPress={() =>navigation.navigate('LeaveReviews')}>
                <Text style={customStyle.buttonText}>Leave Reviews</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={customStyle.button1}
                onPress={() =>navigation.navigate('ViewReviews')}>
                <Text style={customStyle.buttonText}>View Reviews</Text>
            </TouchableOpacity>
              <TouchableOpacity
                style={customStyle.button1}
                onPress={() =>navigation.navigate('SeeLocalCoffee')}
                >
                <Text style={customStyle.buttonText}>See Local coffee</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={customStyle.button1}
                onPress={() =>navigation.navigate('UserInfo')}>
                <Text style={customStyle.buttonText}>My Account</Text>

            </TouchableOpacity>
          </View>
      );
    }
  }
}
const customStyle = StyleSheet.create({ // styles the text on the screen
  container:{
    flex: 1,
    alignItems: 'center',
    //justifyContent: 'center',
    backgroundColor: '#41393E'
  },
  titleText: { // styles the text colour and style
    color: '#C7E8F3',
    fontSize: 50,
    fontWeight:"bold"
  },
  buttonText:{
    color: '#C7E8F3',
    fontSize: 20,
    fontWeight:'bold',
    //justifyContent: 'center'
  },
  button1:{
    height: 10,
    width: '100%',
    padding: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 10,
    borderColor: '#8E4162',
    margin:2
  },
  stretch: {
    width: 150,
    height: 150,
    resizeMode: 'stretch'
  }

});

export default HomeScreen;
