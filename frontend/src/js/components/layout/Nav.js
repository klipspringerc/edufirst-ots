import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import Iconfavorite from 'material-ui/svg-icons/action/favorite-border';
import Icongift from 'material-ui/svg-icons/action/card-giftcard';
import Iconme from 'material-ui/svg-icons/action/account-box';
import { IndexLink, Link } from "react-router";
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';

const dashboardIcon = <FontIcon className='material-icons'>dashboard</FontIcon>;
const preferrenceIcon = <Iconfavorite />;
const giftIcon = <Icongift />;
const profileIcon = <Iconme />;

/*
<nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div class="container">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle" onClick={this.toggleCollapse.bind(this)} >
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
          </div>
          <div class={"navbar-collapse " + navClass} id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
              <li activeClassName="active" onlyActiveOnIndex={true}>
                <IndexLink to="/" onClick={this.toggleCollapse.bind(this)}>Featured</IndexLink>
              </li>
              <li activeClassName="active">
                <Link to="archives" onClick={this.toggleCollapse.bind(this)}>Archives</Link>
              </li>
              <li activeClassName="active">
                <Link to="settings" onClick={this.toggleCollapse.bind(this)}>Settings</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
*/
injectTapEventPlugin();
export default class Nav extends React.Component {
  constructor() {
    super()
    this.state = {
      selectedIndex: 0,
    };
  }

  select = (index) => {this.setState({selectedIndex: index}), console.log(this.state.selectedIndex)}

  getChildContext() {
                return { muiTheme: getMuiTheme(baseTheme) };
            }

  render() {
    //const { location } = this.props;
    //const { collapsed } = this.state;
    // const featuredClass = location.pathname === "/" ? "active" : "";
    // const archivesClass = location.pathname.match(/^\/archives/) ? "active" : "";
    // const settingsClass = location.pathname.match(/^\/settings/) ? "active" : "";
    //const navClass = collapsed ? "collapse" : "";
    //console.log(this);
    return (
      <Paper zDepth={1} style={{textAlign:'center'}}>
        <BottomNavigation selectedIndex={this.state.selectedIndex}>
          <BottomNavigationItem
            href="#"
            label="Dashboard"
            icon={dashboardIcon}
            onTouchTap={() => this.select(0)}
          />
          <BottomNavigationItem
            href="#archives"             
            label="Preferrence"
            icon={preferrenceIcon}
            onTouchTap={() => this.select(1)}
          />
          <BottomNavigationItem
            href="#settings"
            label="Reward"
            icon={giftIcon}
            onTouchTap={() => this.select(2)}
          />

          <BottomNavigationItem
            href="#settings"
            label="Me"
            icon={profileIcon}
            onTouchTap={() => this.select(3)}
          />
        </BottomNavigation>
      </Paper>

    );
  }
}
Nav.childContextTypes = {
            muiTheme: React.PropTypes.object.isRequired,
        };

