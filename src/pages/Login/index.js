import React, { useState, useContext } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { UserContext } from './../../UserContext';
import Toast from 'react-native-toast-message';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const { setUser } = useContext(UserContext);

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://nodejs-production-c164.up.railway.app/login', {
        nickname: email,
        password: password
      });

      if (response.data.login) {
        const user = response.data.user;
        setUser(user);
        // Alert.alert('Login Successful', `Welcome, ${user.fullName}!`);
        Toast.show({
          type: 'success',
          text1: `Bem vindo(a), ${user.fullName}!`,
        });

        navigation.navigate('Feed');
      } else {
        Alert.alert('Falha no Login', response.data.message);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      Alert.alert('Error', 'Ocorreu um erro inesperado, tente mais tarde.');
    }
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

// import React, { useState } from 'react';
// import { View, TextInput, TouchableOpacity, Text } from 'react-native';
// import { styles } from './styles';
// import { useNavigation } from '@react-navigation/native';

// const LoginScreen = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const navigation = useNavigation();

//   const handleLogin = () => {
//     // Handle login functionality here
//     // Replace with your authentication logic
//     if (email === 'sample@mail.com' && password === 'pass123') {
//       navigation.navigate('Feed');
//     } else {
//       console.log('Invalid email or password');
//     }
//   };

//   const handleRegister = () => {
//     // Handle registration functionality here
//     navigation.navigate('Register');
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         value={email}
//         onChangeText={(text) => setEmail(text)}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         secureTextEntry
//         value={password}
//         onChangeText={(text) => setPassword(text)}
//       />
//       <TouchableOpacity style={styles.button} onPress={handleLogin}>
//         <Text style={styles.buttonText}>Login</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.button} onPress={handleRegister}>
//         <Text style={styles.buttonText}>Register</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default LoginScreen;