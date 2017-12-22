import React from 'react';
import rest from './rest';
import {connect} from 'react-redux';
import {compose, lifecycle} from 'recompose';
import columns from './columns';
import Table from '../generic/Table';

const
  Merchants = props => <Table
      data={props.merchants}
      columns={columns}
      module="records"

      actionsColumns={[
          {type: 'edit', title: 'Edit', name: 'mode edit', isServiceField: true, action: () => {}}, 
          {type: 'remove', title: 'Delete', name: 'delete', isServiceField: true, action: () => {}},
      ]}
  />;

export default compose(
  connect(
    state => ({
      merchants: state.rest.merchants.data,
    }),

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
