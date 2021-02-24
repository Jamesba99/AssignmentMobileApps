import React, { Component } from 'react';
import { Text, View, Button, ToastAndroid, SafeAreaView, TouchableOpacity, StyleSheet, Alert, FlatList, StatusBar} from 'react-native';
import {ScrollView, TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Rating, AirbnbRating, RatingProps } from 'react-native-elements';

//import FlatListOutput from './FlatListOutput';
/**
TO DO tomorrow:
start with the crea



IF STATEMENT WITH IS LOADING IS CONSITIONAL RENDERING TALK ABOUT IT IN SCREEN CAST


Editing the stars documentation https://openbase.com/js/react-native-ratings

***/


class ViewReviews extends Component{
    constructor(props){
      super(props);
      this.state = {
        isLoading: true,
        locations: null,
        q: '',
        location_reviews: [],
        avg_overall_rating: 0,
        avg_price_rating: 0,
        avg_quality_rating: 0,
        avg_clenliness_rating: 0,
        search_in: 0,
        limit: 20,
        offset: 0,
      }
    }

    componentDidMount(){
      this.getData("http://10.0.2.2:3333/api/1.0.0/find");

    }

    getData = async (url) => {
      let token = await AsyncStorage.getItem('@session_token');
      return fetch(url, {
          headers: {
            "X-Authorization": token
          },
      })
    .then((response) => {
      if (response.status = 200) {
        return response.json();
      } else {
        throw 'Error Please add the rest';
      }
    })
    .then((responseJson) => {
      this.setState({
        isLoading: false,
        locations: responseJson,
        location_reviews: responseJson.location_reviews
      })
      console.log(responseJson)
    })
    .catch((err)=> {
      console.log(err);
      ToastAndroid.show(err,ToastAndroid.SHORT);
    })
  }
    search = () => {
      let url = "http://10.0.2.2:3333/api/1.0.0/find?"

    //  console.log("Q = ");
    //  console.log("overall rating =");
    //  console.log(this.state.overall_rating);

      if(this.state.q != ''){
        url += "q=" + this.state.q + "&";
      }

      if (this.state.avg_overall_rating > 0){
        url += "overall_rating=" + this.state.avg_overall_rating + "&";
      }
      if (this.state.avg_price_rating > 0){
        url += "price_rating=" + this.state.avg_price_rating  + "&";
      }
      if (this.state.avg_quality_rating > 0){
        url += "quality_rating=" + this.state.avg_quality_rating  + "&";
      }
      if (this.state.avg_clenliness_rating > 0){
        url += "clenliness_rating=" + this.state.avg_clenliness_rating  + "&";
      }
      this.getData(url);

    }

    ratingCompleted(rating, name){
      let stateObject = () => {
        let returnObj = {};
        returnObj[name] = rating;
        return returnObj;
      };
      this.setState( stateObject );
    }

      componentWillUnmount (){
    }

    checkLoggedIn = async () => {
      const value = await AsyncStorage.getItem('@session_token');
      if (value == null) {
          this.props.navigation.navigate('LoginScreen');
        }
      };
// to add review bodies need of a review inside a review
    render(){
      console.log(this.state.location_reviews);
      const navigation = this.props.navigation;
        return(

          <SafeAreaView  style={customStyle.container}>
            <View>
                <Text style={customStyle.titleText}>View Reviews</Text>
                <TextInput
                  value={this.state.q}
                  onChangeText={(q) => this.setState({q: q})}
                  placeholder= "Enter your search criteria "
                  backgroundColor="#C7E8F3"
                  style={customStyle.textInput}
                />
                <Text style={customStyle.ratingsTitleText}>overall_rating </Text>
                <AirbnbRating
                  size={15}
                  reviewColor= '#C7E8F3'
                  reviews={["Awful!", "Bad", "OK", "Good", "Only the Best Results!"]}
                  defaultRating={0}
                  selectedColor="#8E4162"
                  onFinishRating={(rating) => this.ratingCompleted( rating, "avg_overall_rating")}
                />
                <Text style={customStyle.ratingsTitleText}>price_rating </Text>
                <AirbnbRating
                  size={15}
                  reviewColor= '#C7E8F3'
                  reviews={["Awful!", "Bad", "OK", "Good", "Only the Best Results!"]}
                  defaultRating={0}
                  selectedColor="#8E4162"
                  onFinishRating={(rating) => this.ratingCompleted( rating, "avg_price_rating")}
                />
                <Text style={customStyle.ratingsTitleText}>quality_rating </Text>
                <AirbnbRating
                  size={15}
                  reviewColor= '#C7E8F3'
                  reviews={["Awful!", "Bad", "OK", "Good", "Only the Best Results!"]}
                  defaultRating={0}
                  selectedColor="#8E4162"
                  onFinishRating={(rating) => this.ratingCompleted( rating, "avg_price_rating")}
                />
                  <TouchableOpacity
                      style={customStyle.button1}
                      onPress={() =>this.search()}>
                      <Text style={customStyle.touchOpacityText}>Search</Text>
                  </TouchableOpacity>
                  <FlatList
                    data={this.state.locations}
                    renderItem={({item}) => (
                        <View style={customStyle.flatListView}>
                          <Text style={customStyle.resultsText}> Coffee Shop: { item.location_name }</Text>
                          <Text style={customStyle.resultsText}> Coffee Shop Town: { item.location_town }</Text>
                          <Text style={customStyle.resultsText}> Overall Rating: { item.avg_overall_rating } </Text>
                          <Text style={customStyle.resultsText}> Price Rating: { item.avg_price_rating } </Text>
                          <Text style={customStyle.resultsText}> Quality Rating Rating: { item.avg_quality_rating } </Text>
                          <Text style={customStyle.resultsText}> Clenliness Rating : { item.avg_clenliness_rating } </Text>
                          <TouchableOpacity
                            style={customStyle.button1}
                            onPress={() => {
                              this.props.navigation.navigate("FlatListOutput", {
                                 location_id: item.location_id,
                                 location_name: item.location_name ,
                                 location_town: item.location_town,
                                 avg_overall_rating: item.avg_overall_rating,
                                 avg_price_rating: item.avg_price_rating,
                                 avg_quality_rating: item.avg_quality_rating,
                                 avg_clenliness_rating: item.avg_clenliness_rating,
                                 location_reviews: item.location_reviews,
                                 overall_rating: item.overall_rating,
                                 })
                            }}>
                            <Text style={customStyle.touchOpacityText}> View review in detail</Text>
                          </TouchableOpacity>
                        </View>
                    )}
                    keyExtractor={(item, index) => item.location_id.toString()}
                    />
                    <TouchableOpacity
                        style={customStyle.navButton}
                        onPress={() =>navigation.navigate('HomeScreen')}>
                        <Text style={customStyle.homeTouchOpacity}>Home</Text>
                    </TouchableOpacity>
              </View>
            </SafeAreaView>
        );
      }
}
//    this.props.navigation.navigate('ViewReviews', {screen: "FlatListOutput"}
//https://www.youtube.com/watch?v=GPUiY0qJTiI
const customStyle = StyleSheet.create({ // styles the text on the screen
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
    color: '#C7E8F3',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 1,
    margin: 2,
    fontSize:50,
    fontWeight: 'bold',
    flexWrap: 'wrap'
  },
  resultsText:{
    color: '#C7E8F3',
    fontSize: 15,
    fontWeight:'bold',
    padding: 1
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
  button1:{
    height: 60,
    width: 340,
    padding: 10,
    alignItems: 'center',
    borderWidth: 10,
    borderColor: '#8E4162',

  },
  touchOpacityText: { // styles the text colour and style
    color: '#C7E8F3',

    fontSize: 20,
    fontWeight:'bold',
    justifyContent: 'center',
    alignItems: 'center',

  },
  homeTouchOpacity: {
    color: '#C7E8F3',
    fontSize: 20,
    fontWeight:'bold',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5
  },
  flatListView: { // styles the text colour and style
    flex: 1,
    color: '#C7E8F3',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 1,
    fontSize: 50,
    margin:2
  },
  navButton:{
    height: 5,
    width: 340,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 10,
    borderColor: '#8E4162',
    margin:2,
  },

});
export default ViewReviews;
