import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import Modal from '../../Components/Modal/Modal';
import Login from '../../Components/Login/Login';
import Signup from '../../Components/Signup/Signup';

import hero from '../../Assets/Images/hero.jpg'
import './AuthContainer.css'

class AuthContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLogin: false,
      showSignup: false,
      showModal: true
    };
  }

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    }, () => {
      this
        .props
        .history
        .push('/');
    });
  };

  componentWillReceiveProps(nextProps) {
    //console.log('componentWillReceiveProps');
    if (nextProps.user !== null) {
      this.setState({
        showModal: false
      }, () => {
        this
          .props
          .history
          .push('/dashboard');
      })
    }
  }
  render() {
    return (
      <div className='modalContainer'>
        <p>test</p>
        <Modal isOpen={this.state.showModal} // {/* pass isOpen bool to open modal */}
          close={this.toggleModal} // {/* pass close function to close modal */}
          showClose={false} // {/* pass showClose bool to show close button or not */}
          showContinue={false} // {/* pass showContinue bool to show continue button or not */}
        >
          {this.props.location.pathname === '/Login'
            ? (<Login/>)
            : (<Signup
              title={'SIGN UP TODAY'}
              slogan={'Don\t wait another minute. Every day you could be learning something precious!'}
              pathname={this.props.location.pathname}/>)}
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = state => {
  user : state.user
}

const mapDispatchToProps = dispatch => ({
  // handleStudentSignup: (student, history) =>
  // dispatch(handleStudentSignup(student, history))

});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthContainer));

AuthContainer.propTypes = {
  location: PropTypes.shape({pathname: PropTypes.string.isRequired})
};

AuthContainer.defaultProps = {
  location: PropTypes.object
};
