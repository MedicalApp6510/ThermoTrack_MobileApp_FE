import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Title, Button, Divider, Paragraph, useTheme } from 'react-native-paper';
import { data } from '../mockHistoryData.js';

function HistoryScreen({ navigation }) {
  const { colors } = useTheme();

  const handleLogout = () => {
    // TODO: Implement logout logic
    console.log('Logout');
    // Navigate to login screen
    navigation.navigate('Login');
  };

  const historyData = data;

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.primary }]}>
      {/* User Information */}
      <View style={styles.userInfoContainer}>
        <Title style={styles.userInfoTitle}>Hello, Joe!</Title>
      </View>

      {/* Contents */}
      <View style={[styles.contentsContainer, { backgroundColor: colors.background }]}>
        {/* History */}
        <View style={styles.historyContainer}>
          <Title style={[styles.historyTitle, { color: colors.primary }]}>History Data</Title>
          <View style={[styles.historyListContainer, { backgroundColor: colors.surfaceVariant }]}>
            {historyData.map((item, index) => (
              <View key={item.id} style={styles.historyItem}>
                <View style={styles.historyItemLeft}>
                  <Paragraph style={{color: colors.onSurfaceVariant}}>{item.timestamp}</Paragraph>
                </View>
                <View style={styles.historyItemRight}>
                  <Paragraph style={styles.temperatureText}>{item.temperature}</Paragraph>
                </View>
                {/* Render gray divider line if not the last item */}
                {index !== historyData.length - 1 && <Divider />}
              </View>
            ))}
          </View>
        </View>

        {/* Logout Button */}
        <View style={styles.logoutContainer}>
          <Button mode="contained" onPress={handleLogout} style={styles.logoutButton}>
            Log Out
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoContainer: {
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfoTitle: {
    fontSize: 32,
    color: '#ffffff',
    textAlign: 'left',
    paddingTop: 48,
    paddingLeft: 24,
    width: '100%',
  },
  contentsContainer: {
    height: '200%',
    padding: 10,
    borderRadius: 48,
    backgroundColor: '#ffffff',
  },
  historyContainer: {
    padding: 16,
  },
  historyTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  historyListContainer: {
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  historyItemLeft: {
    flex: 1,
  },
  historyItemRight: {
    minWidth: 80,
    alignItems: 'flex-end',
  },
  temperatureText: {
    color: 'gray',
  },
  logoutContainer: {
    padding: 16,
  },
  logoutButton: {
    height: 48,
    justifyContent: 'center',
  },
});

export default HistoryScreen;
