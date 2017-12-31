import React from 'react';

const
  RowWrapper = (props: {
    rowGenerator: ()=>{},
  }) => <tr key={`key-${props.data.id}`}>
    {props.rowGenerator({columns: props.columns, data: props.data})}
  </tr>;

export default RowWrapper;
