import PropTypes from 'prop-types';
import React, {Component} from 'react';
import Particles from 'react-particles-js';
import {connect} from 'react-redux';
import {hideSearchBox, showSearchBox} from '../actions/search';
import '../components/auxiliary_position.css';
import MainSearchBox from '../components/MainSearchBox';

class HomePage extends Component {

  static propTypes = {
    handleHideSearchBox: PropTypes.func.isRequired,
    handleShowSearchBox: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.handleHideSearchBox();
  }

  componentWillUnmount() {
    this.props.handleShowSearchBox();
  }

  render() {
    return (
        <div>
          <Particles params={{
            particles: {
              line_linked: {
                shadow: {
                  enable: true,
                  color: '#022cfc',
                  blur: 10,
                },
              },
            },
          }}
                     style={{
                       width: 100,
                     }}/>
          <div className="middle-row">
            <img
                src={'http://edufirstedu.com/includes/jQuerySlider2/PowerSlider3/EduFirst%20Logo%20FINAL.png'}/>
          </div>
          <MainSearchBox/>
        </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  handleHideSearchBox: () => dispatch(hideSearchBox()),
  handleShowSearchBox: () => dispatch(showSearchBox()),
});

export default connect(null, mapDispatchToProps)(HomePage);