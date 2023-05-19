import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

// const tempPhoto = require('../../assets/images/post1.jpeg')

const FeedScreen = () => {
  const navigation = useNavigation();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchPosts();
    }, [])
  );

  const fetchPosts = async () => {
    try {
      const response = await axios.get('https://nodejs-production-c164.up.railway.app/donations');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
    //<Image source={{ uri: `http://10.0.54.105:3000/photos/${posts.photo}` }} style={styles.postImage} />
  };

  const renderPosts = () => {
    return posts.map((post) => (
      <View key={post._id} style={styles.postContainer}>
        <Text style={styles.postTitle}>{post.title}</Text>
        <Image source={{ uri: `https://nodejs-production-c164.up.railway.app/photos/${post.photo}` }} style={styles.postImage} />
        <Text style={styles.postAddress}>{post.address}</Text>
        <TouchableOpacity onPress={() => showPostDetailsPress (post )}>
          <Text style={styles.readMoreText}>Ver mais detalhes</Text>
        </TouchableOpacity>
      </View>
    ));
  };

  const showPostDetailsPress = (post) => {
    navigation.navigate('PostDetails', { post });
  };

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  const handlePostPress = () => {
    navigation.navigate('NewPost');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>{renderPosts()}</ScrollView>

      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={handleProfilePress}>
          <Ionicons name="person-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={handlePostPress}>
          <Ionicons name="add-circle-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FeedScreen;
