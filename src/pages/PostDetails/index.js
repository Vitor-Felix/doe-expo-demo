import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { styles } from './styles';

const PostDetailsScreen = ({ route }) => {
  const { post } = route.params;

  const handleOpenWhatsApp = () => {
    const whatsappUrl = `whatsapp://send?phone=${post.phoneNumber}`;
    Linking.openURL(whatsappUrl);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.postContainer}>
          <Text style={styles.postTitle}>{post.title}</Text>
          <Image source={post.image} style={styles.postImage} />
          <Text style={styles.postDescription}>{post.description}</Text>
          <Text style={styles.postAddress}>{post.address}</Text>
          <Text style={styles.postPhoneNumber}>{post.phoneNumber}</Text>

          <TouchableOpacity style={styles.whatsappButton} onPress={handleOpenWhatsApp}>
            <Text style={styles.whatsappButtonText}>Entrar em contato</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default PostDetailsScreen;