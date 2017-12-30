// @flow
import _ from 'lodash';
import React, {Fragment} from 'react';
import rest from './rest';
import {connect} from 'react-redux';
import {compose, lifecycle, withState} from 'recompose';
import columns from './columns';
import Table from '../generic/Table';
import {default as tableActions} from '../generic/Table/actions';
import RowWrapper from '../generic/Table/Row';
import Cell from '../generic/Table/Row/Cell';
import Paginator from '../generic/Paginator';
import EditModal from '../generic/EditModal'
import actions from '../generic/Modal/actions';
import Icon from '../generic/Table/Row/Icon';
import {Link} from 'react-router-dom';
import Button from '../generic/Button';

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
    delete: (string)=>{},
    openModal: (string)=>{},
    merchants: Array<Merchant>,
    setEditMerchant: (string)=>{},
    setPagination: ()=>{},
    sync: ()=>{},
  }) => <Fragment>
    <Button name="Add Merchant" action={() => props.openModal('new-modal-merchant')} />

    <Table
      data={props.merchants}
      columns={columns}
      module="merchants"
      sync={props.sync}

      actionsColumns={[
        {type: 'edit', title: 'Edit'},
        {type: 'remove', title: 'Delete'},
      ]}
    >
      <RowWrapper rowGenerator={({data, columns}) => rowGenerator({props, data, columns})} />
    </Table>

    <Paginator module="merchants" pagesCount={4} limit={limit} sync={props.sync} setPagination={props.setPagination}/>

    <EditModal
      uniqueId="edit-modal-merchant"
      data={_.find(props.merchants, {id: props.editMerchant})}
    />

    <EditModal
      addNew
      uniqueId="new-modal-merchant"
      data={{}}
    />
  </Fragment>,

  rowGenerator = ({props, data, columns}) => <Fragment>
    <Cell> <Link to={`/merchants/${data.id}/bids`}>{data.id}</Link></Cell>
    <Cell>{data.firstname}</Cell>
    <Cell>{data.lastname}</Cell>
    <Cell>{data.avatarUrl}</Cell>
    <Cell>{data.email}</Cell>
    <Cell>{data.phone}</Cell>
    <Cell><input type="checkbox" checked={data.hasPremium} readOnly /></Cell>

    <Cell>
      <Icon
          type={'mode edit'}
          action={() => {props.setEditMerchant(data.id); props.openModal('edit-modal-merchant')}}
      />
    </Cell>

    <Cell>
      <Icon
          type={'delete'}
          action={() => props.delete(data.id)}
      />
    </Cell>
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
      delete       : (id, cb) => dispatch(rest.actions.merchant.delete({id})),
      sync         : (data, cb) => dispatch(rest.actions.merchants.sync({limit: data.limit, start: data.start, order: data.order, orderby: data.column})),
      setPagination: (module, limit, start) => dispatch(tableActions.setPagination(module, limit, start)),
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
