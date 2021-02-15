import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, ToastAndroid, SafeAreaView, TouchableOpacity } from 'react-native';
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
          first_nameError: "",
          last_name: "",
          last_nameError: "",
          email:"",
          EmailError:"",
          password: "",

        }
    }
/**
Signup variable is made with an arrow function pointing towards the server
initiating the post method
Then when data is inputted  returns a response depending on the status code
**/
    signup = () => {
      //validation here - make sure the email is valid etc
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
      .then((responseJson) => {
          console.log("User created with ID: ", responseJson);
          ToastAndroid.show("Account has been created",ToastAndroid.SHORT);
          this.props.navigation.navigate("LoginScreen")
      })
      .catch((error)=> {
          console.log(error);
          ToastAndroid.show(error,ToastAndroid.SHORT);
      })
    }
    /**
creates the input boxes and the input area of them
While navigation buttons are added to help with navigation of the app
    **/
/**
 validator to make sure the gaps are filled
**/
// to create a letter only when numbers pop up it fails
    submit(){
      let rjx=/^[a-zA-z]+$/;
      let isValid=rjx.test(this.state.first_name)
      console.warn(isValid)

      if(!isValid)
      {
        this.setState({first_nameError:"name can not be number"})
      }
      else
      {
          this.setState({first_nameError:""})
      }
    }

    emailValidator(){

        if(this.state.email=="")
        {
          this.setState({EmailError:"email can not be empty"})
        }
        else
        {
            this.setState({EmailError:""})
        }
    }

    render(){
          const navigation = this.props.navigation;
          return (
            <SafeAreaView style={styles.container}>
              <ScrollView>
                  <Text style={styles.text}>RegisterScreen</Text>
                  <TextInput
                      placeholder="Enter your first name"
                      onChangeText={(first_name) => this.setState ({first_name})}
                      backgroundColor="#C7E8F3"
                      onBlur={()=>this.submit()}
                      value={this.state.first_name}
                      style={{padding:5, borderWidth:1, margin:5}}
                  />
                  <Text style={styles.errorMessage}> {this.state.first_nameError}</Text>

                  <TextInput
                      placeholder="Enter your second name"
                      onChangeText={(second_name) => this.setState ({second_name})}
                      backgroundColor="#C7E8F3"
                      value={this.state.second_name}
                      style={{padding:5, borderWidth:1, margin:5}}
                  />

                  <TextInput
                      placeholder="Enter your email"
                      onChangeText={(email) => this.setState ({email})}
                      onBlur={()=>this.emailValidator()}
                      backgroundColor="#C7E8F3"
                      value={this.state.email}
                      style={{padding:5, borderWidth:1, margin:5}}
                  />
                  <Text style={styles.errorMessage}> {this.state.EmailError}</Text>
                  <TextInput
                      placeholder="Enter your password"
                      onChangeText={(password) => this.setState ({password})}
                      backgroundColor="#C7E8F3"
                      value={this.state.password}
                      minLength={5}
                    //secureTextEntry
                      style={{padding:5, borderWidth:1, margin:5}}
                  />
                  <Text style={styles.errorMessage}> {this.state.error}</Text>
                  <TouchableOpacity
                      style={styles.button1}
                      onPress={()=> this.signup()}>
                      <Text style={styles.buttonText}>Create Account!</Text>
                  </TouchableOpacity>

                  <Button
                      title="Back"
                      color="#8E4162"
                      onPress={() =>navigation.goBack()}
                  />
              </ScrollView>
            </SafeAreaView>
        )

    }

}

const styles = StyleSheet.create({ // styles the text on the screen
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#41393E'
  },
  text: { // styles the text colour and style
    color: '#C7E8F3',
    fontSize: 25
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
  },
  errorMessage:{
  color: 'black',
  marginLeft: 20
 }
});
  export default Register;
