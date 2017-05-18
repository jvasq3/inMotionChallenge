'use strict'

import React, { Component } from 'react';
import Input from 'components/Input';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

class Header extends Component {

  constructor() {
    super();
  }

  componentWillMount() {
  }

  render() {

    return (

        <div className='col-xs-12 Header-container'>
          <Link to={'/'}>
          <div className='tab'>
            Home
          </div>
        </Link>
        <Link to={'/search'}>
        <div className='tab'>
          Search/Delete
        </div>
      </Link>
      <Link to={'/add'}>
      <div className='add-tab'>
        Add +
      </div>
    </Link>
      </div>

    );
  }
}

module.exports = Header;
