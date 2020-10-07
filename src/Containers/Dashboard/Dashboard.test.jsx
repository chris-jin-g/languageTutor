import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import Dashboard from './Dashboard';

describe('Dashboard TESTS ...', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Dashboard />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Renders a Header', () => {
    const wrapper = shallow(<Dashboard />);
    expect(wrapper.find('header')).toHaveLength(1);
    expect(wrapper.find('h1').props().children).toBe('Welcome');
  });

  it('Renders a Paragraph with words', () => {
    const wrapper = shallow(<Dashboard />);
    expect(wrapper.find('p').props().children).toBe('Hello group!');
  });

  it('Renders a h4', () => {
    const wrapper = shallow(<Dashboard />);
    expect(wrapper.find('h4').props().children).toBe('Welcome Staging Branch!');
  });
});
