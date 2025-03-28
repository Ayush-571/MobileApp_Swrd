import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Analytics = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Analytics Screen</Text>
      <Text style={styles.description}>
        Here you can display charts, graphs, or data analytics related to your app.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 20,
    color: '#666',
  },
});

export default Analytics;
