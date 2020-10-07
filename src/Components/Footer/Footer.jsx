import React from 'react';
import { NavLink } from 'react-router-dom';
import './Footer.css';

const Footer = () => (
  <footer>
    <div className="foot-top">
      <h1>LANGUAGETUTOR</h1>

      <div className="foot-courses">
        <h2>Our Courses</h2>
        <ul>
          <li>Introduction</li>
          <li>Greetings</li>
          <li>Goodbyes</li>
          <li>Common Questions</li>
          <li>Advance Topics</li>
        </ul>
      </div>

      <div className="foot-info">
        <h2>Info</h2>

        <ul>
          <li><NavLink to="/signup" exact>Find A Mentor</NavLink></li>
          <li><NavLink to="/About">Our Courses</NavLink></li>
          <li><NavLink to="/About">How it works</NavLink></li>
          <li><NavLink to="/About">About</NavLink></li>
          <li><NavLink to="/Contact">Contact</NavLink></li>
        </ul>
      </div>
    </div>

    <div className="foot-bottom">
      <ul className="foot-social">
        <li>Twitter</li>
        <li>Facebook</li>
        <li>Instagram</li>
      </ul>

      <p className="copyright">Copyright &copy; {new Date().getFullYear()} Language Tutor</p>

      <ul className="legal-stuff">
        <li><NavLink to="/TermAndConditions">Terms & Conditions</NavLink></li>
        <li><NavLink to="/PrivacyPolicy">Privacy Policy</NavLink></li>
        <li><NavLink to="/Support">Support</NavLink></li>
      </ul>
    </div>
  </footer>
);

export default Footer;
