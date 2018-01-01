// @flow
import * as React from 'react';
import Cell from './Cell';
import {type Bid} from '../../../Bids';

const
  RowWrapper = (props: {
    children: React.ChildrenArray<React.Element<typeof Cell>>,
    data: Bid
  }) => <tr key={`key-${props.data.id}`}>
    {React.cloneElement(props.children, {data: props.data})}
  </tr>;

export default RowWrapper;
