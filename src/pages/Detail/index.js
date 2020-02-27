import React, { Component } from 'react';
import { View,Text } from 'react-native';
import { connect } from 'react-redux';


@connect(({Detail}) => ({
  ...Detail,
}))
export default class Detail extends Component {
  

  componentDidMount(){

  }

  render() {
    return (
      <View>
        <Text>Detail</Text>
      </View>
    )
  }
}
