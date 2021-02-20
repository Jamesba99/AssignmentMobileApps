import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, ToastAndroid, SafeAreaView, TouchableOpacity } from 'react-native';
import {ScrollView, TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

class LoginScreen extends Component {
    constructor(props){
        super(props);

        this.state={
            email: "",
            password: "",
            id: []
        }
    }

    login = async () => {
      //valadation is created here

        return fetch("http://10.0.2.2:3333/api/1.0.0/user/login", {
            method: 'post',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(this.state)
          })
          .then((response) => {
              if(response.status === 200){
                  return response.json()
              }else if(response.status === 400){
                  throw ' invalid email or password';
              }else{
                  throw 'Something went wrong';
              }
          })

          .then(async (responseJson) => {
              console.log(responseJson);
              await AsyncStorage.setItem('@session_token', responseJson.token);
              await AsyncStorage.setItem('id', responseJson.id.toString());
              this.props.navigation.navigate("HomeScreen");
          })


          .catch((error) => {
              console.log(error);
              ToastAndroid.show(error,ToastAndroid.SHORT);
          })
    }

    render(){
        const navigation = this.props.navigation;
        return(
            <SafeAreaView style={customStyle.container}>
              <ScrollView>
                  <Text style={ customStyle.text }>      Welcome to</Text>
                  <Text style={ customStyle.text }>CoffeeDa Reviews!</Text>
                  <Text style={customStyle.text}>    Login to begin </Text>
                  <TextInput
                      placeholder="Enter your email"
                      onChangeText={(email) => this.setState({email})}
                      backgroundColor= '#C7E8F3'
                      value={this.state.email}
                      style={customStyle.textInput}
                  />
                  <TextInput
                      placeholder="Enter your password"
                      onChangeText={(password) => this.setState({password})}
                      backgroundColor= '#C7E8F3'
                      value={this.state.password}
                      secureTextEntry
                      style={customStyle.textInput}
                  />
                  <TouchableOpacity
                      style={customStyle.button1}
                        onPress={() => this.login()}>
                      <Text style={customStyle.buttonText}>Login!</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                      style={customStyle.button1}
                      onPress={() =>navigation.navigate('Register')}>
                      <Text style={customStyle.buttonText}>Don't have an account? register now!</Text>
                  </TouchableOpacity>
                </ScrollView>
              </SafeAreaView>
        );
    }

}
const customStyle = StyleSheet.create({ // styles the text on the screen
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#41393E'
  },
  text: { // styles the text colour and style
    color: '#C7E8F3',
    fontSize: 40,
    fontWeight:"bold",
    justifyContent: 'center'
  },
  textInput:{
    padding:5,
    borderWidth:1,
    margin:5
  },
  button1:{
    height: 60,
    width: 300,
    padding: 10,
    alignItems: 'center',
    borderWidth: 10,
    borderColor: '#8E4162',
    margin:10
  },
  buttonText:{
    color: '#C7E8F3',
    fontSize: 15,
    fontWeight:'bold',
    //justifyContent: 'center'
  }
});
export default LoginScreen;
