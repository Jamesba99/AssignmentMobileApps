import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

class Contact extends Component{
  render(){

    const navigation = this.props.navigation;

    return(
        <View style={styles.container}>
          <Text style={styles.text}>LoginScreen</Text>
          <Text/>
          <Button
            title="Don't have an account? Register now!"
            onPress={() =>navigation.navigate('Register')} // opens the about screen if clicked
          />
          <Text/>
          <Button
            title="Go Back"
            onPress={() =>navigation.goBack()}
          />
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
