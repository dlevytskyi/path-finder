import React, { Component } from 'react';

import './Node.css';

export default class Node extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: props.col,
      y: props.row,
      f: 0,
      g: 0,
      h: 0
    };
  }

  render() {
    const { isStart, isFinish } = this.props;
    const className = isStart ? 'node-start' : isFinish ? 'node-finish' : '';
    return (
      <div className={`node ${className}`}></div>
    )
  }
}