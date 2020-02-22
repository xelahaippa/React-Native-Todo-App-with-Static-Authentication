import React from 'react';
import { View, SafeAreaView, ScrollView, Image, StyleSheet } from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';
import Constants from 'expo-constants';
import { connect } from 'react-redux';

const renderImage = ({ user }) => {

};
const CustomDrawerComponent = (props) => {
  //console.warn(props.user[0].type);
  return (
    <SafeAreaView style={{ flex: 1 }} >
    <View style={Styles.statusBar} />
      <View
      style={{
         height: 150,
         marginTop: 30,
         marginBottom: 10,
         backgroundColor: 'white',
         alignItems: 'center',
         justifyContent: 'center' }}
      >
        {renderImage({ user: props.user })}
      </View>
      <ScrollView>
        <DrawerItems {...props} />
      </ScrollView>
    </SafeAreaView>
  );
};

const Styles = StyleSheet.create({
  statusBar: {
    backgroundColor: 'black',
    height: Constants.statusBarHeight,
  },
});

const mapStateToProps = (state) => {
   return {};
};

export default connect(mapStateToProps)(CustomDrawerComponent);
