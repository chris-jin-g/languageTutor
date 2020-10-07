import React from 'react'
import firebase from 'firebase'
import {connect} from 'react-redux'

import Spinner from '../../Components/Spinner/Spinner'
import ChatRoom from '../ChatRoom/ChatRoom';

import './TestChat.css'
class TextChat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userToDM: '',
      requestingUserToChat: '',
      loading: false,
      textChatPendingRequest: false,
      allowPendingTextRequest: false
    }
  }

  componentDidMount() {
    console.log('text chat mounted', this.props)
    firebase
      .database()
      .ref('onlineUsers')
      .on('child_changed', (snapshot) => {
        const updatedUser = snapshot.val();
        console.log('Online User Child Changed!', updatedUser);
        // If our account updates we know someone pushed new token and session data onto
        // our DB object (down below we did this)
        if (updatedUser.uid === this.props.user.account.uid) {
          firebase.database()
          // We need the requesting user info to be able to point back to them completing
          // our recursion circle.
            .ref(`onlineUsers/${updatedUser.textChatRoom.requestingUser.uid}`)
            .once('value')
            .then((snapShot2) => {
              const requestingUserProfile = snapShot2.val();
              console.log(requestingUserProfile);
              this.setState({
                requestingUserToChat: requestingUserProfile,
                //  textChatPendingRequest: true,
                allowPendingTextRequest: true
              });
            })
            .catch(err => console.log(err))
        }
      });
  }

  componentDidUpdate() {
    console.log('text chat updated props, state', this.props, this.state)
  }

  handleStartDM = (user) => {
    this.setState({
      userToDM: user
    }, () => {
      // chatRoomKeys
      firebase
        .database()
        .ref(`onlineUsers/${this.props.user.account.uid}/textChatRoom`)
        .set({requestingUser: this.state.userToDM})
        // Set the chatroom token and keys to THE REQUESTING USER (we just clicked them
        // from the list)
        .then(() => {
          firebase
            .database()
            .ref(`onlineUsers/${this.state.userToDM.uid}/textChatRoom`,)
            .set({requestingUser: this.props.user.account})
            // Then store the token and session in state for good measure!
            .then(() => {
              this.setState({loading: false});
            });
        });

    })
  }

  handleChange = name => (event) => {

    this.setState({[name]: event.target.value});

  };

  // handlePendingUserTextChat = () => {   this.setState({
  // allowPendingTextRequest: true,     textChatPendingRequest: false   }, () =>
  // this.handleStartDM(this.state.userToDM),); };

  render() {
    return (
      <div className="TextChatContainer">
        <h3>Online students for CHATTTT</h3>
        <ChatRoom />
        {this
          .props
          .onlineUsers
          .map((ele, index) => {
            return <p onClick={() => this.handleStartDM(ele)}>{ele.username}</p>
          })}

        {this.state.allowPendingTextRequest
          ? <div>
              <h2>You are now TEXT chatting with {this.props.user.textChatRoom.requestingUser.username}</h2>
              <p>--------------</p>
              <textarea
                style={{
                height: '50px'
              }}
                onChange={this.handleChange('message')}
                id="message"
                type="text"
                placeholder='howdy'
                value={this.state.message}/>

            </div>
          : undefined}

        {this.state.textChatPendingRequest
          ? (
            <div>
              <p>{this.state.requestingUserToChat.name}
                wants to text chat!</p>
              <button onClick={this.handlePendingUserTextChat}>
                Accept
              </button>
            </div>
          )
          : (undefined)}

        {this.state.loading
          ? <Spinner/>
          : undefined}
      </div>
    )
  }
}

const mapStateToProps = state => ({onlineUsers: state.onlineUsers, user: state.user});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(TextChat);
