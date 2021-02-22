import React, { Component } from 'react';
import { Text, View, Button, ToastAndroid, TextInput, SafeAreaView, TouchableOpacity, StyleSheet, Alert, FlatList, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class EditUSerDetails extends Component{
    constructor(props){
      super(props);
//put user detts back in
      this.state = {
        isLoading: true,
        first_name: "",
        last_name: "",
        email: "",
        userEmail: "",
        firstName: "",
        lastName: "",

      };
    }
//------------------------------------------------------------------------------
    componentDidMount(){
        this.getData();
    }

// get data --------------------------------------------------------------------
    getData = async () => {
      let token = await AsyncStorage.getItem('@session_token');
      let id = await AsyncStorage.getItem('id');

      return fetch("http://10.0.2.2:3333/api/1.0.0/user/"+ (id), {
          method: 'get',
          headers:{
            "X-Authorization": token
          },
      })
      .then((response)=> {
        if(response.status === 200){
          return response.json()
          console.log(response)

          }else if(response.status === 400){
            throw 'Bad Request';
          }else if(response.status === 401){
              throw '401 Unauthorized';
              console.log(response);
          }else if (response.status === 404){
              throw 'Not found';
          }else if (response.status === 500){
              throw 'server error';
          }
      })
      .then((responseJson) =>{
        console.log(responseJson);
        this.setState({
          firstName: responseJson.first_name,
          lastName: responseJson.last_name,
          userEmail: responseJson.email
        })
        console.log(this.state.firstName);
        console.log(this.state.lastName);
        console.log(this.state.userEmail)
      })
      .catch((error)=> {
        console.log(error);
        ToastAndroid.show(error,ToastAndroid.SHORT);
      })
    }
//------------------------------------------------------------------------------
//will need to parse any data that is a number
  updateUserDetails = async () => {

    let sendVariables = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email
    }

    console.log(sendVariables)

    let token = await AsyncStorage.getItem('@session_token');
    let id = await AsyncStorage.getItem('id');

    return fetch("http://10.0.2.2:3333/api/1.0.0/user/"+ (id) , {
      method: 'patch',
        headers:{
          'Content-Type': 'application/json',
          "X-Authorization": token
        },
        body: JSON.stringify(sendVariables)
    })
    .then((response) => {

      if(response.status === 200){
          return response
          console.log(response);
          ToastAndroid.show(responseJson,ToastAndroid.SHORT);
      }else if(response.status === 400){
        throw 'Bad Request';
      }else if(response.status === 401){
          throw '401 Unauthorized';
          console.log(response);
      }else if (response.status === 403){
          throw 'forbidden'
          console.log(response);
      }else if (response.status === 404){
          throw 'Not found';
      }else if (response.status === 500){
          throw 'server error';
      }
    })
    .then((responseJson) =>{
      console.log(responseJson);
      this.props.navigation.navigate("HomeScreen")
    })
    .catch((error) => {
      console.log(error)
    })
  }

//------------------------------------------------------------------------------
/***
checks whether logged in.
***/
  checkLoggedIn = async () => {
    const value = await AsyncStorage.getItem('@session_token');
    if (value == null) {
        this.props.navigation.navigate('LoginScreen');
    }
  };
//------------------------------------------------------------------------------
  /***
  the components of the file
  ***/
// add is loading
  render(){
      const navigation = this.props.navigation; // declaring the navigation constant
      return(
        <SafeAreaView style={ styles.container }>
          <View>
            <Text style={ styles.titleText }> My Account </Text>
            <Text style={ styles.resultsText }> Forename: {this.state.firstName} | Surname: {this.state.lastName} </Text>
            <Text style={ styles.resultsText }> Email: {this.state.userEmail} </Text>

            <TextInput
                placeholder="Enter your first name"
                onChangeText={(first_name) => this.setState ({first_name})}
                backgroundColor="#C7E8F3"
                value={this.state.first_name}
                style={{padding:5, borderWidth:1, margin:5}}
            />
            <TextInput
                placeholder="Enter your second name"
                onChangeText={(last_name) => this.setState ({last_name})}
                backgroundColor="#C7E8F3"
                value={this.state.last_name}
                style={{padding:5, borderWidth:1, margin:5}}
            />
            <TextInput
                placeholder="Enter your email"
                onChangeText={(email) => this.setState ({email})}
                backgroundColor="#C7E8F3"
                value={this.state.email}
                style={{padding:5, borderWidth:1, margin:5}}
            />
            <TouchableOpacity
                style={styles.button1}
                onPress={()  =>this.updateUserDetails() }>
                <Text style={styles.buttonText }> Update User Details </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button1}
                onPress={() =>navigation.navigate('HomeScreen')}>
                <Text style={styles.buttonText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button1}
                onPress={() =>navigation.goBack()}>
                <Text style={styles.buttonText}>Go Back</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      );
    }
}
const styles = StyleSheet.create({ // styles the text on the screen
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
    fontSize: 25,
    fontWeight:'bold',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button1:{
    height: 30,
    width: 345,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 10,
    borderColor: '#8E4162',
    margin:1
  },
  resultsText:{
    textAlignVertical: 'top',
    margin:5,
    color: '#C7E8F3',
    fontSize: 20,
    fontWeight:'bold',
    backgroundColor: '#8E4162',
    borderColor:'#C7E8F3'
  }

});

export default EditUSerDetails;
