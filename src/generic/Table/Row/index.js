import _ from 'lodash';
import React from 'react';
import {convertFieldValue as converter} from '../../helpers';
import Icon from './Icon';

const
    Row = ({data, columns}) => <tr key={`key-${data.id}`}>
        {columns.map((column) => <td key={`${data.id}-col-${column.name}`}>
            {!column.isServiceField
                ? converter(_.get(data, column.name), column.type)

                : <Icon
                    type={column.name}
                    action={column.action(data.id)}
                />}
        </td>)}
    </tr>;

export default Row;