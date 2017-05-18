'use strict'

import React, { Component } from 'react';
import Input from 'components/Input';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

class Button extends Component {

  constructor() {
    super();
  }

  componentWillMount() {
  }

  render() {

    return (
      <div className={this.props.addClasses}>
        <div className="tab" onClick={this.props.onClick}>
          {this.props.name}
        </div>
      </div>
    );
  }
}

Button.propTypes = {
  addClasses: PropTypes.string,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

Button.defaultProps = {
  addClasses: '',
  name: ''
};

export default Button;
