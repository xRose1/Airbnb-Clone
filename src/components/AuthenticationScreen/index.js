
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { loginWithFacebook } from '../../actions/user';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { resetRoute } from '../../actions/nav';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#007B7F',
  },
  title: {
    fontSize: 27,
    color: '#E2E2E2',
    marginBottom: 30,
    alignSelf: 'center',
  },
  button: {
    height: 47,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    flexDirection: 'row',
    backgroundColor: '#E2E2E2',
  },
  buttonText: {
    fontSize: 17,
    color: '#007B7F',
  },
  icon: {
    marginRight: 15,
  },
});

class AuthenticationScreen extends Component {

  componentWillMount() {
    const { resetRoute, accessToken } = this.props;
    if (accessToken) {
      resetRoute({ routeName: 'Host' });
    }
  }

  onFBAuth() {
    console.log("Facebook Login");

    LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
      // function(result) {
      (result) => {
        if (result.isCancelled) {
          alert('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken()
          .then(data => {
            // alert(data.accessToken.toString())
            this.props.loginWithFacebook(data.accessToken.toString())
          })
        }
      },
      function(error) {
        alert('Login fail with error: ' + error);
      }
    );
  }

  render() {

    return (
      <View style = {styles.container}>
        <Text style = {styles.title}>Find your home at AirGodzilla</Text>
        <TouchableOpacity style = {styles.button} onPress = { () => this.onFBAuth()}>
          <Icon name = "logo-facebook" size = {25} color = "#007B7F" style={styles.icon} />
          <Text style = {styles.buttonText}>Continue with Facebook</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  accessToken: state.user.accessToken
});

const mapDispatchToProps = dispatch => ({
  loginWithFacebook: (facebookAccessToken) => dispatch(loginWithFacebook(facebookAccessToken)),
  resetRoute: (route) => dispatch(resetRoute(route)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticationScreen);
