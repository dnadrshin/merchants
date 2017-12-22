import React from 'react';
import rest from './rest';
import {connect} from 'react-redux';
import {compose, lifecycle} from 'recompose';

const
  Merchants = props => <div>
    Merchants
  </div>;

export default compose(
  connect(
    null,
    dispatch => ({
      sync: (data, cb) => dispatch(rest.actions.merchants.sync()),
    })
  ),

  lifecycle({
    componentDidMount() {
      this.props.sync(
        null,

        (err, data) => {
          if (err) console.log(err);
        },
      );
    },
  }),
)(Merchants)
