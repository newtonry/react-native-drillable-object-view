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
  keyText: {
    color: Colors.ALMOST_BLACK,
  },
  valueText: {
    color: Colors.ALMOST_BLACK,
  },
  nullAnUndefined: {
    color: colors.DARK_GREY,
  },
  string: {
    color: colors.RED,
  },
  numberAndBoolean: {
    color: Colors.BLUE,
  },
});

export default class DrillableObjectText extends PureComponent {
  static propTypes = {
    autoExpand: PropTypes.bool,
    keyName: PropTypes.any,
    marginLeft: PropTypes.number,
    value: PropTypes.any,
  };

  static defaultProps = {
    autoExpand: false,
    keyName: 'parent',
    marginLeft: Metrics.baseMargin,
  };

  constructor(props) {
    super(props);
    const { autoExpand } = props;
    this.state = { isOpen: autoExpand };
  }

  toggleOpen = () => { this.setState({ isOpen: !this.state.isOpen }); };

  renderValueText = (value) => {
    if (value === null) {
      return <Text style={styles.nullAnUndefined}>{String(value)}</Text>;
    }
    switch (typeof (value)) {
      case 'string':
        return <Text style={styles.string}>&quot;{value}&quot;</Text>;
      case 'boolean':
        return <Text style={styles.numberAndBoolean}>{String(value)}</Text>;
      case 'number':
        return <Text style={styles.numberAndBoolean}>{value}</Text>;
      case 'undefined':
        return <Text style={styles.nullAnUndefined}>{String(value)}</Text>;
      default:
        return <Text style={styles.valueText}>{String(value)}</Text>;
    }
  };

  renderEmptyObjectRow = () => {
    const { keyName, value, marginLeft } = this.props;
    const emptyObjectText = _.isArray(value) ? '[]' : '{}';
    return (
      <Text style={{ marginLeft }}>
        <Text style={styles.keyText}>{keyName}:</Text>
        <Text style={styles.valueText}> {emptyObjectText}</Text>
      </Text>
    );
  };

  renderClosedObjectRow = () => {
    const { keyName, marginLeft } = this.props;
    return (
      <TouchableOpacity style={{ marginLeft }} onPress={this.toggleOpen}>
        <Text style={styles.keyText}>{keyName}: +</Text>
      </TouchableOpacity>
    );
  };

  renderObjectRow = () => {
    const { isOpen } = this.state;
    const { keyName, value, marginLeft } = this.props;

    // if the value is an object, but is empty, we should just output it
    if (_.isObject(value) && _.isEmpty(value)) return this.renderEmptyObjectRow();

    if (!isOpen) this.renderClosedObjectRow();

    const subComponents = _.map(value, (subValue, subkeyName) => (
      <DrillableObjectText
        {...this.props}
        keyName={subkeyName}
        value={subValue}
        key={`${keyName}:${subkeyName}`}
      />
    ));

    return (
      <TouchableOpacity style={{ marginLeft }} onPress={this.toggleOpen}>
        <Text style={styles.keyText}>{keyName}: -</Text>
        {subComponents}
      </TouchableOpacity>
    );
  };

  render() {
    const { keyName, value, marginLeft } = this.props;
    if (_.isObject(value)) return this.renderObjectRow();

    return (
      <Text style={{ marginLeft }}>
        <Text style={styles.keyText}>{keyName}:</Text>
        <Text style={styles.valueText}> {this.renderValueText(value)}</Text>
      </Text>
    );
  }
}
