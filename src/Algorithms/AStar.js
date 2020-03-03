export function aStart(nodes, startNode, finishNode) {
  let openList = [];
  let closedList = [];
  startNode.g = 0;
  startNode.h = manhattanDistance(startNode, finishNode);
  startNode.f = startNode.g + startNode.h;
  openList.push(startNode);
  while (!!openList.length) {
    let lowInd = 0;
    for (let i = 0; i < openList.length; i++) {
      if (openList[i].f < openList[lowInd].f) lowInd = i;
    }
    let currentNode = openList[lowInd];
    if (currentNode.row === finishNode.row && currentNode.col === finishNode.col) {
      console.log(currentNode);
      return 'PATH FOUND!';
    }
    openList.splice(lowInd, 1);
    closedList.push(currentNode);
    let neighbors = getNeighbors(currentNode, nodes);
    for (let i = 0; i < neighbors.length; i++) {
      let neighbor = neighbors[i];
      if (nodeExistInList(closedList, neighbor) || neighbor.isWall) {
        continue;
      }

      let gScore = currentNode.g + 1;
      let gScoreIsBest = false;

      if (!nodeExistInList(openList, neighbor)) {
        gScoreIsBest = true;
        neighbor.h = manhattanDistance(neighbor, finishNode);
        openList.push(neighbor)
      } else if (gScore < neighbor.g) {
        gScoreIsBest = true;
      }

      if (gScoreIsBest) {
        neighbor.parent = currentNode;
        neighbor.g = gScore;
        neighbor.f = neighbor.g + neighbor.h;
      }
    }
  }

  return [];
}

const getNeighbors = (currentNode, nodes) => {
  let neighbors = [];
  nodes.forEach(row => {
    row.forEach(node => {
      if (node.row === currentNode.row && node.col === currentNode.col - 1) neighbors.push(node);
      if (node.row === currentNode.row && node.col === currentNode.col + 1) neighbors.push(node);
      if (node.col === currentNode.col && node.row === currentNode.row - 1) neighbors.push(node);
      if (node.col === currentNode.col && node.row === currentNode.row + 1) neighbors.push(node);
    })
  });
  return neighbors;
}
const manhattanDistance = (nodeA, nodeB) => Math.abs(nodeB.col - nodeA.col) + Math.abs(nodeB.row - nodeA.row);

const pathTo = (node) => {
  let currentNode = node;
  let path = [];
  console.log(currentNode)
  return false;
  // while (currentNode.parent) {

  //   path.unshift(currentNode);
  //   currentNode = node.parent;
  //   console.log('pathTo currentnode', currentNode);
  // }
  // return path;
}

const nodeExistInList = (list, nodeToFound) => {
  for (let node of list) {
    if (node.row === nodeToFound.row && node.col === nodeToFound.col) return true;
  }
  return null;
}