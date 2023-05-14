import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';
import { styles } from './styles';

const TakePictureScreen = ({ navigation, route }) => {
  const { onPictureTaken } = route.params;
  const cameraRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [capturedImage, setCapturedImage] = useState(null);

  useEffect(() => {
    (async () => {
      // const { status } = await Camera.requestPermissionsAsync();
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    console.log(hasPermission);
  }, [hasPermission]);

  const handleTakePicture = async () => {
    if (cameraRef.current) {
      const { uri } = await cameraRef.current.takePictureAsync();
      setCapturedImage(uri);
      // savePictureToGallery(uri);
    }
  };

  /**
   * Se achar que é bom salvar na galeria, descomente.
   * Usar o CameraRoll do pacote "@react-native-camera-roll/camera-roll"
   * Ex.: import { CameraRoll } from "@react-native-camera-roll/camera-roll";
   * Porém tem que ir nas pastas do Android/iOS e add as permissões manualmente:
   * https://github.com/react-native-cameraroll/react-native-cameraroll
  */
  // const savePictureToGallery = async (uri) => {
  //   try {
  //     await CameraRoll.saveAsync(uri);
  //   } catch (error) {
  //     console.log('Error saving picture to gallery:', error);
  //   }
  // };

  const handleConfirm = () => {
    if (capturedImage) {
      onPictureTaken(capturedImage);
      navigation.goBack();
    }
  };

  if (hasPermission === null) {
    return <Text>Access null</Text>;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={cameraRef} />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleTakePicture}>
          <Text style={styles.buttonText}>Capturar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back)}
        >
          <Text style={styles.buttonText}>Virar</Text>
        </TouchableOpacity>
      </View>

      {capturedImage && (
        <View style={styles.previewContainer}>
          <Image source={{ uri: capturedImage }} style={styles.previewImage} />
          <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
            <Text style={styles.buttonText}>Confirmar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default TakePictureScreen;