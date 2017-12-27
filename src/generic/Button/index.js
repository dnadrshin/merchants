import React from 'react';

export default (props: {
    name: string,
    type: string,
    action: ()=>{},
  }) => <button className="btn btn-default" type={props.type} onClick={props.action}>
    {props.name}
  </button>;
