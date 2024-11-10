import { Image, StyleSheet, Platform, View } from 'react-native';

import ChessBoard from '@/components/ChessBoard';

import React from 'react';

export default function HomeScreen() {
  return (
      <View style={styles.container}>
        <ChessBoard />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f0f0f0',
    },
  });
 