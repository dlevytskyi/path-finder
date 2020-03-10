import React, { Component } from 'react';

import './Node.scss';

export default class Node extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: props.col,
      y: props.row,
      f: 0,
      g: 0,
      h: 0,
    };
  }

  render() {
    const { isStart, isFinish, isShortPathEl } = this.props;
    if (isShortPathEl) console.log('TRUE!');

    const shortPathElClass = isShortPathEl ? 'short-path' : ''
    let className = isStart ? 'node-start' : isFinish ? 'node-finish' : '';
    className = `${shortPathElClass} ${className}`;
    return (
      <div className={`node ${className}`}></div>
    )
  }
}