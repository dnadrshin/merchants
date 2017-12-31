// @flow
import React from 'react';

const
  divStyle = {
    width          : '100vw',
    height         : '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position       : 'fixed',
    left           : '0px',
    zIndex         : '10',
    top            : '0px',
  },

  imgStyle = {
    position  : 'absolute',
    top       : '50%',
    left      : '50%',
    width     : '200px',
    height    : '200px',
    marginTop : '-100px',
    marginLeft: '-100px',
  },

  Loading = (props: {show: boolean}) => props.show && <div style={divStyle}>
    <img style={imgStyle} src="/img/loading.gif" alt="loading..." />
  </div>;

export default Loading;
