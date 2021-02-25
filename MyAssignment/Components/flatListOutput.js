import React, { Component } from 'react';
import { Text, View, Button, ToastAndroid, SafeAreaView, TouchableOpacity, StyleSheet, Alert, FlatList, StatusBar, Image} from 'react-native';
import {ScrollView, TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Rating, AirbnbRating } from 'react-native-elements';

import ViewReviews from './ViewReviews';


class FlatListOutput extends Component{
    constructor(props){
      super(props);
      this.state = {
        viewLocationReviews: '' ,
        locations: [],
        isLoading: true,
        location_reviews: null,
        location_id: "",
        locationReviews: null,
        like:""
      }
    }
//------------------------------------------------------------------------------
componentDidMount(){
  this.unsubscribe = this.props.navigation.addListener('focus', () => {
  });

}
// unsubscribed to clear the memory to stop clogedge
//------------------------------------------------------------------------------
componentWillUnmount (){
  this.unsubscribe();
}
    //----------------like a review ------------------------------------------------
        likeAReview = async () => {
          let token = await AsyncStorage.getItem('@session_token');
          return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+(this.state.loc_id)+"/review/"+(this.state.rev_id)+"/like", {
            method: 'post',
              headers:{
                "X-Authorization": token
              },
            })
            .then((response) => {
                  this.props.navigation.navigate('ViewReviews');
                if(response.status === 200){
                  ToastAndroid.show("A like has been added ",ToastAndroid.SHORT);
                  return response
                }else if(response.status === 400){
                    throw 'Bad Request';
                }else if(response.status === 401){
                    throw '401 Unauthorized';
                    console.log(response);
                }else if (response.status === 404){
                    throw 'Not found';
                }else if (response.status === 500){
                    throw 'server error';
                }else{
                  throw 'something went wrong';
                }
                })

                console.log(response)
                .then((response) => {
                  ToastAndroid.show("Like has been added ",ToastAndroid.SHORT);
                  this.setState({
                    isLoading: false,
                    like: response
                  })

                })
                .catch((error) => {
                    console.log(error);
                    ToastAndroid.show(error,ToastAndroid.SHORT);
                })
        }
//-------------unlike a review--------------------------------------------------
        unlikeAReview = async () => {
          let token = await AsyncStorage.getItem('@session_token');
          return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+(this.state.loc_id)+"/review/"+(this.state.rev_id)+"/like", {
            method: 'delete',
              headers:{
                "X-Authorization": token
              },
            })
          .then((response) => {
            this.props.navigation.navigate('ViewReviews');
            if(response.status === 200){
            ToastAndroid.show("Review unliked",ToastAndroid.SHORT);
            }else if(response.status === 400){
                throw 'Bad Request';
            }else if(response.status === 401){
                throw '401 Unauthorized';
                console.log(response);
            }else if(response.status === 403){
                throw '403 forbidden'
                console.log(response);
            }else if (response.status === 404){
                throw 'Not found';
                console.log(response);
            }else if (response.status === 500){
                throw 'server error';
                console.log(response);
            }else{
              throw 'something went wrong';
              console.log(response);
            }
          })
        }

//------------------------------------------------------------------------------
  render(){
    const navigation = this.props.navigation;
    const {location_reviews} = this.props.route.params;
    const {location_name} = this.props.route.params;
    const {location_town} = this.props.route.params;
    const {avg_overall_rating}= this.props.route.params;
    const {avg_price_rating} = this.props.route.params;
    const {avg_quality_rating} = this.props.route.params;
    const {avg_clenliness_rating} = this.props.route.params;
    const {review_body} = this.props.route.params;
    const {quality_rating} = this.props.route.params;
    const { location_id }= this.props.route.params;

    return(
      <SafeAreaView style={ styles.container }>
          <Text style={styles.titleText}> Review of {(location_name)}</Text>
          <Text style={styles.titleText}> {(location_town)} </Text>
          <Text style={styles.resultsText}> Overall rating is: { (avg_overall_rating) }</Text>
          <Text style={styles.resultsText}> Price Rating: { (avg_price_rating) } </Text>
          <Text style={styles.resultsText}> Quality Rating: { (avg_quality_rating) } </Text>
          <Text style={styles.resultsText}> Clenliness Rating: { (avg_clenliness_rating) } </Text>
          <Text style={styles.resultsText}> ----------------------- </Text>
          <FlatList
            data={location_reviews}
            renderItem={({item}) => (
              <View style={ styles.flatListView }>
                <Text style={styles.resultsText}> -------------</Text>
                <Text style={ styles.resultsText }> User { item.review_id }'s Review: </Text>
                <Text style={ styles.resultsText }> Number of Likes : { item.likes } </Text>
                <Text style={ styles.resultsText }> Overall Rating : { item.review_overallrating } </Text>
                <Text style={ styles.resultsText }> Price Rating : { item.review_pricerating } </Text>
                <Text style={ styles.resultsText }> Quality Rating : { item.review_qualityrating } </Text>
                <Text style={ styles.resultsText }> Clenliness Rating : { item.review_clenlinessrating } </Text>
                <Text style={ styles.resultsText }> Review : {item.review_body} </Text>
                <TouchableOpacity
                  style={styles.like}
                  onPress={() => {
                    this.likeAReview()
                    this.setState({
                      loc_id: location_id,
                      rev_id: item.review_id
                    })
                  }}>
                  <Text style={ styles.unlikeFont}> Like!</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.unLike}
                  onPress={() => {
                    this.unlikeAReview()
                    this.setState({
                      loc_id: location_id,
                      rev_id: item.review_id
                    })
                  }}>
                  <Text style={ styles.unlikeFont}> Unlike!</Text>
                </TouchableOpacity>

              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
          <TouchableOpacity
              style={styles.button1}
              onPress={() =>navigation.goBack()}>
              <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>


      </SafeAreaView>
    );
  }
}

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
  //  flex: 1,
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
  },
  buttonText:{
    color: '#C7E8F3',
    fontSize: 20,
    fontWeight:'bold',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5
  },
  button1:{
    height: 10,
    width: '100%',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 10,
    borderColor: '#8E4162',
    margin:2,
  },
  unLike:{
    height: 10,
    width: '100%',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 10,
    borderColor: '#D21404',
    margin:2,
  },
  like:{
    height: 10,
    width: '100%',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 10,
    borderColor: '#74B72E',
    margin:2,
  },
  likeFont:{
    fontSize: 20,
    fontWeight: 'bold',
    color: '#C7E8F3',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 1,
  },
  unlikeFont:{
    fontSize: 20,
    fontWeight: 'bold',
    color: '#C7E8F3',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 1,
  },


});
export default FlatListOutput;
