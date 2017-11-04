import FontIcon from 'material-ui/FontIcon';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Iconaccount from 'material-ui/svg-icons/action/account-circle';
import Icontopics from 'material-ui/svg-icons/action/view-module';
import PropTypes from 'prop-types';
import React from 'react';
import {Nav, Navbar, NavItem} from 'react-bootstrap';
import {connect} from 'react-redux';
import {IndexLink, Link} from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import SearchBox from '../containers/SearchBox';

const dashboardIcon = <FontIcon className='material-icons'>Edufirst</FontIcon>;
const topicsIcon = <Icontopics/>;
const profileIcon = <Iconaccount/>;

injectTapEventPlugin();

class Navigation extends React.Component {

  static propTypes = {
    searchBox: PropTypes.object.isRequired,
    user: PropTypes.object,
  };

  constructor() {
    super();
    this.state = {
      selectedIndex: 0,
    };
    this.select = ((index) => {
      this.setState({selectedIndex: index});
      console.log(this.state.selectedIndex);
    }).bind(this);
  }

  getChildContext() {
    return {muiTheme: getMuiTheme(baseTheme)};
  }

  render() {
    const {user, searchBox} = this.props;
    let userID = null;
    if (user.authentication && user.authentication.status == 'success') {
      userID = user.username;
    }
    else {
      userID = null;
    }
    return (
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">Edufirst</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem href="/topics">Topics</NavItem>
            <Nav>
              {searchBox.showSearchBox ? (<SearchBox/>) : (null)}
            </Nav>
          </Nav>
          <Nav pullRight>
            <Nav>
              <NavItem
                  href={userID ? `/profile/${userID}` : '/login'}>{userID
                  ? user.username
                  : 'Login'}</NavItem>
            </Nav>

          </Nav>
        </Navbar>
    );
    /*return (
      <Paper zDepth={1} style={{textAlign:'center'}}>
        <BottomNavigation selectedIndex={this.state.selectedIndex}>
          <BottomNavigationItem
            href="/"
            icon={dashboardIcon}
            onTouchTap={() => this.select(0)}
          />
          <BottomNavigationItem
            href="/topics"             
            label="Topics"
            icon={topicsIcon}
            onTouchTap={() => this.select(1)}
          />
          <BottomNavigationItem
            href="#settings"
            label="Me"
            icon={profileIcon}
            onTouchTap={() => this.select(3)}
          />
        </BottomNavigation>
        {(searchBox.showSearchBox) ? (<SearchBox/>) : null}
      </Paper>

    );
    */
  }
}

Navigation.childContextTypes = {
  muiTheme: PropTypes.object.isRequired,
};
const mapStateToProps = ({user, searchBox}) => ({user, searchBox});
export default connect(mapStateToProps)(Navigation);
