/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Provider} from 'react-redux'
import Root from './src/Root'
import dva from './src/utils/dva'
import models from './src/models'

const dvaApp = dva.createApp({
    initialState: {},
    models: models,
});
const store = dvaApp.getStore();

export default class App extends Component {
  render() {
      return (<Provider store={store}>
          <Root/>
      </Provider>);
  }
}
