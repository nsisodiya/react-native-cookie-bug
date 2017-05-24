import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
function getXHR(url) {
  return fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  }).then((response) => {
    return response.json();
  });
}
export default class App extends React.Component {
  state = {
    cookieBugPresent: "Loading...",
  }
  constructor(){
    super();
    this.fireRequest();
  }
  async fireRequest(){
    var result1 = await getXHR("https://ring-playground.glitch.me/getLogin");
    this.setState({
      data1: result1
    });
    var result2 = await getXHR("https://ring-playground.glitch.me/verify");
    this.setState({
      data2: result2,
      cookieBugPresent: !result2.isTokenCorrect
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          cookieBugPresent = {`${this.state.cookieBugPresent}`}
        </Text>
        <Text style={styles.paragraph}>
          GET /getLogin = {JSON.stringify(this.state.data1)}
        </Text>
        <Text style={styles.paragraph}>
          GET /verify = {JSON.stringify(this.state.data2)}
        </Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
