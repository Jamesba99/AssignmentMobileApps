import React, { Component } from "react";
import {Text,View,Button,ToastAndroid,SafeAreaView,TouchableOpacity,StyleSheet,FlatList,TextInput,Image, ScrollView} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RNCamera } from 'react-native-camera';

import EditReviews from './EditReviews';

class ViewPhotos extends Component{
    constructor(props){
      super(props);

      this.state = {
        isLoading: true,
        review_id: "",
        location_id: "",
        image: null
      };

//------------------------------------------------------------------------------
    }
    componentDidMount(){
        this.checkLoggedIn();
        this.getPhotos();
    }

//-------------------get photos-------------------------------------------------
    getPhotos = async () => {
      let token = await AsyncStorage.getItem('@session_token');
      const { review_id } = this.props.route.params;
      const { location_id} = this.props.route.params;

      return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+(location_id)+"/review/"+(review_id)+"/photo", {
          method: 'get',
          headers:{
            "X-Authorization": token
          },
      })

      .then((response)=> {
        if(response.status === 200){
          return response
          console.log()

          }else if(response.status === 400){
            throw 'Bad Request';
          }else if(response.status === 401){
              throw '401 Unauthorized';
              console.log(response);
          }else if (response.status === 404){
              throw 'No Photo was found';
          }else if (response.status === 500){
              throw 'server error';
          }
      })
      .then((response) =>{
        console.log(response);
        this.setState({
          isLoading: false,
          image: response.url
        })
      })
      .catch((error)=> {
        console.log(error);
        ToastAndroid.show(error,ToastAndroid.SHORT);
      })
    }
//-------------------delete Photo-----------------------------------------------
    deletePhoto = async () => {
      let token = await AsyncStorage.getItem('@session_token');
      return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+(this.state.loc_id)+"/review/"+(this.state.rev_id)+"/photo", {
        method: 'delete',
          headers:{
            "X-Authorization": token
          },
        })
        .then((response) => {
          this.props.navigation.navigate("EditReviews")
          if(response.status === 200){
          ToastAndroid.show("Photo Deleted",ToastAndroid.SHORT);
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
/***
checks whether logged in.

***/
  checkLoggedIn = async () => {
    const value = await AsyncStorage.getItem('@session_token');
    if (value == null) {
        this.props.navigation.navigate('LoginScreen');
    }
  };

  /***
  the components of the file
  ***/
// add is loading


/**


console.log(this.state.reviews)
  const navigation = this.props.navigation; // declaring the navigation constant
  if(this.state.isLoading){
    return(
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#41393E'
        }}>
        <Text style={{fontSize: 50, fontWeight: 'bold', color: '#C7E8F3'}}> Loading.... </Text>
    </View>
);
**/
  render(){

    const { review_id } = this.props.route.params;
    const { location_id} = this.props.route.params;
    const { location_town } = this.props.route.params;
    const { location_name } = this.props.route.params;
    const { overall_rating }= this.props.route.params;
    const { price_rating } = this.props.route.params;
    const { quality_rating } = this.props.route.params;
    const { clenliness_rating } = this.props.route.params;
    const { review_body } = this.props.route.params;

    console.log(this.state.image)

    const navigation = this.props.navigation;

    return(
      <SafeAreaView style={ customStyle.container}>
        <ScrollView>
          <Text style={ customStyle.titleText }> View A Photo of:</Text>
          <Text style={ customStyle.locationText }> {location_name}, { location_town }</Text>
          <Text style={ customStyle.buttonText }> Overall Rating : { overall_rating }</Text>
          <Text style={ customStyle.buttonText }> Price Rating : { price_rating }</Text>
          <Text style={ customStyle.buttonText }> Quality Rating : { quality_rating }</Text>
          <Text style={ customStyle.buttonText }> Clenliness Rating : { clenliness_rating }</Text>
          <Text style={ customStyle.buttonText }> Review Body : </Text>
          <Text style={ customStyle.buttonText }> { review_body }</Text>
          <Text style={ customStyle.buttonText }> Photo Attached of Review:</Text>
          <View style={{ margin: 50 }}>
            <Image
              style={customStyle.Logo}
              source={{uri: this.state.image}}
            />
          </View>
          <TouchableOpacity
            style={customStyle.button1}
            onPress={() => {
              this.deletePhoto()
              this.setState({
                loc_id: location_id,
                rev_id: review_id
              })
            }}>
            <Text style={ customStyle.touchOpacityText}> Delete This Photo!</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={customStyle.button1}
            onPress={() => {
                this.props.navigation.navigate("DefaultHomeScreen")
            }}>
            <Text style={ customStyle.touchOpacityText}> Home </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={customStyle.button1}
            onPress={() => {
                navigation.goBack()
            }}>
            <Text style={ customStyle.touchOpacityText}> Go Back!</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const customStyle = StyleSheet.create({ // styles the text on the screen
  container:{
    flex: 1,
    alignItems: 'center',
    //justifyContent: 'center',
    backgroundColor: '#41393E'
  },
  titleText: { // styles the text colour and style
    color: '#C7E8F3',
    fontSize: 55,
    fontWeight:"bold"
  },
  locationText: { // styles the text colour and style
    color: '#C7E8F3',
    fontSize: 40,
    fontWeight:"bold"
  },
  buttonText:{
    color: '#C7E8F3',
    fontSize: 20,
    fontWeight:'bold',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  button1:{
    height: 10,
    width: '100%',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 10,
    borderColor: '#8E4162',
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
  },
  touchOpacityEditInfo: { // styles the text colour and style
    fontSize: 20,
    fontWeight: 'bold',
    color: '#C7E8F3',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 1,
  },
  Logo: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 10,
    width: 300,
    height: 300,

},
});
export default ViewPhotos;
