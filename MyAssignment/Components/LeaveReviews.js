import React, { Component } from 'react';
import { Text, View, Button, ToastAndroid, SafeAreaView, TouchableOpacity, StyleSheet, Alert, FlatList, StatusBar} from 'react-native';
import {ScrollView, TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
// watch networking lecture past 1 hr
class ViewReviews extends Component{
    constructor(props){
      super(props);
      this.state = {
        loc_id: "",
        overall_rating: "",
        price_rating: "",
        quality_rating: "",
        clenliness_rating: "",
        review_body: "",
        isLoading: true,
        listData: []
      };
    }

    componentDidMount(){
      this.getData();

    }

    componentWillUnmount (){
    }

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

  addReviews = async () => {
    let to_send = {
      overall_rating: parseInt(this.state.overall_rating),
      price_rating: parseInt(this.state.price_rating),
      quality_rating: parseInt(this.state.quality_rating),
      clenliness_rating: parseInt(this.state.clenliness_rating),
      review_body: this.state.review_body
   };

    let token = await AsyncStorage.getItem('@session_token')
    return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+(this.state.loc_id)+"/review",{
      method: 'post',
      headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token
      },
      body: JSON.stringify(to_send)
    })
    console.log(token)
    .then((response) => {
        if(response.status === 201){
            ToastAndroid.show("Review has been added ",ToastAndroid.SHORT);
          return response.json()
          ToastAndroid.show("Review has been added ",ToastAndroid.SHORT);
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

        console.log(responseJson)
        .then((responseJson) => {
          ToastAndroid.show("Review has been added ",ToastAndroid.SHORT);
          this.setState({
            isLoading: false,
            listData: responseJson
          })

            this.props.navigation.navigate('ViewReviews')


          console.log("review added", responseJson);
          ToastAndroid.show("Review has NOT been added ",ToastAndroid.SHORT);

        })
        .catch((error) => {
            console.log(error);
            ToastAndroid.show(error,ToastAndroid.SHORT);
        })
  }
  checkLoggedIn = async () => {
    const value = await AsyncStorage.getItem('@session_token');
    if (value == null) {
        this.props.navigation.navigate('LoginScreen');
    }
  };

  render(){
    const navigation = this.props.navigation;
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
          <Text style={customStyle.text}> Loading.... </Text>
      </View>
      );
    }else{

    return(
        <View style={customStyle.container}>
            <Text style={customStyle.text}>Leave a Review!</Text>
              <FlatList
                data = {this.state.listData}
                renderItem = {({item}) => (
                  <TouchableOpacity
                    onPress={() => this.setState({loc_id: item.location_id})}
                    >
                    <Text style={customStyle.buttonText}> entry: {item.location_id} is {item.location_name}</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item,index) => index.toString()}
              />
              <TextInput
                placeholder= "Enter the overall rating of this coffee"
                onChangeText={(overall_rating) => this.setState ({overall_rating})}
                backgroundColor="#C7E8F3"
                value={this.state.overall_rating}
                style ={customStyle.textInput}
              />
              <TextInput
                placeholder= "Enter the overall rating of the price for this coffee"
                onChangeText={(price_rating) => this.setState ({price_rating})}
                backgroundColor="#C7E8F3"
                value={this.state.price_rating}
                style ={customStyle.textInput}
              />
              <TextInput
                placeholder= "Enter the overall rating of the quality of this coffee"
                onChangeText={(quality_rating) => this.setState ({quality_rating})}
                backgroundColor="#C7E8F3"
                value={this.state.quality_rating}
                style ={customStyle.textInput}
              />
              <TextInput
                placeholder= "Enter the overall rating of the clenliness_rating"
                onChangeText={(clenliness_rating) => this.setState ({clenliness_rating})}
                backgroundColor="#C7E8F3"
                value={this.state.clenliness_rating}
                style ={customStyle.textInput}
              />
              <TextInput
                placeholder= "What was good/bad about this coffee (review body)"
                onChangeText={(review_body) => this.setState ({review_body})}
                backgroundColor="#C7E8F3"
                value={this.state.review_body}
                style ={customStyle.textInput}
              />
              <TouchableOpacity
                style={customStyle.button1}
                onPress={()=> this.addReviews()}>
                <Text style={customStyle.touchOpacityText}> Post Review!</Text>

              </TouchableOpacity>
              <Button
                title="Back"
                color="#8E4162"
                fontColor= "Black"
                onPress={() =>navigation.goBack()}
              />
        </View>
    );
  }
  }
}
// TouchableOpacity FLAT LIST?
// tick box?
const customStyle = StyleSheet.create({ // styles the text on the screen
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#41393E'
  },
  text: { // styles the text colour and style
    flex: 1,
    color: '#C7E8F3',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 1,
    fontSize: 50,
    fontWeight: 'bold'
  },
  textInput:{
    padding:5,
    alignItems: 'center',
    borderWidth:1,
    margin:5
  },
  button1:{
    height: 60,
    width: 300,
    padding: 10,
    alignItems: 'center',
    borderWidth: 10,
    borderColor: '#8E4162',
  },
  buttonText:{
    color: '#C7E8F3',
  //  alignItems: 'center',
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    fontSize: 15,
    fontWeight:'bold',
    borderWidth:1,
    borderColor:'#C7E8F3',
    color: '#C7E8F3',
    backgroundColor: '#8E4162'
    //justifyContent: 'center'
  },
  textInput:{
    padding:5,
    borderWidth:1,
    margin:5
  },
  touchOpacityText:{
    color: '#C7E8F3',
    alignItems: 'center',
    flex: 1,
    fontSize: 15,
    fontWeight:'bold',
  }

});

export default ViewReviews;
