import React, { useCallback, useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Modal, Platform, Image, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { PROVIDER_GOOGLE } from 'react-native-maps'; // Add this import for Google Maps
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const UploadData = () => {
  const [location, setLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [designation, setDesignation] = useState('');
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState(null);

  useFocusEffect(
    useCallback(() => {
      const requestLocationPermission = async () => {
        if (Platform.OS === 'android') {
          const { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            console.warn('Location permission denied');
            return;
          }
        }
        getCurrentLocation();
      };

      const getCurrentLocation = async () => {
        try {
          const { coords } = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.High,
          });
          setLocation({
            latitude: coords.latitude,
            longitude: coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
        } catch (error) {
          console.error('Location Error:', error);
        }
      };

      requestLocationPermission();
    }, [])
  );

  const handleImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const selectedImageUri = result.assets[0].uri;
      setImageUri(selectedImageUri);
    } else {
      console.log('Image selection canceled or no image selected.');
    }
  };

  const validateInputs = () => {
    if (!name.trim()) {
      Alert.alert('Validation Error', 'Name is required.');
      return false;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      Alert.alert('Validation Error', 'Please enter a valid email.');
      return false;
    }
    if (!designation.trim()) {
      Alert.alert('Validation Error', 'Designation is required.');
      return false;
    }
    if (!description.trim()) {
      Alert.alert('Validation Error', 'Description is required.');
      return false;
    }
    return true;
  };

  const handleSaveDetails = async () => {
    if (!validateInputs()) {
      return;
    }

    const userData = new FormData();

    // Append form data
    userData.append('name', name);
    userData.append('email', email);
    userData.append('designation', designation);
    userData.append('description', description);
    userData.append('latitude', location.latitude.toString());
    userData.append('longitude', location.longitude.toString());

    // Check if image is selected and append it
    if (imageUri) {
      const uriParts = imageUri.split('.');
      const fileType = uriParts[uriParts.length - 1];

      const image = {
        uri: imageUri,
        name: `image.${fileType}`,
        type: `image/${fileType}`,
      };

      userData.append('image', image);
    }

    try {
      const response = await fetch('http://192.168.214.148:3000/sendData', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: userData,
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Data saved successfully!');
        setModalVisible(false);
      } else {
        Alert.alert('Error', 'Failed to save data. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while saving data. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={location}
        showsUserLocation={true}
        followsUserLocation={true}
      >
        <Marker
          coordinate={{ latitude: location.latitude, longitude: location.longitude }}
          title="You are here"
          description={`Latitude: ${location.latitude}, Longitude: ${location.longitude}`}
        />
      </MapView>

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => setModalVisible(true)}
      >
        <Icon name="add" size={30} color="#fff" />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter Details</Text>

            <View style={styles.inputContainer}>
              <Icon name="person" size={20} color="#555" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
              />
            </View>

            <View style={styles.inputContainer}>
              <Icon name="email" size={20} color="#555" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.inputContainer}>
              <Icon name="work" size={20} color="#555" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Designation"
                value={designation}
                onChangeText={setDesignation}
              />
            </View>

            <View style={styles.inputContainer}>
              <Icon name="description" size={20} color="#555" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
              />
            </View>

            <TouchableOpacity style={styles.imagePicker} onPress={handleImagePick}>
              <Icon name="photo-camera" size={24} color="#007bff" />
              <Text style={styles.imagePickerText}>Pick an Image</Text>
            </TouchableOpacity>

            <View style={styles.imagePreview}>
              {imageUri && <Image source={{ uri: imageUri }} style={styles.imagePreviewImage} />}
            </View>

            <Text style={styles.coordinates}>Latitude: {location.latitude}</Text>
            <Text style={styles.coordinates}>Longitude: {location.longitude}</Text>

            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSaveDetails}
            >
              <Text style={styles.saveButtonText}>Save Details</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#4caf50',
    padding: 15,
    borderRadius: 50,
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxWidth: 400,
  },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 15,
  },
  inputIcon: { marginRight: 10 },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  imagePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  imagePickerText: { marginLeft: 10, fontSize: 16, color: '#007bff' },
  imagePreview: { marginBottom: 15 },
  imagePreviewImage: { width: 100, height: 100, borderRadius: 8 },
  coordinates: { fontSize: 16, marginBottom: 10 },
  saveButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: { color: '#fff', fontSize: 16 },
  cancelButton: {
    marginTop: 10,
    backgroundColor: '#dc3545',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButtonText: { color: '#fff', fontSize: 16 },
});

export default UploadData;
