import React, { Component } from 'react';
import { View,Text ,ScrollView} from 'react-native';
import { connect } from 'react-redux';
import styles from './index.style'
import {Metrics} from "../../configs/Theme";
import RenderHtml from "../comm/RenderHtml";


@connect(({FoundBeauti}) => ({
  ...FoundBeauti,
}))
export default class FoundBeauti extends Component {
  

  componentDidMount(){

  }

  render() {
    return (
      <ScrollView style={{flex:1,backgroundColor:'white'}}>
          <View style={{
              marginTop: 10,
              marginLeft: 17,
              marginRight: 17,
              paddingBottom: 80,
              width:Metrics.screenWidth - 36
          }}>
              <Text style={[styles.txt,{alignSelf:'center'}]}>{global.lang.t('beauti_text1')}</Text>
              <Text style={[styles.txt,{marginTop:10}]}>{global.lang.t('beauti_text2')}</Text>
              <Text style={[styles.txt,{marginTop:10}]}>{global.lang.t('beauti_text3')}</Text>
              <Text style={[styles.txt,{marginTop:10}]}>{global.lang.t('beauti_text4')}</Text>
              <Text style={[styles.txt,{marginTop:10}]}>{global.lang.t('beauti_text6')}</Text>
              <Text style={[styles.txt,{marginTop:10}]}>{global.lang.t('beauti_text7')}</Text>
              <Text style={[styles.txt,{marginTop:10}]}>{global.lang.t('beauti_text8')}</Text>
              <Text style={[styles.txt,{marginTop:10}]}>{global.lang.t('beauti_text9')}</Text>
              <Text style={[styles.txt,{marginTop:10}]}>{global.lang.t('beauti_text10')}</Text>
              <Text style={[styles.txt,{marginTop:10}]}>{global.lang.t('beauti_text11')}</Text>
              <Text style={[styles.txt,{marginTop:10}]}>{global.lang.t('beauti_text12')}</Text>
              <Text style={[styles.txt,{marginTop:10}]}>{global.lang.t('beauti_text13')}</Text>
              <Text style={[styles.txt,{marginTop:10}]}>{global.lang.t('beauti_text14')}</Text>
              <Text style={[styles.txt,{marginTop:10}]}>{global.lang.t('beauti_text15')}</Text>

          </View>
      </ScrollView>
    )
  }
}
