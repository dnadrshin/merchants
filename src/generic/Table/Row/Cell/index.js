// @flow
import React from 'react';

const
  Cell = (props: {
    children?: React$Element<*>
}) => <td>
    {props.children}
  </td>;

export default Cell;
