// @flow
import React, {Fragment} from 'react';
import rest from './rest';
import {connect} from 'react-redux';
import {compose, lifecycle, withState} from 'recompose';
import columns from './columns';
import Table from '../generic/Table';
import Button from '../generic/Button';
import actions from '../generic/Modal/actions';
import { push } from 'react-router-redux';

type Bids = {
  id: string,
  carTitle: string,
  amount: number,
  created: string,
}

// TODO: Make global settings for per page limit
const
  limit = 3;

const
  Merchants = (props: {
    editMerchant: string,
    closeModal: (string)=>{},
    openModal: (string)=>{},
    bids: Array<Bids>,
    setEditMerchant: (string)=>{},
    sync: ()=>{},
  }) => <Fragment>
    <Button name="Back to List" action={() => props.push('/')} />

    <Table
      data={props.bids}
      columns={columns}
      module="records"
    />
  </Fragment>;

export default compose(
  connect(
    state => ({
      bids: state.rest.bids.data,
    }),

    dispatch => ({
      closeModal: uniqueId => dispatch(actions.closeModal(uniqueId)),
      openModal : uniqueId => dispatch(actions.openModal(uniqueId)),
      push      : url => dispatch(push(url)),

      // TODO: after changing sync from redux-api to custom, make header reader
      // to determine pagination count
      sync: (data, cb) => dispatch(rest.actions.bids.sync({id:1, limit: data.limit, start: data.start})),
    })
  ),

  withState('editMerchant', 'setEditMerchant', ''),

  lifecycle({
    componentDidMount() {
      this.props.sync(
        {limit, start: 1},

        (err, data) => {
          if (err) console.log(err);
        },
      );
    },
  }),
)(Merchants)
