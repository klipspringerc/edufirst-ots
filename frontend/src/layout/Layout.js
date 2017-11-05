import React from 'react';
//import Footer from "../components/layout/Footer";
import Navigation from './Navigation';

export default class Layout extends React.Component {

  render() {
    const {location} = this.props;
    const containerStyle = {
      marginTop: '60px',
    };
    console.log(this);
    return (
        <div className="text-center">
          <Navigation/>
        </div>

    );
  }
}


