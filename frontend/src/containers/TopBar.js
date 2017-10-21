import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import SearchBox from './SearchBox';
import { connect } from 'react-redux';

const TopBar = ({ showSearchBox, user }) => {
  return (
    <div>
      <Link to="/">EduFirst</Link>
      <Link to="/topics">Topics</Link>
      {showSearchBox ? (<SearchBox />) : null}
      <Link to={user ? `/profile/${user.id}` : '/login'}>
        {user ? user.name : 'Login'}
      </Link>
    </div>
  );
};

TopBar.propTypes = {
  showSearchBox: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
};

const mapStateToProps = state => ({
  user: state.user ? {
    id: state.user.id,
    name: state.user.username,
  } : null,
  showSearchBox: state.showSearchBox,
});

export default connect(mapStateToProps)(TopBar);