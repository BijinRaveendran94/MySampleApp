
import React from 'react';
import { StyleSheet, View, Image, AsyncStorage } from 'react-native';
import jwt from "react-native-pure-jwt";

class SplashScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.backgroundContainer}
          source={require('../images/yarab.jpg')}
        />
      </View>
    );
  }
}

export default class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      jwtExpiry: '0'
    }
  }

  performTimeConsumingTask = async () => {
    return new Promise((resolve) =>
      setTimeout(
        () => { resolve('result') },
        4000
      )
    );
  }

  async componentDidMount() {
    let jwtToken = (await AsyncStorage.getItem('jwtToken')) || 'none';
    console.log(jwtToken)
    if (jwtToken != 'none') {
      jwt
        .decode(
          jwtToken, // the token
          "my-secret", // the secret
          {
            skipValidation: true // to skip signature and exp verification
          }
        )
        .then((response) => this.setState({ jwtExpiry: response.exp })) // already an object. read below, exp key note
        .catch(console.error);      
    }
    // Preload data from an external API
      // Preload data using AsyncStorage
      const data = await this.performTimeConsumingTask();
      if (data !== null) {
        this.setState({ isLoading: false });
      }
  }

  render() {
    if (this.state.isLoading) {
      return <SplashScreen />;
    }

    return (
      this.state.jwtExpiry != '0' ? this.props.navigation.navigate('Home') : this.props.navigation.navigate('Login')

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
    fontFamily: "TT Norms Pro Regular",
  },
  backgroundContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontFamily: "TT Norms Pro Regular",
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    fontFamily: "TTNorms-Regular",
  },
});