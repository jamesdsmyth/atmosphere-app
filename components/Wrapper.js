import React, { Component } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import styles from '../assets/styles/styles';

import ErrorScreen from './ErrorScreen';
import FetchingScreen from './FetchingScreen';
import ClimateScreen from './ClimateScreen';


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
    this.props.onRequestWeather();
  }

  render() {

    const appState = this.props.appState;
    const weatherArray = appState.weather != false && appState.weather;
    const APIError = appState.error;
    let content;

    if (APIError) {
      content = <ErrorScreen />

    } else if (weatherArray) {
      content = <ClimateScreen weather={weatherArray} />

    } else {
      content = <FetchingScreen />
    }

    return (
      <ScrollView 
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.props.onRequestWeather}
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
    onRequestWeather: () => dispatch({ type: "API_CALL_REQUEST" })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);