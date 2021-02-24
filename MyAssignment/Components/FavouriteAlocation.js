import React, { Component } from "react";
import {
  Text,
  View,
  Button,
  ToastAndroid,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

class FavouriteAlocation extends Component{
    constructor(props){
      super(props);

      this.state = {
        isLoading: true,
        location_id: "",
        listData:[],
        favourite_locations:""
      };

//------------------------------------------------------------------------------
    }
    componentDidMount(){
      this.unsubscribe = this.props.navigation.addListener('focus', () => {

      });
        this.getData();
        this.checkLoggedIn();


    }
  componentWillUnmount(){
    this.unsubscribe();
  }

// get data --------------------------------------------------------------------
  getData = async () => {
    let token = await AsyncStorage.getItem('@session_token');
    return fetch("http://10.0.2.2:3333/api/1.0.0/find", {
        method: 'get',
        headers: {
          "X-Authorization": token
        },
    })
    .then((response)=> {
      if(response.status === 200){
        return response.json()
        console.log(response)
        }else if(response.status === 400){
          throw 'Bad Request';
        }else if(response.status === 401){
            throw '401 Unauthorized';
            console.log(response);
        }else if (response.status === 404){
            throw 'Not found';
        }else if (response.status === 500){
            throw 'server error';
        }
    })
    .then((responseJson) =>{
      console.log(responseJson);
      this.setState({
        isLoading: false,
        listData: responseJson
      })
    })
    .catch((error)=> {
      console.log(error);
      ToastAndroid.show(error,ToastAndroid.SHORT);
    })
  }
//------------------------------------------------------------------------------
  favouriteALocation = async () => {
    let token = await AsyncStorage.getItem('@session_token');
    return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+(this.state.loc_id)+"/favourite",{
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token
      }
    })
    console.log(token)
    .then((response) => {
      this.props.navigation.navigate("UserInfo")
      if(response.status === 200){
        ToastAndroid.show("location has been Favourited ",ToastAndroid.SHORT);
        return response.json()
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
    .then((responseJson) => {
      ToastAndroid.show("Location Favourited ",ToastAndroid.SHORT);
      this.setState({
          isLoading: false,
          favourite_locations: responseJson
      })
      console.log(favourite_locations)

    })
    .catch((error) => {
      console.log(error);
    })
  }
//------------------------------------------------------------------------------
  unFavouriteALocation = async () => {
    let token = await AsyncStorage.getItem('@session_token');
    return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+(this.state.loc_id)+"/favourite", {
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
this will delete an entry and then direct a user back to another page (previously hopefully)
this will update the review and send the user back
**/
  render(){

      const navigation = this.props.navigation; // declaring the navigation constant
      return(
        <SafeAreaView style={ customStyle.container }>
          <Text style={ customStyle.titleText }> Favourite a  </Text>
          <Text style={ customStyle.titleText }> Location </Text>
          <Text style={ customStyle.titleText }> ---------------- </Text>
          <FlatList
            data={ this.state.listData }
            renderItem={({item}) => (
              <View style={ customStyle.ratingTitleText }>
                <Text style={ customStyle.buttonText }> { item.location_name }, { item.location_town}</Text>
                <TouchableOpacity
                  style={customStyle.favouriteTouch}
                  onPress={() => {
                    this.favouriteALocation()
                    this.setState({
                        loc_id: item.location_id
                    })
                  }}>
                  <Text  style={ customStyle.buttonText}> Favourite {item.location_name} {item.location_town}!</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={customStyle.unfavouriteTouch}
                  onPress={() => {
                    this.unFavouriteALocation()
                    this.setState({
                      loc_id: item.location_id
                    })
                  }}>
                  <Text  style={ customStyle.buttonText}> UnFavourite {item.location_name} {item.location_town}!</Text>
                </TouchableOpacity>
                <Text style={ customStyle.buttonText }>-----------------</Text>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            />
          <TouchableOpacity
              style={customStyle.button1}
              onPress={() =>navigation.navigate('HomeScreen')}>
              <Text style={customStyle.buttonText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
              style={customStyle.button1}
              onPress={() =>navigation.goBack()}>
              <Text style={customStyle.buttonText}>Go Back</Text>
          </TouchableOpacity>
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
    fontSize: 50,
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
  resultsText:{
    textAlignVertical: 'top',
    margin:5,
    color: '#C7E8F3',
    fontSize: 20,
    fontWeight:'bold',
    backgroundColor: '#8E4162',
    borderColor:'#C7E8F3'
  },
  favouriteTouch:{
    height: 10,
    width: '100%',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 10,
    borderColor: '#30D5C8',
    margin:2,
  },
  unfavouriteTouch:{
    height: 10,
    width: '100%',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 10,
    borderColor: '#D21404',
    margin:2,
  }

});

export default FavouriteAlocation;
