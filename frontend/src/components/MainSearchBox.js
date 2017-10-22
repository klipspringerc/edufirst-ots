import React from 'react';
<<<<<<< HEAD
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
=======
import "./auxiliary_position.css";
import {Link} from 'react-router-dom';
import {Jumbotron, Button} from 'react-bootstrap';
import SearchBox from '../containers/LargeSearchBox.js';
const MainSearchBox = () => (
<div className= "modal-dialog">
	<SearchBox/>
</div>
>>>>>>> 469d27e800a4cffa713730100f388517b452cdaa
);

export default MainSearchBox;