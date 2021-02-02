import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, ToastAndroid, SafeAreaView, TouchableOpacity } from 'react-native';
import {ScrollView, TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

class LogoutScreen extends Component {
  constructor(props){
      super(props);
  }

  logout = async () => {
    let token = await AsyncStorage.getItem('@session_token');
    await AsyncStorage.removeItem('@session_token');
    return fetch("http://10.0.2.2:3333/api/1.0.0/user/logout",{
        method: 'post',
        headers: {
          "X-Authorization": token
        }
    })
    .then((response)=> {
      if(response.status === 200){
        ToastAndroid.show("Succesfully  gone!", ToastAndroid.SHORT);
        this.props.navigation.navigate("LoginScreen");
      }else if(response.status === 401){
          ToastAndroid.show("you werent logged in", ToastAndroid.SHORT);
          this.props.navigation.navigate("LoginScreen");
      }else{
          throw 'Something went wrong';
      }
    })
    .catch((error)=> {
      console.log(error);
      ToastAndroid.show(error,ToastAndroid.SHORT);
    })
  }
  render(){
    const navigation = this.props.navigation;
      return(
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <TouchableOpacity
              style={styles.button1}
              onPress={() => this.logout()}
              >
              <Text style={styles.buttonText}>Logout!</Text>
            </TouchableOpacity>
          <Button
              title="Back"
              color="green"
              onPress={() =>navigation.goBack()}
            />
          </ScrollView>
        </SafeAreaView>
      );
  }


}
const styles = StyleSheet.create({ // styles the text on the screen
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'brown'
  },
  text: { // styles the text colour and style
    color: 'white',
    fontSize: 50,
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
    borderColor: 'green',
    margin:10
  },
  buttonText:{
    color: 'white',
    fontSize: 15,
    fontWeight:'bold',
    justifyContent: 'center'
  }
});


export default LogoutScreen;
