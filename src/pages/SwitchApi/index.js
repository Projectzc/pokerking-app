import React, { Component } from 'react';
import { View,Text } from 'react-native';
import { connect } from 'react-redux';
import {BtnLong} from '../../components'
import {setBaseUrl} from '../../configs/fetch'
import {showToast} from "../../utils/utils";

@connect(({SwitchApi}) => ({
  ...SwitchApi,
}))
export default class SwitchApi extends Component {
  

  componentDidMount(){

  }

  render() {
    return (
      <View style={{flex:1}}>
          <BtnLong name={'生产环境：Production'}
          onPress={()=>{
              setBaseUrl('production')
              showToast('已选生产环境，请退出重启')
              router.pop()
          }}/>
          <BtnLong name={'测试环境：test'}
          onPress={()=>{
              setBaseUrl('test')
              showToast('已选测试环境，请退出重启')
              router.pop()
          }}/>
      </View>
    )
  }
}
