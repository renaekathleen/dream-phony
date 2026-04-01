import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, LogBox } from 'react-native';
import { PhoneApp } from './src/components/PhoneApp';

LogBox.ignoreAllLogs();

export default function App() {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handler = (e: ErrorEvent) => {
      setError(e.message || 'Unknown error');
    };

    const orig = ErrorUtils.getGlobalHandler();
    ErrorUtils.setGlobalHandler((err: any) => {
      setError(err?.message || String(err));
      orig?.(err, true);
    });

    return () => {
      ErrorUtils.setGlobalHandler(orig);
    };
  }, []);

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorTitle}>App Error</Text>
        <Text style={styles.errorText}>{error}</Text>
        <Text style={styles.errorHint}>
          Take a screenshot and share this with the developer
        </Text>
      </View>
    );
  }

  return (
    <>
      <StatusBar style="light" />
      <PhoneApp />
    </>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    backgroundColor: '#1a0a2e',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  errorTitle: {
    color: '#ff3355',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  errorText: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'monospace',
    textAlign: 'center',
    marginBottom: 24,
  },
  errorHint: {
    color: '#888',
    fontSize: 12,
    textAlign: 'center',
  },
});
