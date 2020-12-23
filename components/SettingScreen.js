import React from 'react';
import {Text, View, Button, StyleSheet} from 'react-native';

const SettingScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Setting Screen</Text>
      <Button title="Click Here" onPress={() => alert('Clicked')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default SettingScreen;
