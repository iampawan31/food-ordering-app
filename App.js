import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {ActivityIndicator, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import MainTabScreen from './components/MainTabScreen';
import DrawerContent from './components/DrawerContent';
import BookmarkScreen from './components/BookmarkScreen';
import SettingScreen from './components/SettingScreen';
import SupportScreen from './components/SupportScreen';
import RootStackScreen from './components/RootStackScreen';
import {AuthContext} from './components/context';

const Drawer = createDrawerNavigator();

const App = () => {
  const initialLoginState = {
    isLoading: false,
    userName: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {...prevState, isLoading: false};
      case 'RETRIEVE_TOKEN':
        return {...prevState, userToken: action.token, isLoading: false};
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState,
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async (userName, password) => {
        let userToken = null;
        if (userName === 'user' && password === 'password') {
          userToken = 'random_string';
          try {
            await AsyncStorage.setItem('userToken', userToken);
          } catch (e) {
            console.log(e);
          }
        }

        dispatch({type: 'LOGIN', id: userName, token: userToken});
      },
      signUp: () => {
        // setUserToken('randomstring');
        // setIsLoading(false);
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem('userToken');
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'LOGOUT'});
      },
    }),
    [],
  );

  React.useEffect(() => {
    setTimeout(async () => {
      let userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log(e);
      }
      dispatch({type: 'RETREIVE_TOKEN', token: userToken});
    }, 1000);
  }, []);

  if (loginState?.isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState?.userToken !== null ? (
          <Drawer.Navigator
            drawerContent={(props) => <DrawerContent {...props} />}
            initialRouteName="HomeDrawer">
            <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
            <Drawer.Screen name="BookmarkDrawer" component={BookmarkScreen} />
            <Drawer.Screen name="SettingDrawer" component={SettingScreen} />
            <Drawer.Screen name="SupportDrawer" component={SupportScreen} />
          </Drawer.Navigator>
        ) : (
          <RootStackScreen />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
