// __tests__/Login-page-test.js
import 'react-native';
import React from 'react';
import MyMenu from './MyMenu';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <MyMenu/>
    ).toJSON();
  expect(tree).toMatchSnapshot();
});