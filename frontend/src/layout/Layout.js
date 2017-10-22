import React from "react";
import { Link } from "react-router-dom";
//import Footer from "../components/layout/Footer";
import Navigation from "./Navigation";

export default class Layout extends React.Component {

  render() {
    const { location } = this.props;
    const containerStyle = {
      marginTop: "60px"
    };
    console.log(this);
    return (
      <div>
        <Navigation />
      </div>

    );
  }
}


