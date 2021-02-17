import React, { Component } from 'react';
import { Text, View, Button, ToastAndroid, SafeAreaView, TouchableOpacity, StyleSheet, Alert, FlatList, StatusBar} from 'react-native';
import {ScrollView, TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Rating, AirbnbRating } from 'react-native-elements';
/**
TO DO
- complete the ratings page
-format the page
https://www.youtube.com/watch?v=GPUiY0qJTiI
// make a stack nav page that appears on the next with results
***/

class ViewReviews extends Component{
    constructor(props){
      super(props);
      this.state = {
        isLoading: true,
        locations: null,
        q: '',
        overall_rating: 0,
        rating: '',
        name: ''
      }
    }

    componentDidMount(){
      this.unsubscribe = this.props.navigation.addListener('focus', () => {
        });
      this.getData();
      this.checkLoggedIn();
    }

    getData = async () => {
      let token = await AsyncStorage.getItem('@session_token');
      return fetch("http://10.0.2.2:3333/api/1.0.0/find", {
          method: 'get',
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
        isLoading: 'false',
        locations: responseJson
      })
    })
    .catch((error)=> {
      console.log(error);
      ToastAndroid.show(error,ToastAndroid.SHORT);
    })
  }
    search = () => {
      let url = "http://10.0.2.2:3333/api/1.0.0/find?"
      console.log(this.state.q)
      console.log(this.state.price_rating)
      console.log(this.state.overall_rating)
      if(this.state.q != ''){
        url += "q=" + this.state.q + "&";
      }
      if (this.state.overall_rating > 0){
        url += "overall_rating" + this.state.overall_rating + "&";
      }

      this.getData()
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
          <View style={styles.container}>
            <Text style={styles.titleText}>View Reviews</Text>
            <TextInput
              value={this.state.q}
              onChangeText={(q) => this.setState({q: q})}
              placeholder= "Enter your search criteria "
              backgroundColor="#C7E8F3"
              style={styles.textInput}
              />
              <Text style={styles.ratingsTitleText}>Overall Rating </Text>
              <AirbnbRating
                  size={15}
                  defaultRating={0}
                  onFinishRating={(rating) => this.ratingCompleted( rating, "overall_rating")}
                />
                <Button
                title="Search"
                color="#8E4162"
                onPress={() => {this.search()}}
                />
                <FlatList
                  data={this.state.locations}
                  renderItem={({item}) => (
                    <View style={styles.ratingTitleText}>
                      <Text style={styles.resultsText}> ID: { item.location_id }</Text>
                      <Text style={styles.resultsText}> { item.location_name }</Text>
                      <Text style={styles.resultsText}> Rating: { item.avg_overall_rating } </Text>
                      <Text style={styles.resultsText}> costRating: { item.avg_price_rating } </Text>
                    </View>
                  )}
                  keyExtractor={(item) => item.location_id.toString()}
                  />
            </View>
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
export default ViewReviews;
