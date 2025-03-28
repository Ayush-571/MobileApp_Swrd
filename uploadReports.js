import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { DateTimePicker } from '@react-native-community/datetimepicker'; // Updated import
import Icon from 'react-native-vector-icons/MaterialIcons';
import DocumentPicker from 'react-native-document-picker';

const UploadReport = () => {
  const [selectedName, setSelectedName] = useState('');
  const [selectedEmail, setSelectedEmail] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const onDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleFilePicker = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      setSelectedFile(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled file picker');
      } else {
        console.log('Error picking file:', err);
      }
    }
  };

  const handleUpload = () => {
    console.log('Uploading:', {
      selectedName,
      selectedEmail,
      selectedProject,
      selectedDate: selectedDate.toISOString().split('T')[0],
      selectedFile,
    });
    // You can replace the above log with an actual API call or any other action you want
  };

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Icon name="person" size={20} color="#333" />
        <Text style={styles.label}>Select Name:</Text>
      </View>
      <RNPickerSelect
        onValueChange={setSelectedName}
        items={[{ label: 'Parmod Kumar', value: 'Parmod Kumar' }, { label: 'Ayush Upadhyay', value: 'Ayush Upadhyay' }]}
        placeholder={{ label: 'Select Name...', value: '' }}
        style={pickerStyles}
      />

      <View style={styles.labelContainer}>
        <Icon name="email" size={20} color="#333" />
        <Text style={styles.label}>Enter Email:</Text>
      </View>
      <TextInput
        placeholder="Enter email address"
        value={selectedEmail}
        onChangeText={setSelectedEmail}
        style={styles.input}
      />

      <View style={styles.labelContainer}>
        <Icon name="work" size={20} color="#333" />
        <Text style={styles.label}>Select Project:</Text>
      </View>
      <RNPickerSelect
        onValueChange={setSelectedProject}
        items={[{ label: 'Project A', value: 'Project A' }, { label: 'Project B', value: 'Project B' }]}
        placeholder={{ label: 'Select Project...', value: '' }}
        style={pickerStyles}
      />

      <View style={styles.labelContainer}>
        <Icon name="date-range" size={20} color="#333" />
        <Text style={styles.label}>Select Date:</Text>
      </View>
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePickerButton}>
        <Text style={styles.dateText}>{selectedDate.toISOString().split('T')[0]}</Text>
      </TouchableOpacity>

      {Platform.OS === 'android' && showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}

      <View style={styles.labelContainer}>
        <Icon name="attach-file" size={20} color="#333" />
        <Text style={styles.label}>Upload PDF:</Text>
      </View>
      <TouchableOpacity onPress={handleFilePicker} style={styles.uploadButton}>
        <Text style={styles.uploadText}>{selectedFile ? selectedFile.name : 'Choose File'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleUpload} style={styles.uploadButton}>
        <Icon name="cloud-upload" size={24} color="white" />
        <Text style={styles.uploadText}>Upload</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f9f9f9', flex: 1 },
  labelContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  label: { fontWeight: 'bold', marginLeft: 8, color: '#333' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5, backgroundColor: '#fff' },
  datePickerButton: { padding: 10, backgroundColor: '#d9d9d9', borderRadius: 5, marginBottom: 10 },
  dateText: { fontSize: 16, color: '#333' },
  uploadButton: { flexDirection: 'row', backgroundColor: '#4CAF50', padding: 12, borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  uploadText: { color: 'white', fontSize: 16, marginLeft: 8 },
});

const pickerStyles = StyleSheet.create({
  inputAndroid: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 10 },
  inputIOS: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 10 },
});

export default UploadReport;
