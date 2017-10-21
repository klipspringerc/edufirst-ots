import React, { Component } from 'react';
import { connect } from 'react-redux';
import MainSearchBox from '../components/MainSearchBox';
import { hideSearchBox } from '../actions/search';
import PropTypes from 'prop-types';

class HomePage extends Component {

  static propTypes = {
    handleHideSearchBox: PropTypes.func.isRequired
  };
  componentDidMount() {
    this.props.handleHideSearchBox();
  }

  render() {
    return (
      <MainSearchBox />
    );
  }
}

const mapDispatchToProps = dispatch => ({ handleHideSearchBox: () => dispatch(hideSearchBox()) });

export default connect(null, mapDispatchToProps)(HomePage);