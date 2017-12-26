import React from 'react';
import {connect} from 'react-redux';
import {lifecycle, compose} from 'recompose';
import actions from './actions';

const
  Form = (props: {
    data: {},
    model: string
  }) => <form>
  {props.children}
</form>;

export default compose(
  connect(
    null,

    ({
      createForm: actions.createForm,
    })
  ),

  lifecycle({
    componentDidMount() {
      this.props.createForm(this.props.model, this.props.data);
    }
  })
)(Form);
