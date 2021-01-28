import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class HomeScreen extends Component{
  render(){
    return(
        <View style={styles.container}>
          <Text style={styles.text}>HomeScreen</Text>
        </View>
    );
  }
}
  const styles = StyleSheet.create({
    container:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'brown'
    },
    text: {
      color: 'white',
      fontSize: 25
    }
  });

  export default HomeScreen;
