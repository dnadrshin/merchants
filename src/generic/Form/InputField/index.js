// @flow
import _ from 'lodash';
import React from 'react';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import actions from '../actions';

const
  InputField = (props: {
    changeField: ()=>{},
    model: string,
    lable: string,
    name: string,
    value: string,
    placeholder: string,
    type: string,
  }) => <div className="form-group">
    <label htmlFor="exampleInputEmail1">{props.lable}</label>

    <input
      type={props.type}
      className="form-control"
      placeholder={props.placeholder}
      name={props.name}
      value={props.value}
      onChange={e => props.changeField(props.model, e.target.value)}
    />
  </div>;

export default compose(
  connect(
    (state, props) => ({
      value: _.get(state.form, props.model, '')
    }),

    ({
      changeField: actions.changeField,
    })
  ),
)(InputField);