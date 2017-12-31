// @flow
import React from 'react';

const
  Icon = (props: {
    type: string,
    action: ()=>{}
  }) => <i
    className="material-icons"
    style={{cursor: 'pointer'}}
    onClick={props.action}
  >
    {props.type}
  </i>;

export default Icon;
