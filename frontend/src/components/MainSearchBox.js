import React from 'react';
// import "aux.css";
import {Link} from 'react-router-dom';
import {Jumbotron, Button} from 'react-bootstrap';
import SearchBox from '../containers/SearchBox';
const MainSearchBox = () => (

    <div className='col-sm-6'>
		<div class="col-md-12 col-md-offset-9">
	 		<SearchBox/>
    	</div>
	</div>
);

export default MainSearchBox;