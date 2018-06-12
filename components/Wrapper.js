import React, { Component } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import styles from '../assets/styles/styles';

import ErrorScreen from '../components/ErrorScreen';
import FetchingScreen from '../components/FetchingScreen';
import ClimateScreen from '../components/ClimateScreen';


class Wrapper extends Component {

  constructor() {
    super();
    this.state = {
      loaded: false,
      refreshing: false
    }
  }

  // pulling the screen down will refresh the app
  // setting loaded to false will re-render the view and call the weather API again
  refreshView() {
    this.setState({
      loaded: false
    });
  }

  componentDidMount() {
    this.props.onRequestWeatherDispatch();
  }

  render() {
    const appState = this.props.appState;
    const apiError = appState.error;
    const weatherArray = appState.weather != false && appState.weather;
    
    let content;

    if (apiError) { // API_CALL_ERROR
      content = <ErrorScreen />

    } else if (weatherArray) { // API_CALL_SUCCESS
      content = <ClimateScreen 
        weather={weatherArray} 
        navigation={this.props.navigation} />

    } else { // API_CALL_REQUEST
      content = <FetchingScreen />
    }

    return (
      <ScrollView 
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.props.onRequestWeatherDispatch}
          />
        }
        contentContainerStyle={styles.container}
      >
      {content}
    </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    appState: state
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onRequestWeatherDispatch: () => dispatch({ type: "API_CALL_REQUEST" })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);