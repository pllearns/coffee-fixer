/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import OAuthSimple from 'oauthsimple'
import config from './config.js'

export default class CoffeeFixer extends Component {

  state = {
    position: 'unknown'
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({position})
      },
      (error) => alert(error),
      {enableHighAccuracy: true, timeout: 2000, maximumAge: 1000}
    )
  }

  fetchData() {
    
    let lat = this.state.position.coords.latitude
    let lng = this.state.position.coords.longitude

    let latlng = "ll=" + String(lat) + "," + String(lng)

    let consumerKey = config.consumer_key
    let consumerSecret = config.consumer_secret
    let token = config.token
    let tokenSecret = config.token_secret

    let oauth = new OAuthSimple(consumerKey, tokenSecret)

    var request = oauth.sign({
      action: 'GET',
      path: 'https://api.yelp.com/v3/businesses/search',
      parameters: "term=coffee&" + latlng + 'limit=30',
      signatures: {
        api_key: consumerKey,
        shared_secret: consumerSecret,
        access_token: token,
        access_secret: tokenSecret
      },
    })

    fetch(request.signed_url, {method: 'GET'}).then(function(response) {
      return response.json()
    }).then(function(data) {
    }).catch(function(error) {
      console.log("error:", error)
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Get My Coffee Fix!
        </Text>
        <TouchableOpacity
          style={{borderRadius: 7, padding: 10, backgroundColor: 'rgb(34, 139, 34)'}}
          onPress={this.fetchData.bind(this)}>
            <Text style={{fontSize: 15}}>Find the Fix!</Text>
          </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('CoffeeFixer', () => CoffeeFixer);
