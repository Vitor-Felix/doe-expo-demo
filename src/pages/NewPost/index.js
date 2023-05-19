import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import { UserContext } from '../../UserContext'

const NewPostScreen = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState('');
  const { user } = useContext(UserContext);

  const handleTakePicture = () => {
    navigation.navigate('TakePicture', {
      onPictureTaken: (uri) => {
        setImageUri(uri);
      },
    });
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('address', address);
      formData.append('phonenumber', user.phoneNumber);
      formData.append('description', description);
      formData.append('photo', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'photo.jpg',
      });
      formData.append('userid', user.email);

      const response = await fetch('https://nodejs-production-c164.up.railway.app/donation', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      if (response.ok) {
        console.log('Donation submitted successfully!');
        navigation.navigate('Feed');
      } else {
        console.error('Failed to submit donation');
      }
    } catch (error) {
      console.error('Failed to submit donation:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.label}>Título:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o título"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Endereço:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o endereço"
          value={address}
          onChangeText={setAddress}
        />

        {/* <Text style={styles.label}>Número de Celular:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o número de celular"
          value={cellphoneNumber}
          onChangeText={setCellphoneNumber}
        /> */}

        <Text style={styles.label}>Descrição:</Text>
        <TextInput
          style={styles.descriptionInput}
          multiline
          placeholder="Digite a descrição"
          value={description}
          onChangeText={setDescription}
        />

        <TouchableOpacity style={styles.button} onPress={handleTakePicture}>
          <Text style={styles.buttonText}>Tirar Foto</Text>
        </TouchableOpacity>

        {imageUri ? <Image source={{ uri: imageUri }} style={styles.imagePreview} /> : null}

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default NewPostScreen;
