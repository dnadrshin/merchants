// @flow
import React, {Fragment} from 'react';
import {push} from 'react-router-redux';
import {connect} from 'react-redux';
import {compose, lifecycle} from 'recompose';
import rest from './rest';
import RowWrapper from '../generic/Table/Row';
import columns from './columns';
import Row from './Row';
import Table from '../generic/Table';
import Button from '../generic/Button';
import actions from '../generic/Modal/actions';
import Panel from '../generic/Panel';
import Loading from '../generic/Loading';

export type Bid = {
  id: string,
  carTitle: string,
  amount: number,
  created: string
};

// TODO: Make global settings for per page limit
const
  limit = 3,

  Bids = (props: {
    isLoading: boolean,
    push: (string)=>{},
    bids: Array<Bid>,
    sync: ()=>{}
  }) => <Fragment>
    <Panel title="Bids List">
      <Button
        icon="chevron_left"
        name="Back to Merchants List"
        action={() => props.push('/')}
      />
    </Panel>

    <Table
      data={props.bids}
      columns={columns}
      module="bids"
      sync={props.sync}
    >
      <RowWrapper>
        <Row />
      </RowWrapper>
    </Table>

    <Loading show={props.isLoading} />
  </Fragment>;

export default compose(
  connect(
    state => ({
      bids     : state.rest.bids.data,
      isLoading: state.rest.bids.loading,
    }),

    (dispatch, props) => ({
      closeModal: uniqueId => dispatch(actions.closeModal(uniqueId)),
      openModal : uniqueId => dispatch(actions.openModal(uniqueId)),
      push      : url => dispatch(push(url)),

      // TODO: after changing sync from redux-api to custom, make header reader
      // to determine pagination count
      sync: (data, cb) => dispatch(rest.actions.bids.sync(
        {id: props.match.params.id, order: data.order, orderby: data.column},
        cb,
      )),
    }),
  ),

  lifecycle({
    componentDidMount() {
      this.props.sync({limit, start: 1});
    },
  }),
)(Bids);
