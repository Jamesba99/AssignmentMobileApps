import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

class Contact extends Component{
  render(){

    const navigation = this.props.navigation;

    return(
        <View style={styles.container}>
          <Text style={styles.text}>Contact</Text>
          <Button
            title="Go Back"
            onPress={() =>navigation.goBack()}
          /> // adds a go back button so user can go back at all times
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

  export default Contact;
