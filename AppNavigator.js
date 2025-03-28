// src/navigation/AppNavigator.js

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../components/Login';
import Dashboard from '../components/Dashboard';
import UploadData from '../components/UploadData';
import ViewData from '../components/ViewData';
import AdminViewData from '../components/AdminViewData';
import ForgotPassword from '../screens/ForgotPassword';
import Signup from '../screens/Signup';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="UploadData" component={UploadData} />
        <Stack.Screen name="ViewData" component={ViewData} />
        <Stack.Screen name="AdminViewData" component={AdminViewData} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="Signup" component={Signup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
