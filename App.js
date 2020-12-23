import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MainTabScreen from './components/MainTabScreen';
import DrawerContent from './components/DrawerContent';
import BookmarkScreen from './components/BookmarkScreen';
import SettingScreen from './components/SettingScreen';
import SupportScreen from './components/SupportScreen';

import RootStackScreen from './components/RootStackScreen';

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <RootStackScreen />
      {/* <Drawer.Navigator
        drawerContent={(props) => <DrawerContent {...props} />}
        initialRouteName="Home">
        <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
        <Drawer.Screen name="BookmarkDrawer" component={BookmarkScreen} />
        <Drawer.Screen name="SettingDrawer" component={SettingScreen} />
        <Drawer.Screen name="SupportDrawer" component={SupportScreen} />
      </Drawer.Navigator> */}
    </NavigationContainer>
  );
};

export default App;
