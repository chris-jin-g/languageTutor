import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import LandingPage from './LandingPage';

describe('LandingPage TESTS ...', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<LandingPage />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Renders a Header', () => {
    const wrapper = shallow(<LandingPage />);
    expect(wrapper.find('header')).toHaveLength(1);
    expect(wrapper.find('h1').props().children).toBe('Welcome');
  });

  it('Renders a Paragraph with words', () => {
    const wrapper = shallow(<LandingPage />);
    expect(wrapper.find('p').props().children).toBe('Hello group!');
  });

  it('Renders a h4', () => {
    const wrapper = shallow(<LandingPage />);
    expect(wrapper.find('h4').props().children).toBe('Welcome Staging Branch!');
  });
});
