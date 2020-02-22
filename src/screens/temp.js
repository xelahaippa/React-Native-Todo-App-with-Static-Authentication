import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Toast } from 'native-base';

import {
  getName,
} from '../actions';

class HomeScreen extends Component {
  /// set data source of list to zero initially
  constructor() {
    super();
    this.state = {
      text: '',
    };
  }

  componentWillMount() {
    this.props.getName({ text: 'MotoApp' });
  }

 render() {
   return (
     <View style={styles.container}>
         <Text style={{ color: '#72c02c', fontSize: 20, fontWeight: 'bold' }}>
           {this.props.name}
         </Text>
     </View>
   );
 }
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: '#F5FCFF',
 },
 location: {
   backgroundColor: 'white',
   margin: 25
 }
});

const mapStateToProps = (state) => {
const { name } = state.home;
// const { inputData } = state.home.inputData || {};
// const { resultTypes } = state.home.resultTypes || {};
 return { name };
};

const mapActionCreators = { getName,
 };
export default connect(mapStateToProps, mapActionCreators)(HomeScreen);
