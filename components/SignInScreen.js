import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  StatusBar,
  TouchableOpacity,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {AuthContext} from './context';
import Users from '../models/users';

const SignInScreen = ({navigation}) => {
  const [data, setData] = React.useState({
    username: '',
    password: '',
    checkTextInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const {signIn} = React.useContext(AuthContext);

  const textInputChange = (value) => {
    if (value.trim().length >= 4) {
      setData({
        ...data,
        username: value,
        checkTextInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        username: value,
        checkTextInputChange: false,
        isValidUser: false,
      });
    }
  };

  const handlePasswordChange = (value) => {
    if (value.trim().length >= 8) {
      setData({
        ...data,
        password: value,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: value,
        isValidPassword: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({...data, secureTextEntry: !data.secureTextEntry});
  };

  const loginHandle = (userName, password) => {
    const foundUser = Users.filter((user) => {
      return userName === user.email;
    });

    if (data.username.length === 0 || data.password.length === 0) {
      Alert.alert(
        'Wrong Input!',
        'Username or password field cannot be empty!',
        [{text: 'Okay'}],
      );
      return;
    }

    if (foundUser.length === 0) {
      Alert.alert('Invalid User!', 'Username or password is incorrect', [
        {text: 'Okay'},
      ]);
      return;
    } else {
      signIn(foundUser);
    }
  };

  const handleValidUser = (val) => {
    if (val.trim().length >= 4) {
      setData({...data, isValidUser: true});
    } else {
      setData({...data, isValidUser: false});
    }
  };

  const handleValidPassword = (val) => {
    if (val.trim().length >= 4) {
      setData({...data, isValidPassword: true});
    } else {
      setData({...data, isValidPassword: false});
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.textHeader}>Welcome</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <Text style={styles.textFooter}>Username</Text>
        <View style={styles.action}>
          <Icon name="person-outline" size={20} color="#05375a" />
          <TextInput
            placeholder="Your username"
            autoCapitalize="none"
            onChangeText={(value) => textInputChange(value)}
            onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
            style={styles.textInput}
          />
          {data.checkTextInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null}
        </View>
        {data.isValidUser ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMessage}>
              Username must be 4 characters long
            </Text>
          </Animatable.View>
        )}
        <Text style={[styles.textFooter, {marginTop: 35}]}>Password</Text>
        <View style={styles.action}>
          <Icon name="lock-closed-outline" size={20} color="#05375a" />
          <TextInput
            placeholder="Your password"
            secureTextEntry={data.secureTextEntry ? true : false}
            autoCapitalize="none"
            onChangeText={(value) => handlePasswordChange(value)}
            onEndEditing={(e) => handleValidPassword(e.nativeEvent.text)}
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
        {data.isValidPassword ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMessage}>
              Password must be 8 characters long
            </Text>
          </Animatable.View>
        )}
        <TouchableOpacity>
          <Text style={{color: '#009387', marginTop: 15}}>
            Forgot Password?
          </Text>
        </TouchableOpacity>
        <View style={styles.button}>
          <TouchableOpacity
            onPress={() => {
              loginHandle(data.username, data.password);
            }}
            style={styles.signIn}>
            <LinearGradient
              style={styles.signIn}
              colors={['#08d4c4', '#01ab9d']}>
              <Text style={[styles.textSign, {color: '#fff'}]}>Sign In</Text>
            </LinearGradient>
          </TouchableOpacity>
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
  errorMessage: {
    color: 'red',
    paddingTop: 5,
    fontSize: 13,
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
