// @flow
import React from 'react';
import {connect} from 'react-redux';
import {lifecycle, compose} from 'recompose';
import actions from './actions';

const
  Form = (props: {
    children?: React$Element<*>
  }) => <form>
    {props.children}
  </form>;

export default compose(
  connect(
    null,

    ({
      createForm: actions.createForm,
      resetForm : actions.resetForm,
    }),
  ),

  lifecycle({
    componentDidMount() {
      this.props.createForm(this.props.model, this.props.data);
    },

    componentWillUnmount() {
      this.props.resetForm(this.props.model);
    },
  }),
)(Form);
