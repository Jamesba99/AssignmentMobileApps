import React, { Component } from 'react';
import { Text, View, Button, ToastAndroid, SafeAreaView, TouchableOpacity, StyleSheet, Alert, FlatList, StatusBar, Image} from 'react-native';
import {ScrollView, TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

import EditReviews from './EditReviews';




/**
TO DO
- complete the ratings page
-format the page
https://www.youtube.com/watch?v=GPUiY0qJTiI
// make a stack nav page that appears on the next with results
***/

class EditReviewFlatlistOutput extends Component{
    constructor(props){
      super(props);
      this.state = {
        viewLocationReviews: '' ,
        locations: [],
        isLoading: true,
        location_reviews: [],
        rev_id:'',
        loc_id:'',
        overall_rating: "",
        price_rating:"",
        quality_rating:"",
        cleniness_rating:"",
        review_body:""
      }
    }
    componentDidMount(){



    }

    componentWillUnmount(){
    }
//-------------------------------------update review----------------------------
    updateUserReview = async () => {
      const { location_id } = this.props.route.params.location_id;
      const { review_id } = this.props.route.params.review_id;
        let sendVariables ={
            overall_rating: parseInt(this.state.overall_rating),
            price_rating: parseInt(this.state.price_rating),
            quality_rating: parseInt(this.state.quality_rating),
            cleniness_rating: parseInt(this.state.cleniness_rating),
            review_body: this.state.review_body
          }

        console.log(sendVariables);

        let token = await AsyncStorage.getItem('@session_token');
        let id = await AsyncStorage.getItem('id');

        return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+(location_id)+"review/"+(review_id) , {
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
          this.props.navigation.navigate("UserInfo")
        })
        .catch((error) => {
          console.log(error)
        })
      }
//------------------------------------------------------------------------------
  deleteReview = async () => {

    let token = await AsyncStorage.getItem('@session_token');
    return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+(this.state.loc_id)+"/review/"+(rev_id), {
      method: 'delete',
        headers:{
          "X-Authorization": token
        },
      })
      .then((response) => {
        this.props.navigation.navigate("UserInfo")
        if(response.status === 200){
        ToastAndroid.show("Review Deleted",ToastAndroid.SHORT);
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

  render(){

    const navigation = this.props.navigation;
    const { overall_rating} = this.props.route.params;
    const { price_rating }= this.props.route.params;
    const { quality_rating } = this.props.route.params;
    const { cleniness_rating } = this.props.route.params;
    const { review_body } = this.props.route.params;
    const { location_town } = this.props.route.params;
    const { location_name } = this.props.route.params;
    const { location_id } = this.props.route.params.location_id;
    const { review_id } = this.props.route.params.review_id;


    return(
      <SafeAreaView style={ customStyle.container }>
        <Text style={ customStyle.titleText}> Your Review of {( location_name )}, {(location_town)}  </Text>
        <Text style={ customStyle.titleText}> Please Enter Your Updated Review: </Text>
        <TextInput
            placeholder="Overall Rating"
            onChangeText={(overall_rating) => this.setState({overall_rating})}
            value={ this.state.overall_rating}
            backgroundColor="#C7E8F3"
            style={{padding:5, borderWidth:1, margin:5, width: '100%'}}
        />
        <TextInput
            placeholder="Price Rating"
            onChangeText={(price_rating) => this.setState({price_rating})}
            value={ this.state.price_rating}
            backgroundColor="#C7E8F3"
            style={{padding:5, borderWidth:1, margin:5, width: '100%'}}
        />
        <TextInput
            placeholder="Quality Rating"
            onChangeText={(quality_rating) => this.setState({quality_rating})}
            value={ this.state.quality_rating}
            backgroundColor="#C7E8F3"
            style={{padding:5, borderWidth:1, margin:5, width: '100%'}}
        />
        <TextInput
            placeholder="Cleniness Rating"
            onChangeText={(cleniness_rating) => this.setState({cleniness_rating})}
            value={ this.state.cleniness_rating}
            backgroundColor="#C7E8F3"
            style={{padding:5, borderWidth:1, margin:5 , width: '100%'}}
        />
        <TextInput
            placeholder=" review_body"
            onChangeText={(review_body) => this.setState({review_body})}
            value={ this.state.review_body}
            backgroundColor="#C7E8F3"
            style={{padding:5, borderWidth:1, margin:5, width: '100%'}}
        />
        <TouchableOpacity
          style={customStyle.button1}
          onPress={() => {
              this.updateUserReview()
          }}>
          <Text style={customStyle.touchOpacityEditInfo}>Update!</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={customStyle.button1}
          onPress={() => {
              this.deleteReview()
          }}>
          <Text style={customStyle.touchOpacityEditInfo}>Changed your mind? Delete the Review!</Text>
        </TouchableOpacity>
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
const customStyle = StyleSheet.create({ // styles the text on the screen
  container:{
    flex: 1,
    alignItems: 'center',
    //justifyContent: 'center',
    backgroundColor: '#41393E'
  },
  titleText: { // styles the text colour and style
    color: '#C7E8F3',
    fontSize: 20,
    fontWeight:"bold"
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
  stretch: {
    width: 150,
    height: 150,
    resizeMode: 'stretch'
  },
  resultsText:{
    textAlignVertical: 'top',
    margin:5,
    color: '#C7E8F3',
    fontSize: 20,
    fontWeight:'bold',
    backgroundColor: '#8E4162',
    borderColor:'#C7E8F3'
  },
  touchOpacityText: { // styles the text colour and style
    fontSize: 20,
    fontWeight: 'bold',
    color: '#C7E8F3',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 1,
    backgroundColor: '#BF9ACA'
  },
  touchOpacityEditInfo: { // styles the text colour and style
    fontSize: 20,
    fontWeight: 'bold',
    color: '#C7E8F3',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 1,
  }

});
export default EditReviewFlatlistOutput;
