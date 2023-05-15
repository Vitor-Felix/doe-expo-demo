import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image, ScrollView } from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [cellphone, setCellphone] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('');
  const [documentPhoto, setDocumentPhoto] = useState('');

  const navigation = useNavigation();

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

  const handleRegister = () => {
    // Handle registration functionality here
    console.log('Registrando...');

    navigation.navigate('Profile');
  };

  return (
    <View style={styles.container}>
    <ScrollView style={styles.scrollContainer}>
      <Text style={styles.label}>Nome Completo</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu nome completo"
        value={fullName}
        onChangeText={(text) => setFullName(text)}
      />

      <Text style={styles.label}>E-mail</Text>
      <TextInput
        style={styles.input}
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
        style={styles.input}
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

      {profilePhoto ? (
        <Image source={{ uri: profilePhoto }} style={styles.imagePreview} />
      ) : null}

      <TouchableOpacity style={styles.button} onPress={handleTakeDocumentPicture}>
        <Text style={styles.buttonText}>Foto do Documento</Text>
      </TouchableOpacity>

      {documentPhoto ? (
        <Image source={{ uri: documentPhoto }} style={styles.imagePreview} />
      ) : null}

      <TouchableOpacity style={styles.submitButton} onPress={handleRegister}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </ScrollView>
    </View>
  );
};

export default RegisterScreen;