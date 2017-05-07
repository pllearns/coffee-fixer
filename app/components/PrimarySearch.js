/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import YelpApi from 'v3-yelp-api'
import config from '../../config.js'

export default class PrimarySearch extends Component {

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
    const credentials = {
      appId: config.consumer_key,
      appSecret: config.consumer_secret
    }

    // console logging the actual object YelpApi led to the solve
    const yelp = new YelpApi(credentials)

    let lat = this.state.position.coords.latitude
    let lng = this.state.position.coords.longitude

    let nav = this.props.navigator
    let latlng = String(lat) + "," + String(lng)
    let params = {
      term: 'coffee',
      location: latlng,
      limit: '30',
    }

    return yelp.search(params)
    .then((searchResults) => {
      nav.push({
        ident: "Results",
        data: searchResults
      })
    })
    .catch(err => err)
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
    )
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
