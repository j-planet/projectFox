var React = require('react');
var $ = require('jquery');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Icon = require ('react-fa');
var Link = Router.Link;
// Others
var DropdownButton = require('react-bootstrap').DropdownButton;
var MenuItem = require('react-bootstrap').MenuItem;
var Button = require('react-bootstrap').Button;
var TimerMixin = require('react-timer-mixin');
// Actions
var AppActions = require('../../actions/AppActions');
var SessionActions = require('../../actions/SessionActions');
// Components
var SignInForm = require('./SignInForm');
var SignUpForm = require('./SignUpForm');

var TopBar = React.createClass({
  displayName: 'TopBar',
  mixins: [Router.Navigation],

  toSubmit: function(){
    if(this.props.session.isLoggedIn){
      this.transitionTo('submit');
    } else {
      this.props.toggleSignIn();
    }
  },

  render: function() {

    var signInBtn, signUpBtn, submitBtn;
    var avatar = this.props.session.userInfo ? this.props.session.userInfo.avatar : null;
    if (!this.props.session.isLoggedIn){ 
      signInBtn = <li className="cta tab">
                    <a onClick={this.props.toggleSignIn} >Sign In / Sign Up</a>
                  </li>;
      notifications = null;
    } else {
      signInBtn = <UsrDropDown avatar={avatar} />; 
      notifications = <Notification />;
    }

    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">
              <img alt="PROJECTFOX" src="" />
            </a>
          </div>
        </div>
        <div style={{"height": "70px", "position":"relative", "zIndex":"1", "background":"white"}}>
          <ul id="gn-menu" className="gn-menu-main" style={{"background": "rgba(255,255,255,0.5)"}}>
            {/* <IconMenu /> */}
            {/* <Logo /> */}
            {/* <Lang /> */}
            {signInBtn}
            {/* {notifications} */}
          </ul>
        </div>
      </nav>
    );
  }
});

//Notifications Button
var Notification_timer;
var Notification = React.createClass({
  getInitialState: function () {
    return {
      open:false,
    };
  },
  mixins: [TimerMixin],
  mouseOverhandler: function() {
    this.clearTimeout(Notification_timer);
    this.setState({open:true});
  },
  mouseOuthandler: function() {
    Notification_timer = this.setTimeout(
      ()=> {this.setState ({open:false});},
      50
    );
  },

  render: function() {
    var tabopen = "cta tab";
    if (this.state.open)
    {
        tabopen = "cta tab open";
    }
    else
    {
      tabopen = "cta tab";
    }
    return (
      <li onMouseOver={this.mouseOverhandler} onMouseOut={this.mouseOuthandler} className={tabopen}>
        <a className="dropdown-toggle" type="button" id="notification-dropdown" data-toggle="dropdown" aria-expanded="false">
          <span id="notification-badge" className="badge badge-navbar " style={{"fontSize": "inherit"}}><span className="fa fa-bell"></span><span className="num_unread" style={{"fontSize": "14px"}}> </span></span>
        </a>
        <ul className="dropdown-menu notifications" role="menu" aria-labelledby="notification-dropdown" style={{"maxWidth": "380px", "right": "0"}}>
          <li id="notification-list" style={{"overflowY":"scroll","maxHeight":"400px","padding":"10px 20px"}}>
            <div style={{"lineHeight": "30px"}}>
              You have no unread notifications
            </div>
          </li> 
          <li className="divider"></li>
          <li><a href="/notifications/mark_all_read" data-remote="true" style={{"padding":"10px 20px"}}><p>Mark all as read</p></a></li>
          <li><a href="/notifications" style={{"padding":"10px 20px"}}><p>All Notifications</p></a></li>
        </ul>
      </li>
    );
  } 
});

//User Dropdown Button
var UsrDropDown_timer;
var UsrDropDown = React.createClass({

  mixins: [TimerMixin, Router.Navigation, Router.State],

  getInitialState: function () {
    return {
      open:false,
    };
  },

  // mouseOnClick: function () {
  //   this.setState({open:true});
  // },

  // mouseOnOut: function () {
  //   this.setState ({open:false});
  // },

  mouseOverhandler: function() {
    this.clearTimeout(UsrDropDown_timer);
    this.setState({open:true});
  },
  mouseOuthandler: function() {
    UsrDropDown_timer = this.setTimeout(
      ()=> {this.setState ({open:false});},
      50
    );
  },

  signOut: function(){
    SessionActions.logout();
    // console.log(this.getPath());
    // if(this.getPath() == "/p/new"){
      // this.transitionTo('home');
    // }
  },

  render: function() {
    var tabopen = "cta tab";
    if (this.state.open)
    {
        tabopen = "cta tab open";
    }
    else
    {
      tabopen = "cta tab";
    }
    return (      
      <li onMouseOver={this.mouseOverhandler} onMouseOut={this.mouseOuthandler} className={tabopen}>
        <a className="dropdown-toggle" type="button" id="dropdownMenuDivider" data-toggle="dropdown" aria-expanded="true">
          <div style={{"position":"relative", "display":"inline"}}>
            <img className="gravatar" data-toggle="popover" height="30" src={this.props.avatar} style={{"marginRight": "0"}} width="30"/>
            <span className="caret"></span>
          </div>
        </a>
        <ul className="dropdown-menu" role="menu" aria-labelledby="dropdownMenuDivider" style={{"right":"0"}}>
          <li role="presentation"><a role="menuitem" tabIndex="-1" onClick={this.signOut} style={{"padding":"10px 20px"}}><p>Sign Out</p></a></li>
        </ul>
      </li>);
  }
});

module.exports = TopBar;

