import React from 'react';
import { Provider } from 'react-redux';
import { Dimensions } from 'react-native';

import { Root, Icon } from 'native-base';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';

import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistor, store } from './src/store/store';

import CustomDrawerComponent from './src/components/CustomDrawerComponent';
import NavigationService from './src/store/NavigationService';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';


export default class App extends React.Component {
  constructor(props) {
  super(props);
  this.state = { loading: true, notification: {} };
}

async componentWillMount() {
 await Font.loadAsync({
    Roboto: require('native-base/Fonts/Roboto.ttf'),
    Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
  });
  this.setState({ loading: false });
}

componentDidMount() {
}

  render() {
  if (this.state.loading) {
    return (
      <Root>
        <AppLoading />
      </Root>
    );
  }

    return (
      <Root>
        <Provider store={store}>
        <PersistGate persistor={persistor} >
        <AppWrapper
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
        </PersistGate>
        </Provider>
      </Root>
    );
  }
}


///// Drawer Navigator start

const { width } = Dimensions.get('window');
const hideBar = () => {
  return;
};

const AppDrawNavigator = createDrawerNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      title: 'Employee Profile',
      drawerLabel: 'Employee Profile',
      drawerIcon: () => (
          <Icon name='ios-home' />
      )
    }
  },
},
{
  contentComponent: CustomDrawerComponent,
  drawerWidth: width / 1.4,
  contentOptions: {
    activeTintColor: 'orange'
  }
});
/// Drawe Navigator end

const TopLevelNavigator = createStackNavigator({
  HomeScreen: AppDrawNavigator,
  LoginScreen,

},
{
  headerMode: 'none',
});

const AppWrapper = createAppContainer(TopLevelNavigator);