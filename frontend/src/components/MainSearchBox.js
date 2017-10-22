import React from 'react';
import {Link} from 'react-router-dom';
import {Jumbotron, Button} from 'react-bootstrap';
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