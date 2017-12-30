// @flow
import React, {Fragment} from 'react';
import rest from './rest';
import {connect} from 'react-redux';
import {compose, lifecycle, withState} from 'recompose';
import RowWrapper from '../generic/Table/Row';
import Cell from '../generic/Table/Row/Cell';
import columns from './columns';
import Table from '../generic/Table';
import Button from '../generic/Button';
import actions from '../generic/Modal/actions';
import { push } from 'react-router-redux';
import moment from 'moment';

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
    push: (string)=>{},
    bids: Array<Bids>,
    setEditMerchant: (string)=>{},
    sync: ()=>{},
  }) => <Fragment>
    <Button name="Back to List" action={() => props.push('/')} />

    <Table
      data={props.bids}
      columns={columns}
      module="bids"
      sync={props.sync}
    >
      <RowWrapper rowGenerator={({data, columns}) => rowGenerator({props, data, columns})} />
    </Table>
  </Fragment>;

const rowGenerator = ({props, data, columns}) => <Fragment>
  <Cell>{data.id}</Cell>
  <Cell>{data.carTitle}</Cell>
  <Cell>{data.amount}</Cell>
  <Cell>{moment(data.created).format('MM/DD/YYYY')}</Cell>
</Fragment>;

export default compose(
  connect(
    state => ({
      bids: state.rest.bids.data,
    }),

    (dispatch, props) => ({
      closeModal: uniqueId => dispatch(actions.closeModal(uniqueId)),
      openModal : uniqueId => dispatch(actions.openModal(uniqueId)),
      push      : url => dispatch(push(url)),

      // TODO: after changing sync from redux-api to custom, make header reader
      // to determine pagination count
      sync: (data, cb) => dispatch(rest.actions.bids.sync({id:props.match.params.id, order: data.order, orderby: data.column})),
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
