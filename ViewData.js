import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TextInput } from 'react-native';
import supabase from './supabaseClient';

const ViewData = () => {
  const [storedData, setStoredData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchDataFromSupabase();
  }, []);

  useEffect(() => {
    // Filter data based on the search query
    const filtered = storedData.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.designation.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchQuery, storedData]);

  const fetchDataFromSupabase = async () => {
    try {
      const { data, error } = await supabase.from('user_details').select('*');
      console.log('Fetched data from Supabase:', data);

      if (error) {
        console.error('Error fetching data from Supabase:', error);
        return;
      }

      if (data) {
        const formattedData = data.map((item) => {
          console.log('Image URL from Supabase:', item.image); // Debug the image URL
          return {
            ...item,
            imageUri: item.image || 'https://via.placeholder.com/150', // Use placeholder if image is null
          };
        });
        setStoredData(formattedData);
        setFilteredData(formattedData); // Initialize filtered data
      } else {
        console.log('No data found in Supabase');
      }
    } catch (error) {
      console.error('Error fetching data from Supabase:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Image
          source={{
            uri: item.imageUri, // Use the imageUri directly
          }}
          style={styles.largeImage}
        />
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.cardText}><Text style={styles.bold}>Email:</Text> {item.email}</Text>
        <Text style={styles.cardText}><Text style={styles.bold}>Designation:</Text> {item.designation}</Text>
        <Text style={styles.cardText}><Text style={styles.bold}>Description:</Text> {item.description}</Text>
        <Text style={styles.cardText}><Text style={styles.bold}>Latitude:</Text> {item.latitude}</Text>
        <Text style={styles.cardText}><Text style={styles.bold}>Longitude:</Text> {item.longitude}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stored Data</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search by name or designation"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
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
  searchBar: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  listContainer: {
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2, // Adds shadow for iOS
    shadowColor: '#000', // Android shadow effect
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  largeImage: {
    width: 150, // Increased size
    height: 150, // Increased size
    borderRadius: 75, // Circle shape
    resizeMode: 'cover',
    borderWidth: 3,
    borderColor: '#ddd',
    marginLeft: 10,
  },
  cardBody: {
    marginTop: 10,
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
});

export default ViewData;
