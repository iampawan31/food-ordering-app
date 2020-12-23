import React from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

const SignInScreen = ({navigation}) => {
  const [data, setData] = React.useState({
    email: '',
    password: '',
    checkTextInputChange: false,
    secureTextEntry: true,
  });

  const textInputChange = (value) => {
    if (value.length !== 0) {
      setData({
        ...data,
        email: value,
        checkTextInputChange: true,
      });
    } else {
      setData({
        ...data,
        email: value,
        checkTextInputChange: false,
      });
    }
  };

  const handlePasswordChange = (value) => {
    setData({...data, password: value});
  };

  const updateSecureTextEntry = () => {
    setData({...data, secureTextEntry: !data.secureTextEntry});
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.textHeader}>Welcome</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <Text style={styles.textFooter}>Email</Text>
        <View style={styles.action}>
          <Icon name="person-outline" size={20} color="#05375a" />
          <TextInput
            placeholder="Your email"
            autoCapitalize="none"
            onChangeText={(value) => textInputChange(value)}
            style={styles.textInput}
          />
          {data.checkTextInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null}
        </View>
        <Text style={[styles.textFooter, {marginTop: 35}]}>Password</Text>
        <View style={styles.action}>
          <Icon name="lock-closed-outline" size={20} color="#05375a" />
          <TextInput
            placeholder="Your password"
            secureTextEntry={data.secureTextEntry ? true : false}
            autoCapitalize="none"
            onChangeText={(value) => handlePasswordChange(value)}
            style={styles.textInput}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            <Feather
              name={data.secureTextEntry ? 'eye-off' : 'eye'}
              color="grey"
              size={20}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.button}>
          <LinearGradient colors={['#08d4c4', '#01ab9d']} style={styles.signIn}>
            <Text style={[styles.textSign, {color: '#fff'}]}>Sign In</Text>
          </LinearGradient>
          <TouchableOpacity
            style={[
              styles.signIn,
              {
                borderColor: '#009387',
                borderWidth: 1,
                marginTop: 15,
              },
            ]}
            onPress={() => navigation.navigate('SignUpScreen')}>
            <Text style={[styles.textSign, {color: '#009387'}]}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#009387'},
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  textHeader: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 40,
  },
  textFooter: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SignInScreen;
