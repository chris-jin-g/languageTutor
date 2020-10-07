import React from "react";
import {connect} from "react-redux";
import VideoChat from "../../Containers/VideoChat2/VideoChat";
import TextChat from '../../Components/TextChat/TextChat'

import "./StudentChatContainer.css";

class StudentChatContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="studentChatContainer">
        <VideoChat/>
        <TextChat/>
      </div>
    );
  }
}

const mapStateToProps = state => ({user: state.user});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(StudentChatContainer);
