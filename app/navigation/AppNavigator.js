import React, { Component } from 'react'

import { Navigator } from 'react-native-deprecated-custom-components'

import PrimarySearch from '../components/PrimarySearch'
import Results from '../components/Results'

class AppNavigator extends Component {

  renderScene(route, navigator) {

    switch(route.ident) {
      case "PrimarySearch":
        return (
          <PrimarySearch
            navigator={navigator.props}
          />
        )
      break
      case "Results":
        return (
          <Results
            navigator={navigator.props}
            data={route.data}
          />
        )
    }
  }
  render() {
    return (
      <Navigator
        initialRoute={this.props.initialRoute}
        renderScene={this.renderScene}
        configureScene={(route) => Navigator.SceneConfigs.FloatFromRight}
      />
    )
  }
}

module.exports = AppNavigator
