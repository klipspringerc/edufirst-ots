import React from "react";
import { Link } from "react-router";
//import svg_circle from "../components/layout/svg_circle";
//const svg_circle = require('../components/layout/svg_circle').svg_circle;
//import {Circle} from 'rc-progress';
import Footer from "../components/layout/Footer";
import Nav from "../components/layout/Nav";

export default class Layout extends React.Component {

  render() {
    const { location } = this.props;
    const containerStyle = {
      marginTop: "60px"
    };
    console.log(this);
    return (
      <div>

        <Nav />
        <div class="container" style={containerStyle}>
          <div class="row">
            <div class="col-lg-12">
              <h1>iTCM</h1>

              {this.props.children}

            </div>
          </div>
          <Footer/>
        </div>
      </div>

    );
  }
}


