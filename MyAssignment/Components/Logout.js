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
          <Text style={ styles.titleText }> Are You Sure  </Text>
          <Text style={ styles.titleText }> You Want To  </Text>
          <Text style={ styles.titleText }> Logout? </Text>
            <TouchableOpacity
              style={styles.button1}
              onPress={() => this.logout()}
              >
              <Text style={styles.buttonText}>Logout!</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button1}
              onPress={() => navigation.goBack()}
              >
              <Text style={styles.buttonText}>No - Back!</Text>
            </TouchableOpacity>

        </SafeAreaView>
      );
  }


}
const styles = StyleSheet.create({ // styles the text on the screen
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#41393E'
  },
  titleText: { // styles the text colour and style
    color: '#C7E8F3',
    fontSize: 50,
    fontWeight:"bold"
  },
  text: { // styles the text colour and style
    color: '#C7E8F3',
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
    height: 100,
    width: '100%',
    padding: 10,
    alignItems: 'center',
    borderWidth: 10,
    borderColor: '#8E4162',
    margin:10
  },
  buttonText:{
    color: '#C7E8F3',
    fontSize: 30,
    fontWeight:'bold',
    justifyContent: 'center'
  }
});


export default LogoutScreen;
