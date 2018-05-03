import React from 'react';
import { Text } from 'react-native';
import styles from '../assets/styles/styles';
import PropTypes from 'prop-types';

export default FetchingScreen = () => (
  <Text style={styles.loadingText}>Fetching your climate...</Text>
)

FetchingScreen.propTypes = {}