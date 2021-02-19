import React, { Component } from 'react';
import { Text, View, Button, ToastAndroid, SafeAreaView, TouchableOpacity, StyleSheet, Alert, FlatList, StatusBar} from 'react-native';
import {ScrollView, TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Rating, AirbnbRating } from 'react-native-elements';

import ViewReviews from './ViewReviews'


/**
TO DO
- complete the ratings page
-format the page
https://www.youtube.com/watch?v=GPUiY0qJTiI
// make a stack nav page that appears on the next with results
***/

class FlatListOutput extends Component{
    constructor(props){
      super(props);
      this.state = {
        isRight: '' ,
        locations: [],
        isLoading: true,
        location_reviews: []

      }
    }

    componentDidMount(){
        const loc_id = this.props.route.params.location_id;
        this.setState({
          isRight: loc_id
        })
        this.getData();
    }


    getData = async () => {
      console.log("working");
      let token = await AsyncStorage.getItem('@session_token');
      return fetch("http://10.0.2.2:3333/api/1.0.0/location/" + (this.state.isRight) ,{
        method: 'get',
        headers: {
              'Content-Type': 'application/json',
              'X-Authorization': token
            }
        })

    .then((response) => {
      if (response.status = 200) {
        return response.json();
      }else if (response.status === 404){
          throw 'Not found';
      }else if (response.status === 500){
          throw 'server error';
      } else{
        throw 'something else';
      }
    })
    .then((responseJson) => {
      console.log(responseJson)
      this.setState({
        isLoading: false,
        locations: responseJson,
        location_reviews: responseJson
      })
    })
    .catch((err)=> {
      console.log(err);
      ToastAndroid.show(err,ToastAndroid.SHORT);
    });
  }

  render(){

    const navigation = this.props.navigation;
    console.log(this.state.locations.location_name)

    return(

      <SafeAreaView style={ styles.container }>
        <Text style={styles.resultsText}> reviews on { this.state.locations.location_name } </Text>
        <Text style={styles.resultsText}> overall rating is: { this.state.locations.avg_overall_rating }</Text>
        <Text style={styles.resultsText}> overall rating is: { this.state.locations.cleniness_rating }</Text>


        <Button
          title="Back"
          color="#8E4162"
          fontColor= "Black"
          onPress={() =>navigation.goBack()}
        />
      </SafeAreaView>
    );
  }
}

//https://www.youtube.com/watch?v=GPUiY0qJTiI
const styles = StyleSheet.create({ // styles the text on the screen
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#41393E'
  },
  flatLisText: { // styles the text colour and style
    flex: 1,
    color: '#C7E8F3',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 1,
    fontSize: 50
  },
  textInput:{
    padding:5,
    alignItems: 'center',
    borderWidth:1,
    margin:5
  },
  titleText: { // styles the text colour and style
    flex: 1,
    color: '#C7E8F3',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 1,
    fontSize: 50
  },
  resultsText:{
    color: '#C7E8F3',
    fontSize: 15,
    fontWeight:'bold',
  },
  ratingFields:{
    flex: 1,
    color: '#C7E8F3',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 1,
    fontSize: 50
  },
  ratingsTitleText : { // styles the text colour and style
    color: '#C7E8F3',
    padding: 1,
    fontWeight: 'bold',
    fontSize: 25
  },

});
export default FlatListOutput;
