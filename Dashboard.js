import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { BarChart, LineChart } from 'react-native-chart-kit';

const { width, height } = Dimensions.get('window');

const Dashboard = ({ route }) => {
  const navigation = useNavigation();
  const { name, email } = route.params;

  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [sidebarAnimation] = useState(new Animated.Value(-width * 0.8));
  const [headerAnimation] = useState(new Animated.Value(-100));
  const [cardAnimation] = useState(new Animated.Value(0));
  const [uploadAnimation] = useState(new Animated.Value(0));

  const toggleSidebar = () => {
    const toValue = isSidebarVisible ? -width * 0.8 : 0;
    Animated.timing(sidebarAnimation, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setSidebarVisible(!isSidebarVisible);
  };

  useEffect(() => {
    Animated.sequence([
      Animated.timing(headerAnimation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(cardAnimation, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
      Animated.timing(uploadAnimation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const profileData = {
    name: name,
    email: email,
    role: 'Admin',
    profilePic: 'https://randomuser.me/api/portraits/men/11.jpg',
  };

  const sidebarOptions = [
    { title: 'Profile', icon: 'person-outline', onPress: () => navigation.navigate('Profile') },
    { title: 'Settings', icon: 'settings-outline', onPress: () => navigation.navigate('Settings') },
    { title: 'Help', icon: 'help-circle-outline', onPress: () => navigation.navigate('Help') },
    { title: 'Logout', icon: 'log-out-outline', onPress: () => console.log('Logout Pressed') },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Navbar */}
        <View style={styles.navbar}>
          <View style={styles.navbarLeft}>
            <View style={styles.navbarTitleContainer}>
              <Ionicons name="water-outline" size={20} color="#fff" style={styles.navbarIconLeft} />
              <Text style={styles.navbarTitle}>Surface Water</Text>
            </View>
            <Text style={styles.navbarSubtitle}>Resource Division</Text>
          </View>
          <View style={styles.navbarIcons}>
            <TouchableOpacity onPress={() => navigation.navigate('Search')}>
              <Ionicons name="search-outline" size={24} color="#fff" style={styles.navbarIcon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
              <Ionicons name="notifications-outline" size={24} color="#fff" style={styles.navbarIcon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
              <Ionicons name="settings-outline" size={24} color="#fff" style={styles.navbarIcon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleSidebar}>
              <Image source={{ uri: profileData.profilePic }} style={styles.profilePic} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Sidebar */}
        <Animated.View style={[styles.sidebar, { transform: [{ translateX: sidebarAnimation }] }]}>
          <Ionicons
            name="close"
            size={24}
            color="#fff"
            style={styles.closeIcon}
            onPress={toggleSidebar}
          />
          <Image source={{ uri: profileData.profilePic }} style={styles.sidebarProfilePic} />
          <Text style={styles.sidebarName}>{profileData.name}</Text>
          <Text style={styles.sidebarEmail}>{profileData.email}</Text>
          <Text style={styles.sidebarRole}>{profileData.role}</Text>

          {/* Sidebar Options */}
          <View style={styles.sidebarOptions}>
            {sidebarOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.sidebarOption}
                onPress={option.onPress}
              >
                <Ionicons name={option.icon} size={20} color="#fff" style={styles.sidebarOptionIcon} />
                <Text style={styles.sidebarOptionText}>{option.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {/* Main Content */}
        <ScrollView contentContainerStyle={styles.scrollContainer}>

          {/* Action Cards */}
          <View style={styles.actionCardsContainer}>
            <View style={styles.actionCard}>
              <Ionicons
                name="eye-outline"
                size={40}
                color="#8e44ad"
                onPress={() => navigation.navigate('ViewData')}
              />
              <Text style={styles.actionCardTitle}>View Data</Text>
              
            </View>
            <View style={styles.actionCard}>
              <Ionicons
                name="eye-outline"
                size={40}
                color="#8e44ad"
                onPress={() => navigation.navigate('Attendance')}
              />
              <Text style={styles.actionCardTitle}>View Attendance</Text>
            </View>
          </View>
          <View style={styles.actionCardsContainer}>
            <View style={styles.actionCard}>
              <Ionicons
                name="cloud-upload-outline"
                size={40}
                color="#3498db"
                onPress={() => navigation.navigate('UploadData')}
              />
              <Text style={styles.actionCardTitle}>Upload Data</Text>
            </View>
            <View style={styles.actionCard}>
              <Ionicons
                name="settings-outline"
                size={40}
                color="#e67e22"
                onPress={() => navigation.navigate('Settings')}
              />
              <Text style={styles.actionCardTitle}>Settings</Text>
            </View>
          </View>
          <View style={styles.actionCardsContainer}>
            <View style={styles.actionCard}>
              <Ionicons
                name="analytics-outline"
                size={40}
                color="#3498db"
                onPress={() => navigation.navigate('SystemOverview')}
              />
              <Text style={styles.actionCardTitle}>System Overview</Text>
            </View>
            <View style={styles.actionCard}>
              <Ionicons
                name="people-outline"
                size={40}
                color="#e67e22"
                onPress={() => navigation.navigate('UserManagement')}
              />
              <Text style={styles.actionCardTitle}>User Management</Text>
            </View>
          </View>
          <View style={styles.actionCardsContainer}>
            <View style={styles.actionCard}>
              <Ionicons
                name="folder-outline"
                size={40}
                color="#2ecc71"
                onPress={() => navigation.navigate('DataManagement')}
              />
              <Text style={styles.actionCardTitle}>Data Management</Text>
            </View>
            <View style={styles.actionCard}>
              <Ionicons
                name="notifications-outline"
                size={40}
                color="#e74c3c"
                onPress={() => navigation.navigate('NotificationSender')}
              />
              <Text style={styles.actionCardTitle}>Notification Sender</Text>
            </View>
          </View>

          {/* Charts Section */}
          <View style={styles.chartSection}>
            <Text style={styles.sectionTitle}>Statistics</Text>
            <BarChart
              data={{
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
                datasets: [{ data: [2000, 3000, 4000, 2500, 3500] }],
              }}
              width={width - 40}
              height={220}
              chartConfig={{
                backgroundColor: '#1cc910',
                backgroundGradientFrom: '#43a047',
                backgroundGradientTo: '#66bb6a',
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                barPercentage: 0.5,
              }}
              style={styles.chart}
            />
          </View>

          <View style={styles.chartSection}>
            <Text style={styles.sectionTitle}>Data</Text>
            <LineChart
              data={{
                labels: ['2015', '2016', '2017', '2018', '2019'],
                datasets: [{ data: [50, 80, 45, 90, 100] }],
              }}
              width={width - 40}
              height={220}
              chartConfig={{
                backgroundColor: '#e3f2fd',
                backgroundGradientFrom: '#64b5f6',
                backgroundGradientTo: '#42a5f5',
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                strokeWidth: 2,
              }}
              style={styles.chart}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f4f6f9',
  },
  container: {
    flex: 1,
    backgroundColor: '#f4f6f9',
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2c3e50',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  navbarLeft: {
    flexDirection: 'column',
  },
  navbarTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navbarTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  navbarSubtitle: {
    color: '#dfe6e9',
    fontSize: 14,
    marginTop: 2,
  },
  navbarIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navbarIcon: {
    marginRight: 15,
  },
  navbarIconLeft: {
    marginRight: 5,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  header: {
    padding: 20,
    backgroundColor: '#3498db',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5,
    transform: [{ translateY: -100 }],
  },
  scrollContainer: {
    padding: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: width / 2 - 30,
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    transform: [{ scale: 0 }],
  },
  statValue: {
    fontSize: 22,
    color: '#fff',
    marginVertical: 10,
  },
  statTitle: {
    fontSize: 14,
    color: '#fff',
  },
  chartSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  chart: {
    borderRadius: 10,
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1000,
    width: width * 0.8,
    height: height,
    backgroundColor: '#34495e',
    padding: 20,
    elevation: 10,
  },
  closeIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  sidebarProfilePic: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#fff',
  },
  sidebarName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  sidebarEmail: {
    fontSize: 14,
    color: '#dfe6e9',
    marginBottom: 10,
  },
  sidebarRole: {
    fontSize: 12,
    color: '#bdc3c7',
    marginBottom: 20,
  },
  sidebarOptions: {
    marginTop: 20,
  },
  sidebarOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#7f8c8d',
  },
  sidebarOptionIcon: {
    marginRight: 15,
  },
  sidebarOptionText: {
    fontSize: 16,
    color: '#fff',
  },
  uploadCard: {
    backgroundColor: '#27ae60',
    padding: 25,
    borderRadius: 15,
    marginBottom: 20,
    alignItems: 'center',
    opacity: 0,
  },
  uploadIcon: {
    marginBottom: 15,
  },
  uploadTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  uploadDescription: {
    fontSize: 14,
    color: '#ecf0f1',
    textAlign: 'center',
    marginBottom: 15,
  },
  uploadButton: {
    backgroundColor: '#e67e22',
    padding: 12,
    borderRadius: 8,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  notificationCard: {
    backgroundColor: '#ffcc80',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  notificationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  notificationDescription: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 15,
  },
  notificationButton: {
    backgroundColor: '#f57c00',
    padding: 12,
    borderRadius: 8,
  },
  notificationButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  actionCardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  actionCard: {
    width: width / 2 - 30,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  actionCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 10,
  },
});

export default Dashboard;
