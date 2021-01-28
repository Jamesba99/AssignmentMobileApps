import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

class About extends Component{
  render(){

    const navigation = this.props.navigation;

    return(
        <View style={styles.container}>
          <Text style={styles.text}>About</Text>
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

  export default About;
