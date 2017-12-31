// @flow
import _ from 'lodash';
import React from 'react';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import actions from '../actions';

const
  CheckBoxField = (props: {
    changeField: (string, boolean)=>{},
    checked: boolean,
    model: string,
    lable: string
  }) => <div className="checkbox">
    <label>
      <input
        type="checkbox"
        checked={props.checked}
        onChange={e => props.changeField(props.model, Boolean(e.target.checked))}
      /> {props.lable}
    </label>
  </div>;

export default compose(connect(
  (state, props) => ({
    checked: _.get(state.form, props.model, false),
  }),

  ({
    changeField: actions.changeField,
  }),
))(CheckBoxField);
