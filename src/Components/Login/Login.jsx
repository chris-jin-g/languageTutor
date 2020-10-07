import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import './Login.css';

import {handleStudentLogin} from '../../Actions/LoginActions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      email: '',
      passwordError: '',
      emailError: ''
    };
  }

  componentDidUpdate() {}

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({
      loading: true
    }, () => {

      if (this.state.password === '' || this.state.email === '') {
        this.setState({errors: true});
      } else if (!this.state.errors) {
        this
          .props
          .handleStudentLogin(this.state, this.props.history);
      } else {
        // console.log('Whoops theres errors');
      }
    })
  };

  handleChange = name => (event) => {
    const passwordReg = /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,24}$/;
    const emailReg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.setState({[name]: event.target.value});

    if (name === 'password') {
      return !passwordReg.test(event.target.value)
        ? this.setState({
          passwordError: 'Password be at least 8 characters, two uppercase letter, two numbers, one specia' +
              'l character',
          errors: true
        })
        : this.setState({passwordError: '', errors: false});
    }
    if (name === 'email') {
      return !emailReg.test(event.target.value)
        ? this.setState({emailError: "Whoops that's not a valid email", errors: true})
        : this.setState({emailError: '', errors: false});
    }
  };

  render() {
    return (
      <div className='loginContainer'>
        <h2>Login</h2>
        <form onSubmit={this.onSubmit} className="ModalForm">
          <input
            onChange={this.handleChange('email')}
            id="email"
            type="email"
            placeholder="Email"/>
          <input
            onChange={this.handleChange('password')}
            id="password"
            type="password"
            placeholder="Password"/>
          <button>Login</button>
        </form>
        {this.state.passwordError !== '' || this.state.emailError !== ''
          ? (
            <h4>errors</h4>
          )
          : (undefined)}
      </div>
    );
  }
}

const mapStateToProps = state => ({user: state.user});

const mapDispatchToProps = dispatch => ({
  handleStudentLogin: (student, history) => dispatch(handleStudentLogin(student, history))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));

Login.propTypes = {
  pathname: PropTypes.string.isRequired
};
