import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import SearchBox from './SearchBox';
import {Navbar, Nav, NavItem} from 'react-bootstrap';

const TopBar = ({searchBox, user}) => {
  let userId = null;
  if (user.authentication !== null) {
    userId = user.authentication.userId;
  }
  return (
      <div>
        <Link to="/">EduFirst</Link>
        <Link to="/topics">Topics</Link>
        {searchBox.showSearchBox ? (<SearchBox/>) : null}
        <Link to={userId ? `/profile/${userId}` : '/login'}>
          {user.username ? user.username : 'Login'}
        </Link>
      </div>
  );
};

TopBar.propTypes = {
  searchBox: PropTypes.object.isRequired,
  user: PropTypes.object,
};

const mapStateToProps = ({user, searchBox}) => ({user, searchBox});
export default connect(mapStateToProps)(TopBar);