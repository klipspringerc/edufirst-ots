import React from 'react';

const MainSearchBox = ({onChange}) => (
    <div>
      <div>EduFirst</div>
      <input type="text"
             onChange={onChange}
             placeholder="Enter your search query here."/>
    </div>
);

export default MainSearchBox;