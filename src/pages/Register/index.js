import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image, ScrollView, Alert } from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const RegisterScreen = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [cellphone, setCellphone] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('');
  const [documentPhoto, setDocumentPhoto] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    validateFields();
  }, [fullName, email, password, confirmPassword]);

  const handleTakeProfilePicture = () => {
    navigation.navigate('TakePicture', {
      onPictureTaken: (uri) => {
        setProfilePhoto(uri);
      },
    });
  };

  const handleTakeDocumentPicture = () => {
    navigation.navigate('TakePicture', {
      onPictureTaken: (uri) => {
        setDocumentPhoto(uri);
      },
    });
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateFields = () => {
    const isFullNameValid = fullName !== '';
    const isEmailValid = email !== '' && isValidEmail(email);
    const isPasswordValid = password !== '';
    const isConfirmPasswordValid = confirmPassword !== '' && confirmPassword === password;
    setIsButtonDisabled(!(isFullNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid));
  };

  const handleRegister = () => {
    if (password !== confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'As senhas devem ser iguais!',
      });
      return;
    }

    if (!isValidEmail(email)) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Formato inválido de email',
      });
      return;
    }

    const payload = {
      fullName,
      email,
      password,
      phoneNumber: cellphone,
      facePhoto: profilePhoto,
      documentPhoto,
    };

    fetch('https://nodejs-production-c164.up.railway.app/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not OK');
      }
      return response.text();
    })
      .then((data) => {
        navigation.navigate('Login');
        Alert.alert('Usuário submetido com sucesso! Aguarde a validação dos seus dados!');
      })
      .catch((error) => {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Ocorreu um erro ao enviar os dados. Tente novamente mais tarde.',
        });
        console.error('Error:', error);
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.label}>Nome Completo</Text>
        <TextInput
          style={[styles.input, fullName === '' ? styles.invalidInput : null]}
          placeholder="Digite seu nome completo"
          value={fullName}
          onChangeText={(text) => setFullName(text)}
        />

        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={[styles.input, email === '' || !isValidEmail(email) ? styles.invalidInput : null]}
          placeholder="Digite seu e-mail"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        <Text style={styles.label}>Confirmação de Senha</Text>
        <TextInput
          style={[styles.input, confirmPassword !== password ? styles.invalidInput : null]}
          placeholder="Confirme sua senha"
          secureTextEntry
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />

        <Text style={styles.label}>Celular</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu número de celular"
          value={cellphone}
          onChangeText={(text) => setCellphone(text)}
        />

        <TouchableOpacity style={styles.button} onPress={handleTakeProfilePicture}>
          <Text style={styles.buttonText}>Foto do Rosto</Text>
        </TouchableOpacity>

        {profilePhoto ? <Image source={{ uri: profilePhoto }} style={styles.imagePreview} /> : null}

        <TouchableOpacity style={styles.button} onPress={handleTakeDocumentPicture}>
          <Text style={styles.buttonText}>Foto do Documento</Text>
        </TouchableOpacity>

        {documentPhoto ? <Image source={{ uri: documentPhoto }} style={styles.imagePreview} /> : null}

        <TouchableOpacity
          style={[styles.submitButton, isButtonDisabled ? styles.disabledButton : styles.enabledButton]}
          onPress={handleRegister}
          disabled={isButtonDisabled}
        >
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
      </ScrollView>

      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
};

export default RegisterScreen;
