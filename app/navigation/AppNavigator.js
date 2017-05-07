import React, { Component, Text } from 'react'

import { Navigator } from 'react-native-deprecated-custom-components'

import PrimarySearch from '../components/PrimarySearch'
import Results from '../components/Results'

class AppNavigator extends Component {

  renderScene(route, navigator) {

    let globalNavigatorProps = { navigator }

    switch(route.ident) {
      case "PrimarySearch":
        return (
          <PrimarySearch {...globalNavigatorProps} />
        )

      case "Results":
        return (
          <Results
            {...globalNavigatorProps}
            data={route.data}
          />
        )
      default:
        return (
          <Text> {`What happened? ${route}`}></Text>
        )
    }
  }
  render() {
    return (
      <Navigator
        initialRoute={this.props.initialRoute}
        ref="appNavigator"
        renderScene={this.renderScene}
        configureScene={(route) => ({
          ...route.sceneConfig || Navigator.SceneConfigs.FloatFromRight })} />
    )
  }
}

module.exports = AppNavigator
