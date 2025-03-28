import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const Attendance = () => {
  const attendanceData = [
    { id: '1', name: 'Ayush Upadhyay', status: 'Present' },
    { id: '2', name: 'Awadesh Mishra', status: 'Absent' },
    { id: '3', name: 'Animesh Ghosh', status: 'Present' },
    { id: '4', name: 'Saad Asad Khan', status: 'Absent' },
    { id: '5', name: 'Saurabh Pal', status: 'Present' },
    { id: '6', name: 'Anjana Mam', status: 'Absent' },
    { id: '7', name: 'Anjali Mam', status: 'Present' },
    { id: '8', name: 'Parmod Kumar', status: 'Present' },
  ];

  const renderAttendanceItem = ({ item }) => (
    <View style={styles.attendanceItem}>
      <Text style={styles.attendanceName}>{item.name}</Text>
      <View style={styles.statusContainer}>
        <MaterialIcons
          name={item.status === 'Present' ? 'check-circle' : 'cancel'}
          size={24}
          color={item.status === 'Present' ? '#4CAF50' : '#e74c3c'}
        />
        <Text style={[styles.attendanceStatus, item.status === 'Present' ? styles.present : styles.absent]}>
          {item.status}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f4f6f9" />
      <View style={styles.header}>
        <Text style={styles.title}>Today's Attendance</Text>
      </View>
      <FlatList
        data={attendanceData}
        renderItem={renderAttendanceItem}
        keyExtractor={(item) => item.id}
        style={styles.attendanceList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f6f9',
  },
  header: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  }, 
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  attendanceList: {
    marginTop: 10,
  },
  attendanceItem: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  attendanceName: {
    fontSize: 18,
    color: '#333',
    fontWeight: '600',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attendanceStatus: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  present: {
    color: '#4CAF50', // Green for present
  },
  absent: {
    color: '#e74c3c', // Red for absent
  },
});

export default Attendance;