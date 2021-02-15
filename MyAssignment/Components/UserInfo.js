import React, { Component } from 'react';
import { Text, View, Button, ActivityIndicator, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class UserInfo extends Component{
    constructor(props){
      super(props);

      this.state = {
        isLoading: true,
        userDetails: []
      };
    }
    componentDidMount(){
      this.unsubscribe = this.props.navigation.addListener('focus', () => {
        this.checkLoggedIn();
        this.getData();
      });
    }
    getData(){
    //  console.log("getting data ...");
      return fetch("http://10.0.2.2:3333/api/1.0.0/user/" )
      .then((response) => response.json())
      .then((responseJson) => {
          console.log(responseJson);
          this.setState({
            isLoading: false,
            userDetails: responseJson
          })
      })
    }
  componentWillUnmount (){
      this.unsubscribe();
  }
  checkLoggedIn = async () => {
    const value = await AsyncStorage.getItem('@session_token');
    if (value == null) {
        this.props.navigation.navigate('Login');
    }
  };

  render(){
    if(this.state.isLoading){
      return(
        <View>
          <ActivityIndicator />
        </View>
      );
    }else{
      return(
        <View>
          <View>

          </View>
        </View>
      );
    }
  }
}

export default UserInfo;
