export function aStart(nodes, startNode, finishNode) {
  let openSet = [startNode];
  startNode.g = 0;
  startNode.h = manhattanDistance(startNode, finishNode);
  startNode.f = startNode.g + startNode.h;
  let closestNode = null;
  while (!!openSet.length) {

    let currentNode = openSet.pop();

    if (currentNode === finishNode) {
      console.log('astart path was found', currentNode);
      return pathTo(currentNode);
    }

    let neighbors = getNeighbors(currentNode, nodes);

    for (let i = 0; i < neighbors.length; i++) {
      let neighbor = neighbors[i];
      if (neighbor.isWall) continue;
      neighbor.g = currentNode.g + 1;
      // let gScore = currentNode.g + 1;
      let beenVisited = neighbor.visited;
      if (!beenVisited) {
        neighbor.visited = true;
        neighbor.parent = currentNode;
        neighbor.g = currentNode.g + 1;
        neighbor.h = manhattanDistance(neighbor, finishNode);
        neighbor.f = neighbor.g + neighbor.h;

        closestNode = (!currentNode) ? neighbor : (neighbor.f < closestNode.f) ? neighbor : closestNode;
        // if (neighbor.h < closestNode.h || (neighbor.h === closestNode.h && neighbor.g < closestNode.g)) {
        //   closestNode = neighbor;
        // }
        // if (!beenVisited) {
        //   openSet.push(neighbor);
        // } else {
        //   ////
        // }
      }
    }



  }

  // return 'Path was no found';
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