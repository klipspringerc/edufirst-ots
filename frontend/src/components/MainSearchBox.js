import React from 'react';
import {Link} from 'react-router-dom';

const MainSearchBox = () => (
    <div>
      <div>EduFirst</div>
      <Link to="/search">
        <div>Search here</div>
      </Link>
    </div>
);

export default MainSearchBox;