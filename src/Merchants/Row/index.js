// @flow
import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import Cell from '../../generic/Table/Row/Cell';
import Icon from '../../generic/Table/Row/Icon';
import type Bid from '../';

export default (props: {
  data: Bid,
  delete: string=>{},
  openModal: string=>{},
  setEditMerchant: (string)=>{}
}) => <Fragment>
  <Cell><Link to={`/merchants/${props.data.id}/bids`}>{props.data.id}</Link></Cell>
  <Cell>{props.data.firstname}</Cell>
  <Cell>{props.data.lastname}</Cell>
  <Cell>{props.data.avatarUrl}</Cell>
  <Cell>{props.data.email}</Cell>
  <Cell>{props.data.phone}</Cell>
  <Cell><input type="checkbox" checked={props.data.hasPremium} readOnly /></Cell>

  <Cell>
    <Icon
      type="mode_edit"
      action={() => { props.setEditMerchant(props.data.id); props.openModal('edit-modal-merchant'); }}
    />
  </Cell>

  <Cell>
    <Icon
      type="delete"
      action={() => props.delete(props.data.id)}
    />
  </Cell>
</Fragment>;
