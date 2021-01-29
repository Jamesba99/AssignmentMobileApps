import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, ToastAndroid } from 'react-native';
import {ScrollView, TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

class LoginScreen extends Component {
    constructor(props){
        super(props);

        this.state={
            email: "",
            password: ""
        }
    }

    login =async () => {
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
              await AsyncStorage.setItem('@session_token', responseJson.this)
              this.props.navigation.navigate("Home");
          })
          .catch((error) => {
              console.log(error);
              ToastAndroid.show(error,ToastAndroid.SHORT);
          })

    }

    render(){
        return(
            <ScrollView>
                <TextInput
                    placeholder="Enter your email"
                    onChangeText={(email) => this.setState({email})}
                    value={this.state.email}
                    style={{padding:5,boarderWidth:1, margin:5}}
                />
                <TextInput
                    placeholder="Enter your password"
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                    //secureTextEntry
                    style={{padding:5,boarderWidth:1, margin:5}}
                />
                <Button
                    title="Login"
                    onPress={() => this.login()}
                />
                <Button
                    title="Don't have an account?"
                    onPress={() => this.props.navigation.navigate("Register")}
               />
            </ScrollView>
        )
    }

}

export default LoginScreen;
