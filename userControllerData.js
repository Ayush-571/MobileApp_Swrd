import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Alert, Modal, TouchableOpacity, Animated } from 'react-native';
import supabase from './supabaseClient';
import { MaterialIcons } from '@expo/vector-icons';

// Replace with your Cloudinary cloud name
const CLOUDINARY_CLOUD_NAME = 'daiat0bcc';

const ViewData = () => {
  const [storedData, setStoredData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial fade value

  useEffect(() => {
    fetchDataFromSupabase();
  }, []);

  const fetchDataFromSupabase = async () => {
    try {
      const { data, error } = await supabase
        .from('user_details')
        .select('*');

      if (error) {
        console.error('Error fetching data from Supabase:', error.message);
        return;
      }

      const dataWithImageUrls = data.map((item) => {
        const imageUrl = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/v1/${item.image}`;
        return { ...item, imageUrl };
      });

      setStoredData(dataWithImageUrls);
      animateList(); // Trigger the animation after data is set
    } catch (error) {
      console.error('Error in fetchDataFromSupabase:', error);
    }
  };

  const animateList = () => {
    Animated.timing(fadeAnim, {
      toValue: 1, // Full opacity
      duration: 1000, // 1 second fade
      useNativeDriver: true,
    }).start();
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleDelete = async (id) => {
    // Confirm deletion with the user
    Alert.alert(
      'Delete Item',
      'Are you sure you want to delete this item?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              const { error } = await supabase
                .from('user_details')
                .delete()
                .eq('id', id);

              if (error) {
                Alert.alert('Error', 'Failed to delete item');
                console.error('Error deleting item:', error.message);
              } else {
                // Refresh the list after deletion
                setStoredData((prevData) => prevData.filter((item) => item.id !== id));
              }
            } catch (error) {
              console.error('Error in delete operation:', error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const renderItem = ({ item }) => {
    const imageUrl = item.image
      ? item.image.startsWith('http')
        ? item.image
        : `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${item.image}`
      : null;

    return (
      <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
        <TouchableOpacity onPress={() => handleImagePress(imageUrl)}>
          {imageUrl ? (
            <Image
              source={{ uri: imageUrl }}
              style={styles.largeImage}
              onError={() => {
                Alert.alert('Error', 'Image failed to load.');
              }}
            />
          ) : (
            <Text style={styles.cardText}>Image not available</Text>
          )}
        </TouchableOpacity>
        <View style={styles.cardInfo}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text style={styles.cardText}><Text style={styles.bold}>Email:</Text> {item.email}</Text>
          <Text style={styles.cardText}><Text style={styles.bold}>Designation:</Text> {item.designation}</Text>
          <Text style={styles.cardText}><Text style={styles.bold}>Description:</Text> {item.description}</Text>
          <Text style={styles.cardText}><Text style={styles.bold}>Latitude:</Text> {item.latitude}</Text>
          <Text style={styles.cardText}><Text style={styles.bold}>Longitude:</Text> {item.longitude}</Text>
          <Text style={styles.cardText}><Text style={styles.bold}>Date:</Text> {formatDate(item.created_at)}</Text>
        </View>
        {/* Delete Button */}
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item.id)} // Pass item id to the delete function
        >
          <MaterialIcons name="delete" size={24} color="red" />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const handleImagePress = (imageUrl) => {
    setSelectedImage(imageUrl);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedImage(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stored Data</Text>
      <FlatList
        data={storedData}
        keyExtractor={(item) => item.id.toString()} // Use item.id for unique keys
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />

      {/* Modal for Enlarged Image */}
      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.modalCloseButton} onPress={closeModal}>
            <MaterialIcons name="close" size={30} color="#fff" />
          </TouchableOpacity>
          {selectedImage && (
            <Image source={{ uri: selectedImage }} style={styles.modalImage} />
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f6f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  listContainer: {
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  largeImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    resizeMode: 'cover',
    borderWidth: 2,
    borderColor: '#ddd',
    marginRight: 15,
  },
  cardInfo: {
    flex: 1,
  },
  cardText: {
    fontSize: 14,
    marginBottom: 5,
    color: '#555',
  },
  bold: {
    fontWeight: 'bold',
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 20,
  },
  modalCloseButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
  modalImage: {
    width: '100%',
    height: '80%',
    borderRadius: 10,
    resizeMode: 'contain',
  },
  deleteButton: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ViewData;