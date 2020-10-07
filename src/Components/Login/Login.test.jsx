import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import Login from './Login';

describe('Login TESTS ...', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Login />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Renders a Header', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.find('header')).toHaveLength(1);
    expect(wrapper.find('h1').props().children).toBe('Welcome');
  });

  it('Renders a Paragraph with words', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.find('p').props().children).toBe('Hello group!');
  });

  it('Renders a h4', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.find('h4').props().children).toBe('Welcome Staging Branch!');
  });
});
