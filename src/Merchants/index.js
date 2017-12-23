// @flow
import React, {Fragment} from 'react';
import rest from './rest';
import {connect} from 'react-redux';
import {compose, lifecycle, withState} from 'recompose';
import columns from './columns';
import Table from '../generic/Table';
import Paginator from '../generic/Paginator';
import Modal from '../generic/Modal'

type Bid = {
  id: string,
  carTitle: string,
  amount: number,
  created: string,
}

type Merchant = {
  id: string,
  firstname: string,
  lastname: string,
  avatarUrl: string,
  email: string,
  phone: string,
  hasPremium: boolean,
  bids: Array<Bid>,
}

// TODO: Make global settings for per page limit
const
  limit = 3;

const
  Merchants = (props: {
    setShowEditModal: (boolean)=>{},
    showEditModal: boolean,
    merchants: Array<Merchant>,
    sync: ()=>{},
  }) => <Fragment>
    <Table
      data={props.merchants}
      columns={columns}
      module="records"

      actionsColumns={[
        {type: 'edit', title: 'Edit', name: 'mode edit', isServiceField: true, action: () => () => props.setShowEditModal(true)}, 
        {type: 'remove', title: 'Delete', name: 'delete', isServiceField: true, action: () => {}},
      ]}
    />

    <Paginator pagesCount={4} limit={limit} sync={props.sync}/>

    <Modal
      show={props.showEditModal}
      closeModal={()=>props.setShowEditModal(false)}
    />
  </Fragment>;

export default compose(
  connect(
    state => ({
      merchants: state.rest.merchants.data,
    }),

    dispatch => ({
      // TODO: after changing sync from redux-api to custom, make header reader
      // to determine pagination count
      sync: (data, cb) => dispatch(rest.actions.merchants.sync({limit: data.limit, start: data.start})),
    })
  ),

  withState('showEditModal', 'setShowEditModal', false),

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
