import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import firebase from 'firebase';
import history from '../../Lib/browserHistory';
// import { createBrowserHistory } from 'history';
import './App.css';

import { setFirebaseUserToRedux } from '../../Actions/LoginActions';

import Navbar from '../../Components/Navbar/Navbar';
import LandingPage from '../LandingPage/LandingPage';
import Dashboard from '../Dashboard/Dashboard';
import StudentChatContainer from '../../Containers/StudentChatContainer/StudentChatContainer';
import AuthContainer from '../../Containers/AuthContainer/AuthContainer';
import About from '../../Components/About/About';
import Contact from '../../Components/Contact/Contact';
import Footer from '../../Components/Footer/Footer';

// createBrowserHistory(); export const history;
const config = {
  apiKey: 'AIzaSyCYPz3TccePYGO17K_a3S7rsVbYyS2Shiw',
  authDomain: 'language-tutor-a1bdd.firebaseapp.com',
  databaseURL: 'https://language-tutor-a1bdd.firebaseio.com',
  projectId: 'language-tutor-a1bdd',
  storageBucket: 'language-tutor-a1bdd.appspot.com',
  messagingSenderId: '829609721946',
};
firebase.initializeApp(config);

const PageNotFound = () => (
  <div className="container">
    <h1
      style={{
        color: 'red',
        fontSize: '5em',
      }}
      data-text="Page Not Found"
      className="glitch"
    >
      Page Not Found
    </h1>
  </div>
);

class App extends React.Component {
  componentDidMount() {
    // console.log('app did mount {this.prop}', this.props);
    firebase.auth().onAuthStateChanged((user) => {
      // ********* If a user is logged in firebase will return the user object. THEY
      // ARE NOT LOGGED IN THOUGH *********
      if (user) {
        // console.log("onAuthStateChanged", user); ********* Then we call an official
        // Firebase login function through actions *********
        this.props.setFirebaseUserToRedux(user);
      } else {
        // console.log("No user signed in");
      }
    });
  }

  componentDidUpdate() {
    // console.log("APP UPDATED (this.state, this.props)", this.state, this.props);
  }
  render() {
    return (
      <div className="App">
        {/*eslint-disable */}
        <Router history={history}>
          {/* eslint-enable */}
          <div>
            <Navbar />
            <div className="main-app">
              <Switch>
                <Route
                  exact
                  path="/"
                  component={() =>
                    this.props.user === null ? (
                      <LandingPage />
                    ) : (
                      <Redirect to="/dashboard" />
                    )
                  }
                />{' '}
                <Route
                  exact
                  path="/dashboard"
                  component={() =>
                    this.props.user !== null ? (
                      <Dashboard />
                    ) : (
                      <Redirect to="/Login" />
                    )
                  }
                />
                <Route
                  exact
                  path="/studentchat"
                  component={StudentChatContainer}
                />
                <Route exact path="/teacherSignup" component={AuthContainer} />
                <Route exact path="/Signup" component={AuthContainer} />
                <Route exact path="/Login" component={AuthContainer} />
                <Route exact path="/About" component={About} />
                <Route exact path="/Contact" component={Contact} />
                <Route component={PageNotFound} />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => ({ user: state.user });

const mapDispatchToProps = dispatch => ({
  setFirebaseUserToRedux: user => dispatch(setFirebaseUserToRedux(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
