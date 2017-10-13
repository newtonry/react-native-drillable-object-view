import _ from 'lodash';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import Colors from './colors';


const styles = StyleSheet.create({
  booleanStyle: {
    color: Colors.BLUE,
  },
  keyStyle: {
    color: Colors.ALMOST_BLACK,
  },
  nullStyle: {
    color: Colors.DARK_GREY,
  },
  numberStyle: {
    color: Colors.BLUE,
  },
  stringStyle: {
    color: Colors.RED,
  },
  undefinedStyle: {
    color: Colors.DARK_GREY,
  },
  valueStyle: {
    color: Colors.ALMOST_BLACK,
  },
});

export default class DrillableObjectView extends PureComponent {
  static propTypes = {
    autoExpandDepth: PropTypes.number,
    keyName: PropTypes.any,
    marginLeft: PropTypes.number,
    value: PropTypes.any,
  };

  static defaultProps = {
    autoExpandDepth: 0,
    keyName: 'parent',
    marginLeft: 8,
  };

  constructor(props) {
    super(props);
    const { autoExpandDepth } = props;
    // If there are still more layers to be auto-expanded, we should default to isOpen
    this.state = { isOpen: autoExpandDepth > 0 };
  }

  toggleOpen = () => { this.setState({ isOpen: !this.state.isOpen }); };

  rendervalueStyle = (value) => {
    if (value === null) {
      return <Text style={styles.nullStyle}>{String(value)}</Text>;
    }
    switch (typeof (value)) {
      case 'string':
        return <Text style={styles.stringStyle}>&quot;{value}&quot;</Text>;
      case 'boolean':
        return <Text style={styles.booleanStyle}>{String(value)}</Text>;
      case 'number':
        return <Text style={styles.numberStyle}>{value}</Text>;
      case 'undefined':
        return <Text style={styles.undefinedStyle}>{String(value)}</Text>;
      default:
        return <Text style={styles.valueStyle}>{String(value)}</Text>;
    }
  };

  renderEmptyObjectRow = () => {
    const { keyName, value, marginLeft } = this.props;
    const emptyObjectText = _.isArray(value) ? '[]' : '{}';
    return (
      <Text style={{ marginLeft }}>
        <Text style={styles.keyStyle}>{keyName}:</Text>
        <Text style={styles.valueStyle}> {emptyObjectText}</Text>
      </Text>
    );
  };

  renderClosedObjectRow = () => {
    const { keyName, marginLeft } = this.props;
    return (
      <TouchableOpacity style={{ marginLeft }} onPress={this.toggleOpen}>
        <Text style={styles.keyStyle}>{keyName}: +</Text>
      </TouchableOpacity>
    );
  };

  renderObjectRow = () => {
    const { isOpen } = this.state;
    const {
      autoExpandDepth, keyName, value, marginLeft,
    } = this.props;

    // if the value is an object, but is empty, we should just output it
    if (_.isObject(value) && _.isEmpty(value)) return this.renderEmptyObjectRow();

    if (!isOpen) return this.renderClosedObjectRow();

    const autoExpandDepthRemaining = autoExpandDepth - 1;

    const subComponents = _.map(value, (subValue, subkeyName) => (
      <DrillableObjectView
        {...this.props}
        autoExpandDepth={autoExpandDepthRemaining}
        keyName={subkeyName}
        value={subValue}
        key={`${keyName}:${subkeyName}`}
      />
    ));

    return (
      <TouchableOpacity style={{ marginLeft }} onPress={this.toggleOpen}>
        <Text style={styles.keyStyle}>{keyName}: -</Text>
        {subComponents}
      </TouchableOpacity>
    );
  };

  render() {
    const { keyName, value, marginLeft } = this.props;

    if (_.isObject(value)) return this.renderObjectRow();

    return (
      <Text style={{ marginLeft }}>
        <Text style={styles.keyStyle}>{keyName}:</Text>
        <Text style={styles.valueStyle}> {this.rendervalueStyle(value)}</Text>
      </Text>
    );
  }
}
