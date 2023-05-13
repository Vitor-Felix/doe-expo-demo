import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { Ionicons } from '@expo/vector-icons';

const FeedScreen = () => {
  const posts = [
    {
      id: 1,
      title: 'Post 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at ante ut tortor convallis eleifend. Pellentesque lacinia posuere felis, sed consequat velit. Proin placerat elementum felis, at congue mi tincidunt non. Pellentesque volutpat consectetur luctus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi egestas, nunc id vulputate congue, justo dolor convallis urna, ut tristique eros mauris et felis.',
      address: '123 Main Street, São Paulo, Brazil',
      phoneNumber: '+55 11 1234-5678',
      image: require('../../assets/images/post1.jpeg'),
    },
    {
      id: 2,
      title: 'Post 2',
      description: 'Description for post 2',
      address: '123 Main Street, São Paulo, Brazil',
      phoneNumber: '+55 11 1234-5678',
      image: require('../../assets/images/post2.jpeg'),
    },
    {
      id: 3,
      title: 'Post 3',
      description: 'Description for post 3',
      address: '123 Main Street, São Paulo, Brazil',
      phoneNumber: '+55 11 1234-5678',
      image: require('../../assets/images/post3.jpeg'),
    },
    {
      id: 4,
      title: 'Post 4',
      description: 'Description for post 4',
      address: '123 Main Street, São Paulo, Brazil',
      phoneNumber: '+55 11 1234-5678',
      image: require('../../assets/images/post4.jpeg'),
    },
    {
      id: 5,
      title: 'Post 5',
      description: 'Description for post 5',
      address: '123 Main Street, São Paulo, Brazil',
      phoneNumber: '+55 11 1234-5678',
      image: require('../../assets/images/post5.jpeg'),
    },
  ];

  const renderPosts = () => {
    return posts.map((post) => (
        <View key={post.id} style={styles.postContainer}>
            <Text style={styles.postTitle}>{post.title}</Text>
            <Image source={post.image} style={styles.postImage} />
            <Text style={styles.postAddress}>{post.address}</Text>
            <Text style={styles.postPhoneNumber}>{post.phoneNumber}</Text>
            <TouchableOpacity onPress={() => handlePostPress(post)}>
                <Text style={styles.postDescription}>{truncateDescription(post.description)}</Text>
                <Text style={styles.readMoreText}>Ver mais detalhes</Text>
            </TouchableOpacity>
        </View>
    ));
  };

  const handleProfilePress = () => {
    // Handle navigation to the User Profile Screen
    console.log('Navigating to User Profile Screen...');
  };

  const handlePostPress = () => {
    // Handle navigation to the Post Screen
    console.log('Navigating to Post Screen...');
  };

  const truncateDescription = (description) => {
    const maxLength = 50;
    if (description.length > maxLength) {
      return `${description.substring(0, maxLength)}...`;
    }
    return description;
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
