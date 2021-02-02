import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, ToastAndroid, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      this.checkLoggedIn();
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
        this.props.navigation.navigate('Login');
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
          alignItems: 'center'
          }}>
          <Text> loading </Text>
      </View>
      );
    }else{
      return(
          <View style={styles.container}>
            <Text style={styles.titleText}>HomeScreen</Text>
        
            <TouchableOpacity
                style={styles.button1}
                  onPress={() =>navigation.navigate('LeaveReviews')}>
                <Text style={styles.buttonText}>Leave Reviews</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button1}
                onPress={() =>navigation.navigate('ViewReviews')}>
                <Text style={styles.buttonText}>View Reviews</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button1}
                onPress={() =>navigation.navigate('SeeLocalCoffee')}
                >
                <Text style={styles.buttonText}>See Local coffee</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button1}
                onPress={() =>navigation.navigate('LogoutScreen')}>
                <Text style={styles.buttonText}>Logout</Text>

            </TouchableOpacity>
          </View>
      );
    }
  }
}
const styles = StyleSheet.create({ // styles the text on the screen
  container:{
    flex: 1,
    alignItems: 'center',
    //justifyContent: 'center',
    backgroundColor: 'brown'
  },
  titleText: { // styles the text colour and style
    color: 'white',
    fontSize: 50,
    fontWeight:"bold"
  },
  buttonText:{
    color: 'white',
    fontSize: 20,
    fontWeight:'bold',
    //justifyContent: 'center'
  },
  button1:{
    height: 60,
    width: 320,
    padding: 5,
    alignItems: 'center',
    borderWidth: 10,
    borderColor: 'green',
    margin:5
  },
  logo: {
   width: 66,
   height: 58,
 }

});

export default HomeScreen;
