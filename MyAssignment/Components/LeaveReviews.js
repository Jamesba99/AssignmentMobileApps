import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
class LeaveReviews extends Component{
  componentDidMount(){
      this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.checkLoggedIn();
    });

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
    const navigation = this.props.navigation;
    return(
        <View>
          <Text>Home Screen</Text>
          <Button
            title="Back"
            onPress={() =>navigation.goBack()}
          />
        </View>
    );
  }
}

export default LeaveReviews;
