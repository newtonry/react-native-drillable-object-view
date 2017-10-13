import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import DrillableObjectView from '../src/index';


it('renders correctly with no props', () => {
  const drillableObjectView = renderer.create(<DrillableObjectView />).toJSON();

  expect(drillableObjectView).toMatchSnapshot();
});

it('renders correctly with a left margin as a prop', () => {
  const drillableObjectView = renderer.create(<DrillableObjectView keyName="aKeyName" marginLeft={10} />).toJSON();

  expect(drillableObjectView).toMatchSnapshot();
});

it('renders correctly with a autoExpandDepth as a prop', () => {
  const drillableObjectView = renderer.create(<DrillableObjectView keyName="aKeyName" autoExpandDepth={5} />).toJSON();

  expect(drillableObjectView).toMatchSnapshot();
});

it('renders correctly with an array value', () => {
  const drillableObjectView = renderer.create(<DrillableObjectView keyName="arrayKey" value={[1, 2, 3]} />).toJSON();

  expect(drillableObjectView).toMatchSnapshot();
});

it('renders correctly with a boolean value', () => {
  const drillableObjectView = renderer.create(<DrillableObjectView keyName="booleanKey" value />).toJSON();

  expect(drillableObjectView).toMatchSnapshot();

  const falseDrillableObjectView = renderer.create(<DrillableObjectView keyName="booleanKey" value={false} />).toJSON();

  expect(falseDrillableObjectView).toMatchSnapshot();
});

it('renders correctly with a null value', () => {
  const drillableObjectView = renderer.create(<DrillableObjectView keyName="nullKey" value={null} />).toJSON();

  expect(drillableObjectView).toMatchSnapshot();
});

it('renders correctly with a boolean value', () => {
  const drillableObjectView = renderer.create(<DrillableObjectView keyName="objectKey" value={{ subObjectKey: {} }} />).toJSON();

  expect(drillableObjectView).toMatchSnapshot();
});

it('renders correctly with a boolean value', () => {
  const drillableObjectView = renderer.create(<DrillableObjectView keyName="stringKey" value="stringValue" />).toJSON();

  expect(drillableObjectView).toMatchSnapshot();
});
