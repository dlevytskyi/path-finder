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
    const { isStart, isFinish, isShortPathEl, isWall, onMouseDown, onMouseEnter, onMouseUp, row, col } = this.props;
    const shortPathElClass = isShortPathEl ? 'short-path' : ''
    const wallClass = isWall ? 'wall' : '';
    let className = isStart ? 'node-start' : isFinish ? 'node-finish' : '';
    className = `${shortPathElClass} ${className} ${wallClass}`;
    return (
      <div
        className={`node ${className}`}
        onMouseDown={() => { onMouseDown(row, col) }}
        onMouseEnter={() => { onMouseEnter(row, col) }}
        onMouseUp={() => { onMouseUp() }}>
      </div>
    )
  }
}