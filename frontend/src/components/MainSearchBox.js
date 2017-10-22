import React from 'react';
import {Button, Jumbotron} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import SearchBox from '../containers/SearchBox';

const MainSearchBox = () => (
    <div className='center-block'>
      <div>EduFirst</div>
      <Link to="/search">
        <div>Search here</div>
      </Link>
      <SearchBox/>
    </div>
);

export default MainSearchBox;