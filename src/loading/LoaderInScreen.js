import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  ActivityIndicator
} from 'react-native';

const Loaderscreen = props => {
  const {
    loading,
  } = props;

  return (
      <View >
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator
            animating={loading} />
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    
  },
  activityIndicatorWrapper: {
    borderRadius: 10,
  }
});

export default Loaderscreen;