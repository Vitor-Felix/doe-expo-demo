import React, { useContext }  from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from './styles';
import { UserContext } from '../../UserContext'

const UserProfileScreen = () => {
  // const user = {
  //   fullName: 'Maria da Silva Braga',
  //   email: 'sample@mail.com',
  //   phoneNumber: '+55 11 1234-5678',
  // };
  const { user } = useContext(UserContext);

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image source={require('../../assets/avatar.png')} style={styles.avatar} />
        <Text style={styles.fullName}>{user.fullName}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{user.email}</Text>
        <Text style={styles.label}>Celular:</Text>
        <Text style={styles.value}>{user.phoneNumber}</Text>
      </View>
    </View>
  );
};

export default UserProfileScreen;