import React from 'react';
import {
  OTSession,
  OTPublisher,
  OTStreams,
  OTSubscriber,
  createSession,
  ConnectionStatus
} from 'opentok-react';
import firebase from 'firebase';
import {connect} from 'react-redux';
import axios from 'axios';

import {setOnlineUsersToStore} from '../../Actions/OnlineUsersActions'

import Spinner from '../../Components/Spinner/Spinner';

import './VideoChat.css';
// import {getAllActiveTeachers} from '../../Actions/VideoActions'

class VideoChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      streams: [],
      requestingTeacher: '',
      allUsers: [],
      onlineUsers: [],
      sessionId: '',
      token: '',
      audio: true,
      video: false,
      connected: true,
      videoChatPendingRequest: false,
      allowPendingVideoRequest: false
    };
  }

  componentWillMount() {}

  componentDidMount() {
    // Listening when an online user account changes at all This is begining of
    // recursion, we are listening because we know later, at some point we will be
    // pushing requesting user informtion into our account at the DB. And when we
    // get that requesing using information we want to initiate the video chat by
    // setting the state with the token and sessonid. So even though this is the
    // first thing in this file, its the last piece to fire off the video chat.
    this.state.requestingTeacher !== ''
      ? firebase
        .database()
        .ref('onlineUsers')
        .on('child_changed', (snapshot) => {
          const updatedUser = snapshot.val();
          console.log('DB UPDATED!', updatedUser);
          // If our account updates we know someone pushed new token and session data onto
          // our DB object (down below we did this)
          if (updatedUser.uid === this.props.user.account.uid) {
            firebase.database()
            // We need the requesting user info to be able to point back to them completing
            // our recursion circle.
              .ref(`users/${updatedUser.chatRoomKeys.requestingUser}`)
              .once('value')
              .then((snapShot2) => {
                const requestingUserProfile = snapShot2.val();
                console.log(requestingUserProfile);
                this.setState({sessionId: updatedUser.chatRoomKeys.sessionId, token: updatedUser.chatRoomKeys.token, requestingTeacher: requestingUserProfile.account, videoChatPendingRequest: true});
              });
          }
        })
      : undefined
    // Listening for when a new online user joins so we can update the 'online user
    // list' for real time data
    firebase
      .database()
      .ref('onlineUsers')
      .on('child_added', (snapshot) => {
        const childAdded = snapshot.val();
        console.log('DB child ADDED!', childAdded);
        childAdded.uid !== this.props.user.account.uid
          ? this.setState({
            onlineUsers: [
              ...this.state.onlineUsers,
              childAdded
            ]
          }, () => {
            this
              .props
              .setOnlineUsersToStore(this.state.onlineUsers)
          })
          : undefined;
      })
    // Listening for online user leaving so we can update the 'online user list' for
    // real time data
    firebase
      .database()
      .ref('onlineUsers')
      .on('child_removed', (snapshot) => {
        const childRemoved = snapshot.val();
        console.log('DB child REMOVED!', childRemoved);
        this.setState({
          onlineUsers: this
            .state
            .onlineUsers
            .filter(ele => ele.uid !== childRemoved.uid,)
        }, () => {
          this
            .props
            .setOnlineUsersToStore(this.state.onlineUsers)

        });
      })

    // if user closes tab remove from online users so we can update the 'online user
    // list' for real time data
    window.addEventListener('beforeunload', () => {
      firebase
        .database()
        .ref(`onlineUsers/${this.props.user.account.uid}`)
        .remove();
      firebase
        .database()
        .ref(`users/${this.props.user.account.uid}`)
        .onDisconnect(),
      () => {
        firebase
          .database()
          .ref(`onlineUsers/${this.props.user.account.uid}`)
          .remove();
      };
    });
  }
  componentDidUpdate() {
    console.log(this.state);
  }
  // componentWillUnmount() {   // remove token info to disconnect THIS IS HACKY
  // AND I DONT THINK A GOOD WAY   this.setState({ token: '', sessionId: '' }); //
  // this.sessionHelper.disconnect();   firebase     .database()
  // .ref(`onlineUsers/${this.props.user.account.uid}`)     .remove();   firebase
  // .database()     .ref(`users/${this.props.user.account.uid}`)
  // .onDisconnect(),   () => {     alert('USER DISCONNECTED!');   }; }

  handleTeacherHelpRequest = (ele) => {
    // when a user clicks an online teacher to connect with...
    this.setState({requestingTeacher: ele, loading: true});

    // Grab the userIDToken from firebase WHICH IS DIFFERENT FROM THE UID. This
    // userIdToken is how firebase can auto log you in. We need this token to send
    // off to the backend, to validate the request on our express server. We don't
    // want anyone in the world pinging our backend and racking up data. So if this
    // token is invalid it will return a not authorized from our backend.
    firebase
      .auth()
      .currentUser
      .getIdToken()
      .then((userIdToken) => {
        // https : //us-central1-language-tutor-a1bdd.cloudfunctions.net/api/api
        // "http://localhost:3001/api/getTokens"
        axios.get('https://us-central1-language-tutor-a1bdd.cloudfunctions.net/api/api/getTokens', {
          headers: {
            Authorization: `Bearer ${userIdToken}`
          }
        },).then((data) => {
          // console.log("GOT DATA FROM OUR BACKEND", data, data.data.id,
          // data.data.token); Set our chatroom token and keys to OUR OWN DATABASE OBJECT
          // MODEL
          firebase
            .database()
            .ref(`users/${this.props.user.account.uid}/chatRoomKeys`)
            .set({apiKey: `${process.env.REACT_APP_API_KEY}`, sessionId: data.data.id, token: data.data.token, requestingUser: this.state.requestingTeacher})
            // Set the chatroom token and keys to THE REQUESTING USER (we just clicked them
            // from the list)
            .then(() => {
              firebase
                .database()
                .ref(`onlineUsers/${this.state.requestingTeacher.uid}/chatRoomKeys`,)
                .set({apiKey: `${process.env.REACT_APP_API_KEY}`, sessionId: data.data.id, token: data.data.token, requestingUser: this.props.user.account.uid})
                // Then store the token and session in state for good measure!
                .then(() => {
                  this.setState({sessionId: data.data.id, token: data.data.token, loading: false});
                });
            });
        });
      });
  };

  // This is where the recursion hits heavy
  handlePendingTeacherVideoRequest = () => {
    this.setState({
      allowPendingVideoRequest: true
    }, () => this.handleTeacherHelpRequest(this.state.requestingTeacher),);
  };

  render() {
    return (this.props.user !== null
      ? <div>
          <div>
            {this.state.onlineUsers.length > 0
              ? (
                <div className="onlineTeachersContainer">
                  <h2>Teachers online now!</h2>
                  {this
                    .state
                    .onlineUsers
                    .map((ele, index) => (
                      <button
                        className="btn"
                        key={index}
                        onClick={() => this.handleTeacherHelpRequest(ele)}>
                        {ele.username}-{ele.nativeLanguage}
                      </button>
                    ))}
                </div>
              )
              : (
                <h2>No Active Teachers</h2>
              )}
            {this.state.videoChatPendingRequest
              ? (
                <div>
                  <p>{this.state.requestingTeacher.name}
                    wants to chat!</p>
                  <button onClick={this.handlePendingTeacherVideoRequest}>
                    Accept
                  </button>
                </div>
              )
              : (undefined)}
            {this.state.loading
              ? <Spinner/>
              : undefined}
            {/* {this.state.requestingTeacher !== '' &&
          this.state.token !== '' &&
          this.state.allowPendingVideoRequest ? (
            <h2>Chatting with {this.state.requestingTeacher.name}</h2>
          ) : (
            undefined
          )} */}
          </div>
          <div>
            {this.state.token !== '' && this.state.allowPendingVideoRequest
              ? (
                <div className="videoContainer">
                  <OTSession
                    apiKey={`${process.env.REACT_APP_API_KEY}`}
                    sessionId={this.state.sessionId}
                    token={this.state.token}
                    onError={this.onSessionError}
                    eventHandlers={this.sessionEventHandlers}>
                    <button
                      onClick={() => {
                      this.setState({
                        video: !this.state.video
                      });
                    }}>
                      {this.state.video
                        ? 'DISABLE '
                        : 'ENABLE '}
                      VIDEO
                    </button>
                    <button
                      onClick={() => {
                      this.setState({token: '', sessionId: ''});
                    }}>
                      DISCONNECT
                    </button>
                    <OTPublisher
                      properties={{
                      publishAudio: this.state.audio,
                      publishVideo: this.state.video,
                      width: 250,
                      height: 250
                    }}
                      onPublish={this.state.video}
                      onError={this.onPublishError}
                      eventHandlers={this.publisherEventHandlers}/>

                    <OTStreams>
                      <OTSubscriber
                        properties={{
                        width: 720,
                        height: 720
                      }}
                        onSubscribe={this.onSubscribe}
                        onError={this.onSubscribeError}
                        eventHandlers={this.subscriberEventHandlers}/>
                    </OTStreams>
                  </OTSession>
                </div>
              )
              : (undefined)}
          </div>
        </div>
      : <Spinner/>);
  }
}

const mapStateToProps = state => ({user: state.user});

const mapDispatchToProps = dispatch => ({
  setOnlineUsersToStore: (list) => dispatch(setOnlineUsersToStore(list))
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoChat);
