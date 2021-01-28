import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

class HomeScreen extends Component{

  render(){

    const navigation = this.props.navigation;

    return(
        <View style={styles.container}>
          <Text style={styles.text}>HomeScreen</Text>
          <Button
            title="About"
            onPress={() =>navigation.navigate('About')}
    );
  }
}
