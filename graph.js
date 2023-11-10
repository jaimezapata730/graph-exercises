class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add (vertex)
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (let vertex of vertexArray) {
      this.addVertex(vertex)
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {

    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    for (let node of this.nodes) {
      if (node.adjacent.has(vertex)) {
        node.adjacent.delete(vertex);
      }
    }
    this.nodes.delete(vertex)
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    const knock = new Set(start);
    const res = [];
    
    const traverse = (vertex) => {
      if (!vertex) {
        return null;
      }
      knock.add(vertex);
      res.push(vertex.value);

      vertex.adjacent.forEach(element => {
        if(!knock.has(element)) {
          return traverse(element);
        }
      });
    }
    traverse(start);

    return res;
  }

  depthFirstSearchIterative(start) {
    const stack = [start];
    const res = [];
    const knock = new Set();
    let currVertex;

    knock.add(start);

    while (stack.length) {
      currVertex = stack.pop()
      res.push(currVertex.value);

      currVertex.adjacent.forEach(element => {
        if (!knock.has(element)) {
          knock.add(element);
          stack.push(element);
        }
      });
    }
    return res;
  }


  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    const queue = [start];
    const res = [];
    const knock = new Set()
    let currVertex

    knock.add(start);

    while (queue.length) {
      currVertex = queue.shift();
      res.push(currVertex.value);

      currVertex.adjacent.forEach(element => {
        if (!knock.has(element)) {
          knock.add(element);
          queue.push(element);
        }
      });
    }
    return res;
  }

  shortestPath(start, end) {
    if (start === end) {
      return [start.value];
    }

    var queue = [start];
    let knock = new Set();
    let predecessors = {};
    let path = [];

    while (queue.length) {
      let currVertex = queue.shift();

      if (currVertex === end) {
        let stop = predecessors[end.value];
        while (stop) {
          path.push(stop);
          stop = predecessors[stop];
        }
        path.unshift(start.value);
        path.reverse();
        return path;
      }

      knock.add(currVertex);
      for (let vertex of currVertex.adjacent) {
        if (!visited.has(vertex)) {
          predecessors[vertex.value] = currVertex.value;
          queue.push(vertex)
        }
      }
    }
  }

}

module.exports = {Graph, Node}