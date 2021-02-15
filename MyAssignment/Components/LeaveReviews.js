import React, { Component } from 'react';
import { Text, View, Button, ToastAndroid, SafeAreaView, TouchableOpacity, StyleSheet, Alert, FlatList} from 'react-native';
import {ScrollView, TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
// // TouchableOpacity FLAT LIST?
// tick box?
class LeaveReviews extends Component{
    constructor(props){
      super(props);
      this.state = {
        loc_id: "",
        overall_rating: "",
        price_rating: "",
        quality_rating: "",
        clenliness: "",
        review_Body: "",
        isLoading: true,
        listData: []
      };
    }

    componentDidMount(){
      this.unsubscribe = this.props.navigation.addListener('focus', () => {

      });
      this.getData();
      this.checkLoggedIn();
    }

    componentWillUnmount (){
        this.unsubscribe();
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
        }else{
            throw 'something went wrong';
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
          <View>
            <Text style={styles.text}>Leave a Review!</Text>
            <FlatList
            data = {this.state.listData}
            renderItem = {({item}) => (
                <View>
                  <Text style={styles.buttonText}> ID: {item.location_id} is {item.location_name}, {item.location_town}, {item.avg_quality_rating}, {item.avg_overall_rating}, {item.avg_price_rating}, {item.latitude}, {item.longitude}</Text>

                </View>
            )}
            keyExtractor={(item,index) => index.toString()}
            />
            <Button
              title="Back"
              onPress={() =>navigation.goBack()}
            />
            </View>
        </View>
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
  text: { // styles the text colour and style
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
  button1:{
    height: 60,
    width: 300,
    padding: 10,
    alignItems: 'center',
    borderWidth: 10,
    borderColor: 'green',
    margin:10
  },
  buttonText:{
    color: 'white',
    fontSize: 15,
    fontWeight:'bold',
    //justifyContent: 'center'
  },
  errorMessage:{
  color: 'black',
  marginLeft: 20
 }
});
export default LeaveReviews;
