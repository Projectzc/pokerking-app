
/**
 *作者：lorne
 *时间：2018/12/4
 *功能：pages模版快速生成脚本,执行命令 npm run tep `文件名`
 */

const fs = require('fs');

const dirName = process.argv[2];

if (!dirName) {
  console.log('文件夹名称不能为空！');
  console.log('示例：npm run tep test');
  process.exit(0);
}

// 页面模版
const indexTep = `import React, { Component } from 'react';
import { View,Text } from 'react-native';
import { connect } from 'react-redux';


@connect(({${dirName}}) => ({
  ...${dirName},
}))
export default class ${dirName} extends Component {
  

  componentDidMount(){

  }

  render() {
    return (
      <View>
        <Text>${dirName}</Text>
      </View>
    )
  }
}
`;

// scss文件模版
const scssTep = `
import { StyleSheet } from 'react-native';
export default StyleSheet.create({

})

`;

// model文件模版
const modelTep = `import * as ${dirName}Api from './service';

export default {
  namespace: '${dirName}',
  state: {

  },

  effects: {
    * effectsDemo(_, { call, put }) {
      const { statusCode, data } = yield call(${dirName}Api.demo, {});
      if (statusCode === 200) {
        yield put({ type: 'save',
          payload: {
            topData: data,
          } });
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },

};
`;


// service页面模版
const serviceTep = `import Request from '../../utils/request';

export const demo = (data) => {
  return Request({
    url: '路径',
    method: 'POST',
    data,
  });
};
`;



fs.mkdirSync(`./src/pages/${dirName}`); // mkdir $1
process.chdir(`./src/pages/${dirName}`); // cd $1

fs.writeFileSync('index.js', indexTep);
fs.writeFileSync('index.style.js', scssTep);
fs.writeFileSync('model.js', modelTep);
fs.writeFileSync('service.js', serviceTep);

console.log(`模版${dirName}已创建,请手动增加models`);



process.exit(0);
