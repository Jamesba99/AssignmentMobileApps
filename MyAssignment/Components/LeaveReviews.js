import React, { Component } from 'react';
import { Text, View, Button, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class LeaveReviews extends Component{
    constructor(props){
      super(props);
      this.state = {
        overall_rating: "",
        price_rating: "",
        quality_rating: "",
        clenliness: "",
        review_Body: "",
      }
    }

    leaveReview = () => {

      return fetch("http://10.0.2.2:3333/api/1.0.0/location/{loc_id}/review",{
        method: 'post',
        headers: {
              'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state)
      })
      .then((response) => {
        if(response.status === 201){
          return response.json()
        }else if(response.status === 400){
            throw 'Bad Request';
        }else if(response.status === 401){
            throw 'Unauthorized';
        }else if (response.status === 404){
            throw 'Not found';
        }else if (response.status === 500){
            throw 'server error';
        }else{
          throw 'something went wrong';
        }
      })
      .then((responseJson) => {
          console.log("Review created with ID", responseJson);
          ToastAndroid
      })
    }





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
