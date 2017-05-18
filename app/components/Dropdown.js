import React, {Component} from 'react';
import PropTypes from 'prop-types';


class Dropdown extends Component {
    constructor(props){
        super(props);
        this._makeOptions = this._makeOptions.bind(this);
    }

    _makeOptions(options){
      return options.map((option, idx) => {
        return <option key={`${option}-key`} value={option}>{option}</option>
      })
    }

    render(){
       return (
           <section>
               <div className={this.props.addClasses} >
                   <select className='form-control'
                           defaultValue={this.props.defaultValue || ''}
                           name={this.props.name || 'ddl'}
                           required={this.props.required || false}
                           onChange={this.props.onChange}>
                        <option value='' disabled >Select</option>
                       {this._makeOptions(this.props.options)}
                   </select>
                   <label className='label'>
                       {this.props.labelName}
                   </label>
               </div>
           </section>

       )
    }
}

Dropdown.propTypes = {
  onChange: PropTypes.func,
  defaultValue: PropTypes.string,
  labelName: PropTypes.string.isRequired,
  name: PropTypes.string,
  required: PropTypes.bool,
  addClasses: PropTypes.string,
  options: PropTypes.array.isRequired
};

Dropdown.defaultProps = {
  addClasses: ''
};

export default Dropdown;
