# react-native-drillable-object-view [![Build Status](https://travis-ci.org/newtonry/react-native-drillable-object-view.svg?branch=master)](https://travis-ci.org/newtonry/react-native-drillable-object-view)

[![Greenkeeper badge](https://badges.greenkeeper.io/newtonry/react-native-drillable-object-view.svg)](https://greenkeeper.io/)

This component takes in an array or object and renders a view that you can drill down into, similar to what you can do in a Chrome debugger (see gif below).

![Example gif](https://i.imgur.com/XRoLP27.gif)


## Installation
```npm install react-native-drillable-object-view``` or ```yarn add react-native-drillable-object-view```


## How to use
```js
import DrillableObjectView from 'react-native-drillable-object-view';

...

// example object
const person = {
  name: 'Homer',
  age: 39,
  enjoysBeer: true,
  children: [
    {
      name: 'Bart',
      age: 10,
      enjoysBeer: null,
      children: [],
    },
    {
      name: 'Lisa',
      age: 10,
      enjoysBeer: null,
    },
    {
      name: 'Maggie',
      age: 1.2,
      enjoysBeer: null,
    },
  ],
};

<DrillableObjectView
    autoExpandDepth={1}
    keyName={'parentKey'}
    marginLeft={10}
    value={person}
/>
```

### Props

```autoExpandDepth``` - How many levels of the object you want to be open when it's initially rendered. Default is 0, which means only the parent can be seen at the start.

```keyName``` - The key name that will be displayed. Only the initial keyName is relevant to you. Default is 'parent'.

```marginLeft``` - The margin between nested objects. Adjusting this may make it more or less readable for you. Default is 8.

```value``` - The array or object that you want to be rendered.

## Contributing
This is pretty basic at the moment, but if you have new features, requests, or would like to contribute feel free to open a PR and ping me!
I've created a pre-push hook that runs ```npm test``` and ```npm run lint``` prior to pushing. Please run these.
