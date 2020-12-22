import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const ExploreScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Detailscreen</Text>
      <Button
        title="Go to details screen..."
        onPress={() => navigation.push('Home')}
      />
      <Button title="Go to home" onPress={() => navigation.push('Home')} />
      <Button title="Go back" onPress={() => navigation.push('Home')} />
      <Button
        title="Go to first screen"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});

export default ExploreScreen;
