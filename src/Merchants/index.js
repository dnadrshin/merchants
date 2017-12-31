// @flow
import _ from 'lodash';
import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {compose, lifecycle, withState} from 'recompose';
import columns from './columns';
import Table from '../generic/Table';
import rest from './rest';
import tableActions from '../generic/Table/actions';
import RowWrapper from '../generic/Table/Row';
import Row from './Row';
import Paginator from '../generic/Paginator';
import EditModal from '../generic/EditModal';
import actions from '../generic/Modal/actions';
import Button from '../generic/Button';
import type Bid from '../Bids';
import Panel from '../generic/Panel';
import Loading from '../generic/Loading';

type Merchant = {
  id: string,
  firstname: string,
  lastname: string,
  avatarUrl: string,
  email: string,
  phone: string,
  hasPremium: boolean,
  bids: Array<Bid>
};

// TODO: Make global settings for per page limit
const
  limit = 3,

  Merchants = (props: {
    isLoading: boolean,
    editMerchant: string,
    delete: (string)=>{},
    openModal: (string)=>{},
    pagination: {},
    merchants: Array<Merchant>,
    setEditMerchant: (string)=>{},
    setPagination: ()=>{},
    sync: ()=>{}
  }) => <Fragment>
    <Panel title="Merchant List">
      <Button
        icon="person add"
        name="Add Merchant"
        action={() => props.openModal('new-modal-merchant')}
      />
    </Panel>

    <Table
      data={props.merchants}
      columns={columns}
      module="merchants"
      sync={props.sync}

      actionsColumns={[
        {type: 'edit', title: 'Edit', name: 'edit'},
        {type: 'remove', title: 'Delete', name: 'delete'},
      ]}
    >
      <RowWrapper rowGenerator={Row} >
        <Row
          setEditMerchant={props.setEditMerchant}
          openModal={props.openModal}
          delete={props.delete}
        />
      </RowWrapper>
    </Table>

    <Paginator
      module="merchants"
      pagesCount={4}
      limit={limit}
      setPagination={props.setPagination}
      pagination={props.pagination}
    />

    <EditModal
      uniqueId="edit-modal-merchant"
      data={_.find(props.merchants, {id: props.editMerchant})}
      resync={() => props.sync({...props.pagination})}
    />

    <EditModal
      addNew
      uniqueId="new-modal-merchant"
      data={{}}
    />

    <Loading show={props.isLoading} />
  </Fragment>;

export default compose(
  connect(
    state => ({
      isLoading : state.rest.merchants.loading,
      merchants : state.rest.merchants.data,
      pagination: _.get(state.table, 'merchants.pagination', {start: 1, limit: 3}),
    }),

    dispatch => ({
      openModal: uniqueId => dispatch(actions.openModal(uniqueId)),

      // TODO: after changing sync from redux-api to custom, make header reader
      // to determine pagination count
      delete: id => dispatch(rest.actions.merchant.delete({id})),

      sync: data => dispatch(rest.actions.merchants.sync({
        limit  : data.limit,
        start  : data.start,
        order  : data.order,
        orderby: data.column,
      })),

      setPagination: (module, limit, start) => dispatch(tableActions
        .setPagination(module, limit, start)),
    }),
  ),

  withState('editMerchant', 'setEditMerchant', ''),

  lifecycle({
    componentDidMount() {
      this.props.sync({limit, start: 1});
    },
  }),
)(Merchants);
