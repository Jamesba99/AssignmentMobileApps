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




***/


class ViewReviews extends Component{
    constructor(props){
      super(props);
      this.state = {
        isLoading: true,
        locations: null,
        q: '',
        overall_rating: 0,
        price_rating: 0,
        quality_rating: 0,
        cleniness_rating: 0,
        search_in: 0,
        limit: 20,
        offset: 0,
      }
    }

    componentDidMount(){
      this.unsubscribe = this.props.navigation.addListener('focus', () => {
        });
      this.getData("http://10.0.2.2:3333/api/1.0.0/find");
      this.checkLoggedIn();
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

      if (this.state.overall_rating > 0){
        url += "overall_rating=" + this.state.overall_rating + "&";
      }
      if (this.state.price_rating > 0){
        url += "price_rating=" + this.state.price_rating  + "&";
      }
      if (this.state.quality_rating > 0){
        url += "cleniness_rating=" + this.state.quality_rating  + "&";
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
        this.unsubscribe();
    }

    checkLoggedIn = async () => {
      const value = await AsyncStorage.getItem('@session_token');
      if (value == null) {
          this.props.navigation.navigate('LoginScreen');
        }
      };

    render(){
      const navigation = this.props.navigation;
        return(
          <SafeAreaView  style={styles.container}>
          <View>
            <Text style={styles.titleText}>View Reviews</Text>
            <TextInput
              value={this.state.q}
              onChangeText={(q) => this.setState({q: q})}
              placeholder= "Enter your search criteria "
              backgroundColor="#C7E8F3"
              style={styles.textInput}
            />
            <Text style={styles.ratingsTitleText}>overall_rating </Text>

            <AirbnbRating
              size={15}
              reviewColor= '#C7E8F3'
              reviews={["Awful!", "Bad", "OK", "Good", "Only the Best Results!"]}
              defaultRating={0}
              selectedColor="#C7E8F3"
              onFinishRating={(rating) => this.ratingCompleted( rating, "avg_overall_rating")}
            />
            <Text style={styles.ratingsTitleText}>price_rating </Text>
            <AirbnbRating
                  size={15}
                  reviewColor= '#C7E8F3'
                  reviews={["Awful!", "Bad", "OK", "Good", "Only the Best Results!"]}
                  defaultRating={0}
                  selectedColor="#C7E8F3"
                      onFinishRating={(rating) => this.ratingCompleted( rating, "avg_price_rating")}
            />
            <Text style={styles.ratingsTitleText}>Quality_rating </Text>
            <AirbnbRating
                  size={15}
                  reviewColor= '#C7E8F3'
                  reviews={["Awful!", "Bad", "OK", "Good", "Only the Best Results!"]}
                  defaultRating={0}
                  selectedColor="#C7E8F3"
                      onFinishRating={(rating) => this.ratingCompleted( rating, "avg_quality_rating")}
            />
            <Text style={styles.ratingsTitleText}>cleniness_rating </Text>
            <AirbnbRating
                  size={15}
                  reviewColor= '#C7E8F3'
                  reviews={["Awful!", "Bad", "OK", "Good", "Only the Best Results!"]}
                  defaultRating={0}
                  selectedColor="#C7E8F3"
                  onFinishRating={(rating) => this.ratingCompleted( rating, "avg_cleniness_rating")}
              />
             <Button
                    style={styles.button1}
                    title="Search"
                    color="#8E4162"
                    onPress={() => {
                      this.search()
                      }}
                />
                <FlatList
                  data={this.state.locations}
                  renderItem={({item}) => (
                      <View style={styles.ratingTitleText}>
                        <Text style={styles.resultsText}> Coffee Shop: { item.location_name }</Text>
                        <Text style={styles.resultsText}> Coffee Shop Town: { item.location_town }</Text>
                        <Text style={styles.resultsText}> Overall Rating: { item.avg_overall_rating } </Text>
                        <Text style={styles.resultsText}> Price Rating: { item.avg_price_rating } </Text>
                        <Text style={styles.resultsText}> Quality Rating Rating: { item.avg_quality_rating } </Text>
                        <Text style={styles.resultsText}> Cleniness Rating : { item.avg_cleniness_rating } </Text>
                        <TouchableOpacity
                          style={styles.button1}
                          onPress={() => {
                            this.props.navigation.navigate("FlatListOutput", {location_id: item.location_id},{ location_name: item.location_name })
                          }}>

                          <Text style={styles.touchOpacityText}> View review in detail</Text>
                        </TouchableOpacity>

                      </View>
                  )}
                  keyExtractor={(item, index) => item.location_id.toString()}
                  />
            </View>
          </SafeAreaView>
        );
      }
}
//    this.props.navigation.navigate('ViewReviews', {screen: "FlatListOutput"}
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
    width: 300,
    padding: 10,
    alignItems: 'center',
    borderWidth: 10,
    borderColor: '#8E4162',
  },
  touchOpacityText: { // styles the text colour and style
    flex: 1,
    color: '#C7E8F3',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 1,
  }
});
export default ViewReviews;
