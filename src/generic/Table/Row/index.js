// @flow
import React from 'react';

const
  RowWrapper = (props: {
    children: React$Element<*>,
    data: {id: string}
  }) => <tr key={`key-${props.data.id}`}>
    {React.cloneElement(props.children, {data: props.data})}
  </tr>;

export default RowWrapper;
