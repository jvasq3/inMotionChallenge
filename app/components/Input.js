'use strict';

import React, { Component }  from 'react';
import PropTypes from 'prop-types';

class Input extends Component {

  constructor(props) {
    super(props);
  }

  render () {
    const className = this.props.addClasses;

    return (
      <div className={ className }>
        <input
          type={this.props.type || "text"}
          className="form-control"
          name={this.props.name || ''}
          defaultValue={this.props.defaultValue || ''}
          id={this.props.id || ''}
          autoFocus={this.props.autofocus || false}
          maxLength={this.props.maxLength}
          required={this.props.required}
          onBlur={this.props.onBlur}
          onChange={this.props.onChange}/>
          <label className="label">{this.props.labelName}</label>
        </div>
      );
    }
}

Input.propTypes = {
  addClasses: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  maxLength: PropTypes.string,
  defaultValue: PropTypes.string.isRequired,
  required: PropTypes.bool,
  labelName: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  autofocus: PropTypes.bool
};

Input.defaultProps = {
  addClasses: '',
};

export default Input;
