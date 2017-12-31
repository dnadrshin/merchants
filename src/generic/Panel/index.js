// @flow
import React from 'react';

export default (props: {
    children?: React$Element<*>,
    title: string,
}) => <div className="panel panel-default">
  <div className="panel-heading">
    <h3 className="panel-title">{props.title}</h3>
  </div>
  <div className="panel-body">
    {props.children}
  </div>
</div>;
