import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';

const NewPostScreen = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [cellphoneNumber, setCellphoneNumber] = useState('');
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState('');

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
      formData.append('phonenumber', cellphoneNumber);
      formData.append('description', description);
      formData.append('photo', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'photo.jpg',
      });

      const response = await fetch('http://10.0.54.105:3000/donation', {
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
      // Handle the error as needed
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

        <Text style={styles.label}>Número de Celular:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o número de celular"
          value={cellphoneNumber}
          onChangeText={setCellphoneNumber}
        />

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