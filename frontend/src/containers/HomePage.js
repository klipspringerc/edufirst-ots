import PropTypes from 'prop-types';
import "../components/auxiliary_position.css"
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
        <div>
          <div className="middle-row">
            <img src={"http://edufirstedu.com/includes/jQuerySlider2/PowerSlider3/EduFirst%20Logo%20FINAL.png"}/>
          </div>
          <MainSearchBox/>
        </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  handleHideSearchBox: () => dispatch(hideSearchBox()),
});

export default connect(null, mapDispatchToProps)(HomePage);