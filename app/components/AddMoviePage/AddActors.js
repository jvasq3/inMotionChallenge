'use strict'

import React, { Component } from 'react';
import Input from 'components/Input';
import Button from 'components/Button';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

class AddActors extends Component {

  constructor() {
    super();
    this._removeActor = this._removeActor.bind(this);
    this._setActor = this._setActor.bind(this);
    this.state = {
      actors: [],
      actor: ''
    }
  }

  componentWillMount() {
  }

  _removeActor(idx){

    let actors = this.state.actors;
    actors.splice(idx , 1);
    this.props.setActors('actors', actors)

  }

  _addActor(){
    let actors = this.state.actors;
    if(actors.indexOf(this.state.actor) > -1)
      return;
    else{
      console.log()
        actors.push(this.state.actor);
    }

    this.props.setActors('actors', actors);
  }

  _setActor(e){
    this.setState({actor: e.target.value });
  }

  render() {
    return (
      <div className={this.props.addClasses}>
        <div style={{"margin-bottom": '25px'}} className='row'>

          <Input addClasses='col-xs-4' defaultValue='' labelName='Add Actors' onChange={this._setActor}/>
          <Button name='Add +' onClick={this._addActor.bind(this)} />

        </div>

        <div className='row' id='addedActors'>
          {
            this.props.actors.map((actor, idx) => {
              return (
                <div key={idx} className='actor' onClick={() => {this._removeActor(idx)}}>
                  {actor}
                  <i className='fa fa-2x fa-times-circle'></i>
                </div>
              )
            })
          }
        </div>
      </div>

    );
  }
}

AddActors.propTypes = {
  addClasses: PropTypes.string,
  setActors: PropTypes.func.isRequired,
  actors: PropTypes.array.isRequired

};

AddActors.defaultProps = {
  addClasses: '',
  actors: []
};

export default AddActors;
