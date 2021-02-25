import React, { Component } from "react";
import {Text,View,Button,ToastAndroid,SafeAreaView,TouchableOpacity,StyleSheet,FlatList,TextInput} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RNCamera } from 'react-native-camera';

import EditReviews from './EditReviews';

class CameraScreen extends Component{
    constructor(props){
      super(props);

      this.state = {
        isLoading: true,
      };

//------------------------------------------------------------------------------
    }
    componentDidMount(){
        this.checkLoggedIn();
    }

//----------------post A photo--------------------------------------------------
/**
PostPhoto will send the recently taken photo to the server
Firstly makes the constants location_id and review_id by bringing them from the previous screens props
The authentication token is pulled from async storage to show the server that the user is logged in
The post request is sent with a content type image/jpeg to tell the server that an image is being sent
Then there is responses with 200 meaning the photo has succsessfully been posted
With other responses being caught and printed to the user to keep them infomormed with whats going on
**/
  postPhoto = async (data) => {
    let token = await AsyncStorage.getItem('@session_token');
    const { location_id } = this.props.route.params;
    const { review_id } = this.props.route.params;

    return fetch ( "http://10.0.2.2:3333/api/1.0.0/location/"+(location_id)+"/review/"+(review_id)+"/photo", {
        method: 'post',
        headers: {
          "Content-Type": "image/jpeg",
          "X-Authorization": token
        },
        body:data
    })
    .then((response) => {
      if(response.status === 200){
        ToastAndroid.show("Photo added ",ToastAndroid.SHORT);
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
    .catch((error)=> {
      console.log(error);
      ToastAndroid.show(error,ToastAndroid.SHORT);
    })

  }
//-----------------take Picture-------------------------------------------------
/**
when the button is pressed the take picture is function is called
Sets to constants to set quality and prepare the data of the photo
once the data and options has a value in it postPhoto function is called the data of the photo is passed across
**/
  takePicture = async() => {
    if(this.camera){

      const options = { quality:0.5, base64:true }
      const data = await this.camera.takePictureAsync(options)

      this.postPhoto(data);
      console.log(data.uri);
    }
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
  **/
  render(){

      return(
        <View style={{ flex:1,width:'100%'}}>
          <RNCamera
            ref={ ref => {
              this.camera = ref;
            }}
            style={ customStyle.preview }
            captureAudio={ false }
            />
          <Button title= "Take photo" onPress={() => {this.takePicture()}}/>
        </View>
      );
    }
  }
const customStyle = StyleSheet.create({ // styles the text on the screen
  preview: {
    flex:1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
});

export default CameraScreen;
