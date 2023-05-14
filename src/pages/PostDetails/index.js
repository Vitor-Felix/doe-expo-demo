import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { styles } from './styles';

const PostDetailsScreen = ({ route }) => {
  const { post } = route.params;

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.postContainer}>
          <Text style={styles.postTitle}>{post.title}</Text>
          <Image source={post.image} style={styles.postImage} />
          <Text style={styles.postDescription}>{post.description}</Text>
          <Text style={styles.postAddress}>{post.address}</Text>
          <Text style={styles.postPhoneNumber}>{post.phoneNumber}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default PostDetailsScreen;