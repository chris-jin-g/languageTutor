import React from 'react';
import Signup from '../../Components/Signup/Signup';
import Login from '../../Components/Login/Login';
import './LandingPage.css';

import RealVideoPreview from '../../Assets/Images/VideoPreview.png';
import RealCoursePreview from '../../Assets/Images/DashboardPreview.png';
import CoursePreview from '../../Assets/Images/Learn-Preview-Right.png';
import MentorshipsPreview from '../../Assets/Images/Learn-Preview-Left.png';
import Mentor1 from '../../Assets/Images/mentor-1.jpg';
import Mentor2 from '../../Assets/Images/mentor-2.jpg';
import Mentor3 from '../../Assets/Images/mentor-3.jpg';
import Mentor4 from '../../Assets/Images/mentor-4.jpg';
import Mentor5 from '../../Assets/Images/mentor-5.jpg';
import Mentor6 from '../../Assets/Images/mentor-6.jpg';

const mentors = [
  {
    name: 'Gavin',
    desc: 'Mentor description goes here.',
    img: Mentor1,
  },
  {
    name: 'Adrian',
    desc: 'Mentor description goes here.',
    img: Mentor2,
  },
  {
    name: 'Keith',
    desc: 'Mentor description goes here.',
    img: Mentor3,
  },
];

const mentors2 = [
  {
    name: 'Katy',
    desc: 'Mentor description goes here.',
    img: Mentor4,
  },
  {
    name: 'Sam',
    desc: 'Mentor description goes here.',
    img: Mentor5,
  },
  {
    name: 'Noah',
    desc: 'Mentor description goes here.',
    img: Mentor6,
  },
];
export default class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showHomePageSignup: true,
    };
  }

  componentDidUpdate() {}
  handleLoginSignup = () => {
    this.setState({
      showHomePageSignup: !this.state.showHomePageSignup,
    });
  };

  render() {
    return (
      <div>
        <div className="hero">
          <div className="firstSectionContainer">
            <div>
              <h1>Learn Your Native Tongue From A Mentor</h1>
              {/* <NavLink to="Signup"><button>Sign Up Today!</button></NavLink> */}
            </div>
            <div className="signup-modal">
              <Signup
                title="CREATE YOUR ACCOUNT"
                slogan="Sign up today to start learning your native from one of our trained Mentors."
              />
            </div>
          </div>
        </div>

        <div className="info">

          <h3>LEARN THE IGBO LANGUAGE</h3>
          <div className="online">
            <div className="online-courses">
              <h4>Online Courses</h4>
              <ul>
                <li>
                  <i className="icon-video" />video tutorials teaching igbo
                </li>
                <li>
                  <i className="icon-statistics" />track your progress
                </li>
                <li>
                  <i className="icon-rewards" />get achievments for your success
                </li>
              </ul>
            </div>
            <div className="perspective-container">
              <img src={RealCoursePreview} alt="Live Mentorships" />
            </div>
          </div>

          <div className="platform">
            <div className="live-mentorships">
              <h4>Live Mentorships</h4>
              <ul>
                <li>
                  <i className="icon-mentorship" />one-on-one guidance
                </li>
                <li>
                  <i className="icon-online-chat" />get help with assingments
                </li>
                <li>
                  <i className="icon-language" />learn your native tongue
                </li>
              </ul>
            </div>
            <div className="perspective-container">
              <img src={RealVideoPreview} alt="Online Course" />
            </div>
          </div>
          <div className="our-mentors">
            <h2>Meet Our Mentors</h2>
            <div className="mentorContainer1">
              {mentors.map((ele, index) => (
                <div>
                  <img src={ele.img} alt="mentor" />
                  <div className="mentor-info">
                    <h5>{ele.name}</h5>
                    <p>{ele.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mentorContainer2">
              {mentors2.map((ele, index) => (
                <div>
                  <img src={ele.img} alt="mentor" />
                  <div className="mentor-info">
                    <h5>{ele.name}</h5>
                    <p>{ele.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            style={{
              margin: 'auto',
            }}
            className="signup-modal"
          >
            <Signup
              title="BECOME A STUDENT"
              slogan="Sign up today to start learning your native tongue through online courses and guided mentor ship!"
            />
          </div>
        </div>
      </div>
    );
  }
}
