'use strict';

import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import __ from 'lodash';

class Table extends Component {

  constructor(props) {
    super(props);
    this.buildTable.bind(this);
    this._defaultRowClick.bind(this);
  }

  buildTable(data, opts) {
    //const table = document.createElement('table');
    const tableClasses = opts.addClasses;
    let headerRow = null;
    if( opts.hasHeaders) {
      const headers = data.shift().map( (header, index) => {
        return (
          <th key={index}>
            {header}
          </th>
        );
      });
      headerRow = <thead><tr key="header">{headers}</tr></thead>
    }

    const rows = data.map( (row, index) => {
      const rowData = row.map( (column, innerIndex) => {
        return <td key={innerIndex}>{column}</td>
      })
      return <tr onClick={opts.rowClick.bind(this, row)} key={index}>{rowData}</tr>
    });

    return (
      <table className={tableClasses}>
        {headerRow}
        <tbody>
        {rows}
        </tbody>
      </table>
    )

  }

  _defaultRowClick(row, e) {
    e.preventDefault();
    console.log('default click', e);
  }

  render () {

const header = (
        <tr>
        {this.props.headers.map(header => {
          return <th>{header}</th>
        })}
      </tr>
);

  return (
    <table className={this.props.addClasses}>
              <thead>{header}</thead>
              <tbody>
                {this.props.tableData.map((data, idx) => <tr key={idx} onClick={() => {this.props.rowClick(data)}}>
                    <td>{data.rating}</td>
                    <td>{data.year}</td>
                    <td>{data.title}</td>
                    <td>{data.genre}</td>
                </tr>)}
              </tbody>
            </table>
  )
  }

}

Table.propTypes = {
  tableData: PropTypes.array.isRequired,
  header: PropTypes.array.isRequired,
  addClasses: PropTypes.string,
  rowClick: PropTypes.function
};

Table.defaultProps = {
  addClasses: ''
};

export default Table;
