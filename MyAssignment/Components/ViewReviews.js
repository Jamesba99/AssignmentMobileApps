import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';

class ViewReviews extends Component{
  render(){
    const navigation = this.props.navigation;
    return(
        <View>
          <Text>Home Screen</Text>
          <Button
            title="Back"
            onPress={() =>navigation.goBack()}
          />
        </View>
    );
  }
}

export default ViewReviews;
