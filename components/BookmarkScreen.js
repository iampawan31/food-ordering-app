import React from 'react';
import {Text, View, Button, StyleSheet} from 'react-native';

const BookmarkScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Bookmark Screen</Text>
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
export default BookmarkScreen;
