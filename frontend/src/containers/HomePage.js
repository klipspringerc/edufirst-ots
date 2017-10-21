import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {hideSearchBox} from '../actions/search';
import MainSearchBox from '../components/MainSearchBox';

class HomePage extends Component {

  static propTypes = {
    handleHideSearchBox: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.handleHideSearchBox();
  }

  render() {
    return (
        <MainSearchBox/>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  handleHideSearchBox: () => dispatch(hideSearchBox()),
});

export default connect(null, mapDispatchToProps)(HomePage);