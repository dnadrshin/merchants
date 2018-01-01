// @flow
import React from 'react';

export default (props: {
    icon: string,
    name: string,
    type?: string,
    action: ()=>{}
  }) => <button className="btn btn-default" type={props.type} onClick={props.action} style={{display: 'flex', alignItems: 'center'}}>
  {props.icon && <i className="material-icons">{props.icon}</i>}{props.name}
</button>;
