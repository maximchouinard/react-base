import React from 'react';
import { shallow } from 'enzyme';
import { NavItem } from 'react-bootstrap';
import Navigation from 'components/navigation';

describe('Navigation', () => {
  describe('callbacks', () => {
    const signup = jest.fn();
    const signin = jest.fn();
    const navigationComponent = shallow(
      <Navigation
        signup={ signup }
        signin={ signin }
      />
    );

    it('call signup', () => {
      navigationComponent.find(NavItem).at(0).simulate('click');
      expect(signup).toHaveBeenCalled();
    });

    it('call signin', () => {
      navigationComponent.find(NavItem).at(1).simulate('click');
      expect(signin).toHaveBeenCalled();
    });
  });

  describe('when session is created', () => {
    let navigationComponent;
    const logout = jest.fn();
    const signin = jest.fn();
    const signup = jest.fn();
    const data = {
      logout,
      signin,
      signup,
      loggedIn: true,
      currentUser: {
        id: 1,
        name: 'user',
        email: 'user@example.com'
      }
    };

    it('renders user email', () => {
      expect(navigationComponent.find(NavItem).at(0).props().children).toEqual(data.currentUser.email);
    });

    it('call signout callback', () => {
      navigationComponent.find(NavItem).at(1).simulate('click');
      expect(logout).toHaveBeenCalled();
    });
  });
});
