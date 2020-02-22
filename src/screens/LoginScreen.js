import React, { Component } from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
  ImageBackground
} from 'react-native';
import { connect } from 'react-redux';
import { totalSize, width, height } from "react-native-dimension";
import DropdownAlert from 'react-native-dropdownalert';
import { Button, Container } from 'native-base';
import Constants from 'expo-constants';
import CommonStyles from '../styles/CommonStyles';

import {
  getName,
} from '../actions';

class LoginScreen extends Component {
  /// set data source of list to zero initially
  constructor() {
    super();
    this.state = {
      text: '',
      userNameDefault: 'mytodoapp',
      passwordDefault: 'mypassword',
      userName: '',
      password: ''
    };
  }

  componentWillMount() {
    this.props.getName({ text: 'ToDo App' });
  }

  loginUser() {
    const { userName, password, userNameDefault, passwordDefault } = this.state;
    const errors = [];

    if(userName !== userNameDefault) {
      errors.push("Invalid Username");
    }
    if(password !== passwordDefault) {
      errors.push("Invalid Password");
    }

    if(errors.length === 0) {
      this.props.navigation.navigate('HomeScreen');
    } else {
      this.dropdown.alertWithType('error', 'Error Authenticating', errors);
    }
  }

  render() {
    const { userName, password } = this.state;
    const { name } = this.props;

    return (
      <ImageBackground blurRadius={10} source={require('../images/back.jpg')} style={{ flex: 1 }} >
      <View style={styles.container}>
        <View style={styles.titleBox}>
          <Text style={styles.headText}>
            SIGN IN {name}
          </Text>
        </View>

        <View style={styles.formBox}>
          <View style={CommonStyles.textInputField}>
            <Image
              source={require('../images/avatar.png')}
              style={{ position: 'absolute', bottom: 12, left: 20, width: 19, height: 22 }}
            />
            <TextInput
              placeholder='Username'
              value={userName}
              style={CommonStyles.textInput}
              underlineColorAndroid='transparent'
              onChangeText={(text) => this.setState({ userName: text })}
            />
          </View>
          <View style={CommonStyles.textInputField}>
            <Image
              source={require('../images/padlock.png')}
              style={{ position: 'absolute', bottom: 12, left: 20, width: 17, height: 22 }}
            />
            <TextInput
              placeholder='Password'
              value={password}
              style={CommonStyles.textInput}
              underlineColorAndroid='transparent'
              secureTextEntry
              onChangeText={(text) => this.setState({ password: text })}
            />
          </View>
        </View>

        <View>
          <Button
            style={styles.cashButton}
            rounded
            onPress={() => this.loginUser()}
          >
            <Text style={styles.cashButtonFont}>Sign In</Text>
          </Button>
        </View>
        <View style={{ marginTop: height(10) }}>
            <Text style={{ color: '#dedede' }}>By Alex Appiah Boateng</Text>
        </View>
      </View>
        <DropdownAlert ref={ref => this.dropdown = ref} defaultContainer={{ paddingTop: height(3), paddingLeft: width(3) }} />
        </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headText: {
    fontSize: totalSize(3),
    fontWeight: 'bold'
  },
  statusBar: {
    backgroundColor: 'blue',
    height: Constants.statusBarHeight,
  },
  titleBox: {
    height: height(10),
    marginTop: height(20),
    marginBottom: height(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  formBox: {
    height: height(20),
    alignItems: 'center',
    marginBottom: height(5),
  },
  cashButtonFont: {
    textAlign: "center",
    width: "100%",
    fontSize: totalSize(2),
    fontWeight: "bold"
  },
  cashButton: {
    width: "80%",
    backgroundColor: "#fff"
  },
});


const mapStateToProps = (state) => {
  const { name } = state.home;

  return { name };
};

const mapActionCreators = {
  getName,
};
export default connect(mapStateToProps, mapActionCreators)(LoginScreen);
