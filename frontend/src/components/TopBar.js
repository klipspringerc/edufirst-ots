import React from 'react';
import SearchBox from './SearchBox';

const TopBar = ({showSearchBox, user}) => (
    <div>
      <div>EduFirst</div>
      <div>Topics</div>
      {showSearchBox ? (<SearchBox/>) : null}
      <div>{user ? user.name : 'Login'}</div>
    </div>
);

export default TopBar;