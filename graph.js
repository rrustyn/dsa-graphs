/** Node class for graph. */

class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}


/** Graph class. */

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  /** add Node instance and add it to nodes property on graph. */
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  /** add array of new Node instances and adds to them to nodes property. */
  addVertices(vertexArray) { 
    vertexArray.forEach(v => this.addVertex(v));
  }

  /** add edge between vertices v1,v2 */
  addEdge(v1, v2) { 
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  /** remove edge between vertices v1,v2 */
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
   }

  /** remove vertex from graph:
   *
   * - remove it from nodes property of graph
   * - update any adjacency lists using that vertex
   */
  removeVertex(vertex) { 
    for (let neighbor of vertex.adjacent) {
      this.removeEdge(neighbor, vertex);
    }
    
    this.nodes.delete(vertex);
  }

  /** traverse graph with DFS and returns array of Node values */
  depthFirstSearch(start) { 
    //stack is depth
    let toVisitStack = [start];
    let seen = new Set(toVisitStack);
    let nodeValues = [];
    
    while (toVisitStack.length > 0) {
      let current = toVisitStack.pop();
      nodeValues.push(current.value);
      
      for (let neighbor of current.adjacent) {
        if (!seen.has(neighbor)) {
          toVisitStack.push(neighbor);
          seen.add(neighbor);
        }
      }
    }
    
    return nodeValues;
  }

  /** traverse graph with BDS and returns array of Node values */
  breadthFirstSearch(start) { 
    //queue is breadth
    let toVisitQueue = [start];
    let seen = new Set(toVisitQueue);
    let nodeValues = [];
    
    while (toVisitQueue.length > 0) {
      let current = toVisitQueue.shift();
      nodeValues.push(current.value);
      
      for (let neighbor of current.adjacent) {
        if (!seen.has(neighbor)) {
          toVisitQueue.push(neighbor);
          seen.add(neighbor);
        }
      }
    }
    
    return nodeValues;
  }

  /** find the distance of the shortest path from the start vertex to the end vertex */
  distanceOfShortestPath(start, end) { 
    //at start, check if any adjacents are end if so done and distance is 1
    //if not, move into neighbor;
    //check if neighbors have end if so done and distance is 2
    //if not check next neighbor
    
    //need to keep track of vertexs we have visited 
    let toVisitQueue = [start];
    let seen = new Set(toVisitQueue);
    let distance = 1;
    
    while (toVisitQueue.length > 0) {
      let current = toVisitQueue.shift();
      if (current === end) return distance;
      
      for (let neighbor of current.adjacent) {
        if (!seen.has(neighbor)) {
          toVisitQueue.push(neighbor);
          seen.add(neighbor);
        }
      }
    }
    
    return nodeValues;
  }
}

module.exports = { Graph, Node }
