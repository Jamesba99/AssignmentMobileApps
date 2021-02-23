import React, { Component } from 'react';
import { Text, View, Button, ToastAndroid, SafeAreaView, TouchableOpacity, StyleSheet, Alert, FlatList, StatusBar, Image} from 'react-native';
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
        viewLocationReviews: '' ,
        locations: [],
        isLoading: true,
        location_reviews: []

      }
    }

    componentDidMount(){
      const {loc_id} = this.props.route.params.location_id;
      this.setState({
        viewLocationReviews: loc_id
        })
    }

    componentWillUnmount(){
    }
  render(){

    const navigation = this.props.navigation;
    const {location_name} = this.props.route.params;
    const {location_town} = this.props.route.params;
    const {avg_overall_rating}= this.props.route.params;
    const {avg_price_rating} = this.props.route.params;
    const {avg_quality_rating} = this.props.route.params;
    const {avg_cleniness_rating} = this.props.route.params;
    const {review_body} = this.props.route.params;

    console.log(review_body)
    return(
      <SafeAreaView style={ styles.container }>
        <Image
          style={styles.stretch}
          source={require('./images/coffeeReview.jpg')}
        />
        <Text style={styles.titleText}> Review of {(location_name)}</Text>
        <View style={styles.titleText}>
          <Text style={styles.resultsText}> Reviews on { (location_name )}{(location_town)} </Text>
          <Text style={styles.resultsText}> Overall rating is: { (avg_overall_rating) }</Text>
          <Text style={styles.resultsText}> Price Rating: { (avg_price_rating) } </Text>
          <Text style={styles.resultsText}> Quality Rating Rating: { (avg_quality_rating) } </Text>
          <Text style={styles.resultsText}> Review body: { (review_body) } </Text>
        </View>
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
    fontSize: 30,
    fontWeight: 'bold'
  },
  resultsText:{
    textAlignVertical: 'top',
    color: '#C7E8F3',
    fontSize: 20,
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
  stretch: {
flex:1
  }

});
export default FlatListOutput;
