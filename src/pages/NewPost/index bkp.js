import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import axios from 'axios';

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

  const sayHello = async () => {
    try {
      const response = await axios.get('http://10.0.54.105:3000');
      console.log('Response:', response.data);
      console.log('Donation submitted successfully!');
    } catch (error) {
      console.error('Error submitting donation:', error);
    }
  };

  const handleSubmit = async () => {
    console.log(`IMAGE URI: ${imageUri}`)
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('address', address);
      formData.append('phonenumber', cellphoneNumber);
      formData.append('description', description);
      formData.append('photo', {
        uri: 'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540vitorfelix%252Fdoe-expo-demo/Camera/7e529f0a-0595-4ebc-a7b8-225a72cd99a3.jpg',
        // uri: imageUri,
        type: 'image/jpeg',
        name: 'photo.jpg',
      });
  
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
  
      // const encodedFormData = new URLSearchParams(formData).toString();
  
      // await axios.post('http://10.0.54.105:3000/donation', encodedFormData, config);
      await axios.post('http://10.0.54.105:3000/donation', config);
      console.log('Donation submitted successfully!');
      navigation.navigate('Feed');
    } catch (error) {
      console.error('Failed to submit donation:', error);
    }
  };

  // const handleSubmit = async () => {
  //   try {
  //     const formData = new FormData();
  //     formData.append('title', title);
  //     formData.append('address', address);
  //     formData.append('phonenumber', cellphoneNumber);
  //     formData.append('description', description);
  //     formData.append('photo', {
  //       uri: imageUri,
  //       type: 'image/jpeg', // Replace with the appropriate file type
  //       name: 'photo.jpg', // Replace with the desired filename
  //     });

  //     await axios.post('http://10.0.54.105:3000/donation', formData);
  //     console.log('Donation submitted successfully!');
  //     navigation.navigate('Feed');
  //   } catch (error) {
  //     console.error('Failed to submit donation:', error.request);
  //     // Handle the error as needed
  //   }
  // };

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

      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.imagePreview} />
      ) : null}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </ScrollView>
    </View>
  );
};

export default NewPostScreen;
