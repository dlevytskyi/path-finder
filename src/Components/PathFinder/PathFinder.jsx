import React, { Component } from 'react';
import Node from './Node/Node';
import './PathFinder.scss';
import '../../Algorithms/AStar';
import { aStart } from '../../Algorithms/AStar';

export default class PathFinder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: []
    };
  }

  componentDidMount() {
    const nodes = [];
    let startNode, finishNode = null;
    for (let row = 0; row < 20; row++) {
      const currentRow = [];
      for (let col = 0; col < 50; col++) {
        const currentNode = {
          col,
          row,
          isStart: row === 10 && col === 5,
          isFinish: row === 10 && col === 45
        }
        startNode = currentNode.isStart ? currentNode : startNode;
        finishNode = currentNode.isFinish ? currentNode : finishNode;
        currentRow.push(currentNode);
      }
      nodes.push(currentRow);
    }
    this.setState({ nodes, startNode, finishNode })
  }

  render() {
    const findPath = () => {
      const { nodes, startNode, finishNode } = this.state;
      let path = aStart(nodes, startNode, finishNode);
      if (path) {
        console.log('Path was found');
        console.log(path);
      }
    }

    const { nodes } = this.state;

    return (
      <div className="grid">
        PathFinder
        <button onClick={findPath}>Find Path</button>
        {nodes.map((row, rowIdx) => {
          return <div key={rowIdx}>
            {row.map((node, nodeIdx) => {
              const { isStart, isFinish, col, row } = node;
              return (
                <Node
                  key={nodeIdx}
                  isStart={isStart}
                  isFinish={isFinish}
                  col={col}
                  row={row}>
                </Node>
              );
            })}
          </div>
        })}
      </div>
    )
  }
}