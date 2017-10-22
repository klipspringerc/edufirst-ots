import React from 'react';
import "./auxiliary_position.css";
import {Link} from 'react-router-dom';
import {Jumbotron, Button} from 'react-bootstrap';
import SearchBox from '../containers/LargeSearchBox.js';
const MainSearchBox = () => (
    <div className= "modal-dialog">
        <SearchBox/>
    </div>
);

export default MainSearchBox;