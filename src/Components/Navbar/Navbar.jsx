import React from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter, Link } from 'react-router-dom';
import './Navbar.css';

import headShot from '../../Assets/Images/mentor-5.jpg';
import { handleLogout } from '../../Actions/LoginActions';

class Nav extends React.Component {
  constructor() {
    super();
    this.state = {
      ham: false,
    };
  }
  logout = () => {
    this.props.handleLogout().then(() => {
      this.props.history.push('/');
    });
  };

  closeHam = (e) => this.state.ham ? this.setState({ ham: false }) : undefined;

  render() {
    return (
      <nav>
        {this.props.user == null ? (
          <div
            className="main-nav"
            onClick={(e) => {
              this.closeHam(e);
            }}
          >
            <NavLink to="/">
              <h1>LANGUAGETUTOR</h1>
            </NavLink>

            <div className="optionsNav">
              <div
                className={this.state.ham ? 'hamburger is-active' : 'hamburger'}
                id="hamburger-1"
                onClick={() =>
                  this.setState({
                    ham: !this.state.ham,
                  })
                }
              >
                <span className="line" />
                <span className="line" />
                <span className="line" />
              </div>

              <div className={this.state.ham ? 'links-is-open' : 'links'}>
                <NavLink to="/Signup" exact className="btn">
                  Find A Mentor
                </NavLink>
                <NavLink to="/About" className="btn">
                  Our Courses
                </NavLink>
                <NavLink to="/About" className="btn">
                  How it works
                </NavLink>
                <NavLink to="/About" className="btn">
                  About
                </NavLink>
                <NavLink to="/Contact" className="btn">
                  Contact Us
                </NavLink>

                <NavLink to="/Login" className="btn">
                  Login
                </NavLink>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="auth-dashboard">
              <div
                className="main-nav"
                onClick={(e) => {
                  this.closeHam(e);
                }}
              >
                <div className="mobile-container">
                  <NavLink to="/">
                    <h1>LANGUAGETUTOR</h1>
                  </NavLink>
                  <div
                    className={
                      this.state.ham ? 'hamburger is-active' : 'hamburger'
                    }
                    id="hamburger-1"
                    onClick={() =>
                      this.setState({
                        ham: !this.state.ham,
                      })
                    }
                  >
                    <span className="line" />
                    <span className="line" />
                    <span className="line" />
                  </div>
                </div>

                <div>
                  <div className={this.state.ham ? 'links-is-open' : 'links'}>
                    <NavLink to="/Dashboard" className="btn">
                      Dashboard
                    </NavLink>
                    <NavLink to="/studentchat" className="btn">
                      Student Chat
                    </NavLink>

                    <div className="auth-nav hide-mobile">
                      <NavLink to="/Profile" className="btn">
                        {this.props.user.account.username}
                      </NavLink>
                      <img src={headShot} alt="placeholder" />
                      <a className="btn" onClick={this.logout}>
                        Logout
                      </a>
                    </div>

                    <div className="hide-desktop">
                      <NavLink to="/Profile" className="btn profile-image">
                        <img src={headShot} alt="placeholder" />
                        profile
                      </NavLink>
                      <a className="btn" onClick={this.logout}>
                        Logout
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    );
  }
}

const mapStateToProps = state => ({ user: state.user });

const mapDispatchToProps = dispatch => ({
  handleLogout: student => dispatch(handleLogout(student)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Nav));
