// @flow
import * as React from 'react';
import {Link} from 'react-router-dom';

const
  Cell = (props: {
    children?: React.ChildrenArray<number | string | Link>
}) => <td>
    {props.children}
  </td>;

export default Cell;
