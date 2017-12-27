// @flow
import _ from 'lodash';
import React, {Fragment} from 'react';
import rest from './rest';
import {connect} from 'react-redux';
import {compose, lifecycle, withState} from 'recompose';
import columns from './columns';
import Table from '../generic/Table';
import Paginator from '../generic/Paginator';
import EditModal from '../generic/EditModal'
import actions from '../generic/Modal/actions';

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
    editMerchant: string,
    closeModal: (string)=>{},
    openModal: (string)=>{},
    merchants: Array<Merchant>,
    setEditMerchant: (string)=>{},
    sync: ()=>{},
  }) => <Fragment>
    <Table
      data={props.merchants}
      columns={columns}
      module="records"

      actionsColumns={[
        {
          type          : 'edit',
          title         : 'Edit',
          name          : 'mode edit',
          isServiceField: true,
          action        : id => () => {props.setEditMerchant(id); props.openModal('edit-modal-merchant')}
        },
 
        {type: 'remove', title: 'Delete', name: 'delete', isServiceField: true, action: () => {}},
      ]}
    />

    <Paginator pagesCount={4} limit={limit} sync={props.sync}/>

    <EditModal
      uniqueId="edit-modal-merchant"
      data={_.find(props.merchants, {id: props.editMerchant})}
    />
  </Fragment>;

export default compose(
  connect(
    state => ({
      merchants: state.rest.merchants.data,
    }),

    dispatch => ({
      closeModal: uniqueId => dispatch(actions.closeModal(uniqueId)),
      openModal : uniqueId => dispatch(actions.openModal(uniqueId)),

      // TODO: after changing sync from redux-api to custom, make header reader
      // to determine pagination count
      sync: (data, cb) => dispatch(rest.actions.merchants.sync({limit: data.limit, start: data.start})),
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
