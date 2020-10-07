import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import VideoChat from '../../Containers/VideoChat2/VideoChat';
import './Dashboard.css';

import Spinner from '../../Components/Spinner/Spinner'

import helpMentor from '../../Assets/Images/mentor-1.jpg'
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showVideoChat: false,
      showOverview: true,
      showCourses: false,
      showFlashcards: false,
      selectedItem: ''
    };
  }
  componentDidMount() {
    // console.log('DASHBOARD MOUNTED ===> (this.props, this.state)', this.props,
    // this.state,);

  }
  componentDidUpdate() {
    //console.log('DASHBOARD UPDATED ===> (this.props)', this.props);
  }

  handleShowVideoChat = () => {
    this.setState({
      showVideoChat: !this.state.showVideoChat,
      selectedItem: ''
    });
  };

  render() {
    const flashcards = [
      {
        word: 'moon'
      }, {
        word: 'money'
      }, {
        word: 'help'
      }, {
        word: 'computer'
      }, {
        word: 'change'
      }, {
        word: 'food'
      }
    ];
    const courses = [
      {
        title: 'course 1',
        video: 'Basics of Igbo'
      }, {
        title: 'course 2',
        video: 'Learn Emotions'
      }, {
        title: 'course 4',
        video: 'Punctuation'
      }, {
        title: 'course 5',
        video: 'ABCs'
      }, {
        title: 'course 6',
        video: 'Food'
      }, {
        title: 'course 7',
        video: 'Animals'
      }, {
        title: 'course 8',
        video: 'Sports'
      }, {
        title: 'course 9',
        video: 'Food'
      }, {
        title: 'course 10',
        video: 'Animals'
      }
    ];
    const overview = [
      {
        stat: '70% Completed Video Courses'
      }, {
        stat: 'Favorite word: "moon"'
      }, {
        stat: 'Favorite Teacher: Adrian'
      }
    ];
    return (this.props.user !== null
      ? <div>

          <div className="completeContainer">
            <div className="sidebarContainer">

              <div className="tabButtonContainer">
                <button
                  className={this.state.showOverview
                  ? 'selectedButton'
                  : 'notSelectedButton'}
                  onClick={() => this.setState({showOverview: true, showCourses: false, showFlashcards: false, showVideoChat: false})}>
                  Overview
                </button>
                <button
                  className={this.state.showCourses
                  ? 'selectedButton'
                  : 'notSelectedButton'}
                  onClick={() => this.setState({showOverview: false, showCourses: true, showFlashcards: false, showVideoChat: false})}>
                  Courses
                </button>
                <button
                  className={this.state.showFlashcards
                  ? 'selectedButton'
                  : 'notSelectedButton'}
                  onClick={() => this.setState({showOverview: false, showCourses: false, showFlashcards: true, showVideoChat: false})}>
                  Flashcards
                </button>
              </div>

              <div className="tabListContainer">
                {this.state.showFlashcards
                  ? (
                    <ol>
                      {flashcards.map((item, index) => (
                        <li
                          key={index}
                          onClick={() => this.setState({selectedItem: item, showVideoChat: false})}>
                          <strong className="strong">{index + 1}.</strong>
                          {item.word}
                        </li>
                      ))}
                    </ol>
                  )
                  : (undefined)}

                {this.state.showCourses
                  ? (
                    <ol>
                      {courses.map((item, index) => (
                        <li
                          key={index}
                          onClick={() => this.setState({selectedItem: item, showVideoChat: false})}>
                          <strong className="strong">{index + 1}.</strong>
                          {item.title}
                        </li>
                      ))}
                    </ol>
                  )
                  : (undefined)}

                {this.state.showOverview
                  ? (
                    <ol>
                      {overview.map((item, index) => (
                        <li
                          key={index}
                          onClick={() => this.setState({selectedItem: item, showVideoChat: false})}>
                          <strong className="strong">{index + 1}.</strong>
                          {item.stat}
                        </li>
                      ))}
                    </ol>
                  )
                  : (undefined)}

              </div>
              <div className='needHelpContainer'>
                <img src={helpMentor} alt="online mentor"/>
                <div>
                  <h2>NEED HELP?</h2>
                  <button onClick={this.handleShowVideoChat}>
                    LILLY CAN HELP YOU!
                  </button>
                </div>
              </div>
            </div>
            <div className="selectedContent">

              {this.state.selectedItem !== ''
                ? Object
                  .entries(this.state.selectedItem)
                  .map(([key, value]) => <p>`${key}
                    - ${value}`</p>,)
                : <p>{'Click on the user dashboard to get started!'}</p>}
              {/* // overview.map((ele, index) => Object.entries(ele).map(([key, value]) => (
              //   <p key={index}>
              //     `${key}
              //     - ${value}`
              //   </p>
              // ))
              // ) */}

              {this.state.showVideoChat
                ? <VideoChat/>
                : undefined}
            </div>
          </div>
        </div>
      : <Spinner/>);
  }
}
const mapStateToProps = state => ({user: state.user});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
