import React, { Component } from 'react';
import { View,Text } from 'react-native';
import { connect } from 'react-redux';
import {BtnLong} from '../../components'
import {setBaseUrl} from '../../configs/fetch'
import {showToast,APP_VERSION} from "../../utils/utils";



@connect(({CurrentVersion}) => ({
  ...CurrentVersion,
}))
export default class CurrentVersion extends Component {
  

  componentDidMount(){

  }

  render() {
    return (
        <View style={{flex:1,alignItems:'center'}}>
            <Text style={{color: '#AAA',fontSize: 17,marginTop:100}}>{global.lang.t('now_version')}：V{APP_VERSION}</Text>
        </View>
    )
  }
}
