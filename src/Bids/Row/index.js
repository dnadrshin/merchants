// @flow
import moment from 'moment';
import React, {Fragment} from 'react';
import Cell from '../../generic/Table/Row/Cell';
import type Bid from '../Bids';

export default (props: {
  data: Bid
}) => <Fragment>
  <Cell>{props.data.id}</Cell>
  <Cell>{props.data.carTitle}</Cell>
  <Cell>{props.data.amount}</Cell>
  <Cell>{moment(props.data.created).format('MM/DD/YYYY')}</Cell>
</Fragment>;
