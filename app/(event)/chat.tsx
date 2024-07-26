import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { ID } from 'appwrite';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

interface AppwriteConfig {
  endpoint: string;
  projectId: string;
  storageId: string;
}

const appwriteConfig: AppwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  projectId: "66719a68001431da53fb",
  storageId: "6673113e003940fea01a",
};

const Chat: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Se requiere permiso para acceder a la galería de imágenes.");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    if (!image) return;

    setUploading(true);

    try {
      const fileInfo = await FileSystem.getInfoAsync(image);
      if (!fileInfo.exists) {
        throw new Error('File does not exist');
      }

      const fileName = image.split('/').pop() || 'image.jpg';
      const fileExtension = fileName.split('.').pop() || 'jpg';
      const mimeType = `image/${fileExtension}`;

      const formData = new FormData();
      formData.append('fileId', ID.unique());
      formData.append('file', {
        uri: image,
        name: fileName,
        type: mimeType,
      } as any);

      const response = await fetch(`${appwriteConfig.endpoint}/storage/buckets/${appwriteConfig.storageId}/files`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-Appwrite-Project': appwriteConfig.projectId,
          // Añade aquí el header de autenticación si es necesario
          // 'X-Appwrite-Key': 'your-api-key' // O usa el método de autenticación que prefieras
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Network response was not ok: ${errorData}`);
      }

      const result = await response.json();
      console.log('File uploaded successfully:', result);
      alert('Imagen subida con éxito!');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error al subir la imagen. Por favor, intenta de nuevo.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Seleccionar Imagen</Text>
      </TouchableOpacity>

      {image && (
        <Image source={{ uri: image }} style={styles.image} />
      )}

      <TouchableOpacity
        style={[styles.button, uploading && styles.disabledButton]}
        onPress={uploadImage}
        disabled={uploading || !image}
      >
        <Text style={styles.buttonText}>
          {uploading ? 'Subiendo...' : 'Subir Imagen'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
  },
  disabledButton: {
    backgroundColor: '#A9A9A9',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginVertical: 15,
  },
});

export default Chat;