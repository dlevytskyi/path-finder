import React, { Component } from 'react';
import Node from './Node/Node';
import './PathFinder.scss';
import '../../Algorithms/AStar';
import { aStart } from '../../Algorithms/AStar';

const DEFAULT_START_NODE = {
  row: 10,
  col: 5
}
const DEFAULT_FINISH_NODE = {
  row: 10,
  col: 45
}

const GRID_SIZE = {
  rows: 20,
  cols: 50
}

export default class PathFinder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      mousePressed: false
    };
  }

  componentDidMount() {
    const startNode = DEFAULT_START_NODE;
    const finishNode = DEFAULT_FINISH_NODE;
    const grid = this.createGrid(GRID_SIZE.rows, GRID_SIZE.cols, DEFAULT_START_NODE, DEFAULT_FINISH_NODE);
    this.setState({ grid, startNode, finishNode })
  }

  animateShortestPath(path) {
    for (let i = 0; i < path.length; i++) {
      setTimeout(() => {
        const node = path[i];
        const newGrid = this.state.grid.slice();
        let newNode = {
          ...node,
          isShortPathEl: true
        }
        newGrid[newNode.row][newNode.col] = newNode;
        this.setState({ grid: newGrid })
      }, 50 * i);
    }
  }

  findPath() {
    const { grid, startNode, finishNode } = this.state;
    let path = aStart(grid, startNode, finishNode);
    if (path && path.length > 0) {
      this.animateShortestPath(path);
    }
  }

  createGrid(rows, cols, startNode, finishNode) {
    const grid = [];
    for (let row = 0; row < rows; row++) {
      const currentRow = [];
      for (let col = 0; col < cols; col++) {
        const currentNode = {
          col,
          row,
          isWall: false,
          isStart: row === startNode.row && col === startNode.col,
          isFinish: row === finishNode.row && col === finishNode.col
        }
        startNode = currentNode.isStart ? currentNode : startNode;
        finishNode = currentNode.isFinish ? currentNode : finishNode;
        currentRow.push(currentNode);
      }
      grid.push(currentRow);
    }
    return grid;
  }

  clearBoard() {
    const { startNode, finishNode } = this.state;
    const newGrid = this.createGrid(GRID_SIZE.rows, GRID_SIZE.cols, startNode, finishNode)
    this.setState({ grid: newGrid });
  }

  handleMouseDown(row, col) {
    const newGrid = this.createGridWithWall(this.state.grid, row, col);
    this.setState({ grid: newGrid, mousePressed: true });
  }

  handleMouseEnter(row, col) {
    console.log('mouseEnter', this.state.mousePressed)
    if (!this.state.mousePressed) return false;
    const newGrid = this.createGridWithWall(this.state.grid, row, col);
    this.setState({ grid: newGrid });
  }

  handleMouseUp() {
    this.setState({ mousePressed: false })
  }

  createGridWithWall(grid, wallRow, wallCol) {
    const newGrid = grid.slice();
    console.log(wallRow, wallCol);
    const node = newGrid[wallRow][wallCol];
    const wallNode = {
      ...node,
      isWall: !node.isWall
    };
    newGrid[wallRow][wallCol] = wallNode;
    return newGrid;
  }

  render() {
    const { grid } = this.state;

    return (
      <div className="grid">
        PathFinder
        <button onClick={() => { this.findPath() }}>Find Path</button>
        <button onClick={() => { this.clearBoard() }}>Clear board</button>
        {grid.map((row, rowIdx) => {
          return <div key={rowIdx}>
            {row.map((node, nodeIdx) => {
              const { isStart, isFinish, col, row, isShortPathEl, isWall, mouseIsPressed } = node;
              return (
                <Node
                  key={nodeIdx}
                  isStart={isStart}
                  isFinish={isFinish}
                  col={col}
                  row={row}
                  isShortPathEl={isShortPathEl}
                  isWall={isWall}
                  mouseIsPressed={mouseIsPressed}
                  onMouseDown={() => { this.handleMouseDown(row, col) }}
                  onMouseEnter={() => { this.handleMouseEnter(row, col) }}
                  onMouseUp={() => { this.handleMouseUp() }}>
                </Node>
              );
            })}
          </div>
        })}
      </div>
    )
  }
}