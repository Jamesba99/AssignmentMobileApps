import React, { Component } from 'react';
import { Text, View, Button, ToastAndroid, SafeAreaView, TouchableOpacity, StyleSheet, Alert, FlatList, StatusBar} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class UserInfo extends Component{
    constructor(props){
      super(props);

      this.state = {
        isLoading: true,
        usr_id: '',
        first_name: "",
        second_name: "",
        email: "",
        userDeets: [],
      };

//------------------------------------------------------------------------------
    }
    componentDidMount(){
      this.unsubscribe = this.props.navigation.addListener('focus', () => {

      });
        this.checkLoggedIn();
        this.getData();

    }

// get data --------------------------------------------------------------------
    getData = async () => {
      let token = await AsyncStorage.getItem('@session_token');
      let id = await AsyncStorage.getItem('id');
      
      return fetch("http://10.0.2.2:3333/api/1.0.0/user/"+ (id), {
          method: 'get',
          headers:{
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
          userDeets: responseJson
        })
      })
      .catch((error)=> {
        console.log(error);
        ToastAndroid.show(error,ToastAndroid.SHORT);
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
  render(){
      const navigation = this.props.navigation; // declaring the navigation constant
      return(
        <View style={styles.container}>
          <Text style={styles.titleText}> My Account </Text>
            <FlatList
              data={ this.state.userDeets }
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => this.setState({loc_id: item.location_id})}
                  >
                  <Text style={styles.buttonText}> entry: {item.location_id} is {item.location_name}</Text>
                </TouchableOpacity>

              )}
              keyExtractor={( item, index ) => index.toString()}
            />
          <TouchableOpacity
              style={styles.button1}
              onPress={() =>navigation.navigate('LogoutScreen')}>
              <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      );
    }

}
const styles = StyleSheet.create({ // styles the text on the screen
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
    fontSize: 25,
    fontWeight:'bold',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button1:{
    height: 10,
    width: 320,
    padding: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 10,
    borderColor: '#8E4162',
    margin:2
  },
  stretch: {
    width: 150,
    height: 150,
    resizeMode: 'stretch'
  }

});

export default UserInfo;
