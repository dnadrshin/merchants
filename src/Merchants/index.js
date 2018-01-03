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
import {type Bid} from '../Bids';
import Panel from '../generic/Panel';
import Loading from '../generic/Loading';
import restActions from '../generic/RestAPI/actions';

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

const
  Merchants = (props: {
    isLoading: boolean,
    editMerchant: string,
    delete: (string)=>{},
    openModal: (string)=>{},
    pagination: {limit: number, start: number},
    merchants: Array<Merchant>,
    setEditMerchant: (string)=>{},
    setPagination: ()=>{},
    sync: ({limit: number, start: number})=>{}
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
      <RowWrapper>
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

      // TODO: Make global settings for per page limit
      limit={3}
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
      resync={() => props.sync({...props.pagination})}
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
      getMerchants: params => dispatch(restActions.getMerchants(params)),
      openModal   : uniqueId => dispatch(actions.openModal(uniqueId)),

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
      // TODO: Make global settings for per page limit
      this.props.sync({limit: 3, start: 1});

      // Example of async actions with thunk
      this.props.getMerchants({limit: 3, start: 1});
    },
  }),
)(Merchants);
