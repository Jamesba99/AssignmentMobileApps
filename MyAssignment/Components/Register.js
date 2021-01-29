import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, ToastAndroid } from 'react-native';
import {ScrollView, TextInput } from 'react-native-gesture-handler';
/**
Makes a class called register to register an account
makes a constructor that will create props for each field that needs to be entered
**/
class Register extends Component{
    constructor(props){
        super(props);

        this.state = {
          first_name: "",
          last_name: "",
          email:"",
          password: ""
        }
    }
/**
Signup variable is made with an arrow function pointing towards the server
initiating the post method
Then when data is inputted  returns a response depending on the status code
**/
    signup = () => {
      //validation here
      return fetch("http://10.0.2.2:3333/api/1.0.0/user",{
          method: 'post',
          headers:{
                'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.state)
      })
      .then((response) => {
          if(response.status === 201){
            return response.json()
          }else if(response.status === 400){
              throw 'Failed Validation';
          }else{
            throw 'Something went wrong';
          }
      })
      .then(async (responseJson) => {
          console.log("User created with ID: ", responseJson);
      })
      .catch((error)=> {
          console.log(error);
          ToastAndroid.show(error,ToastAndroid.SHORT);
          // check slides for what goes here
      })
    }
    /**
creates the input boxes and the input area of them
While navigation buttons are added to help with navigation of the app
    **/
    render(){
          const navigation = this.props.navigation;
          return (
              <ScrollView>
                  <Text style={styles.text}>RegisterScreen</Text>
                  <TextInput
                      placeholder="Enter your first name"
                      onChangeText={(first_name) => this.setState ({first_name})}
                      value={this.state.first_name}
                      style={{padding:5, boarderWidth:1, margin:5}}
                  />
                  <TextInput
                      placeholder="Enter your second name"
                      onChangeText={(second_name) => this.setState ({second_name})}
                      value={this.state.second_name}
                      style={{padding:5, boarderWidth:1, margin:5}}
                  />
                  <TextInput
                      placeholder="Enter your email"
                      onChangeText={(email) => this.setState ({email})}
                      value={this.state.email}
                      style={{padding:5, boarderWidth:1, margin:5}}
                  />
                  <TextInput
                      placeholder="Enter your password"
                      onChangeText={(password) => this.setState ({password})}
                      value={this.state.password}
                    //secureTextEntry
                      style={{padding:5, boarderWidth:1, margin:5}}
                  />
                  <Button
                      title= "create an account!!"
                      onPress={()=> this.signup()}
                  />

                  <Button
                      title="Back"
                      onPress={() =>navigation.goBack()}
                  />
              </ScrollView>
        )

    }

}

const styles = StyleSheet.create({ // styles the text on the screen
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'brown'
  },
  text: { // styles the text colour and style
    color: 'red',
    fontSize: 25
  }
});
  export default Register;
