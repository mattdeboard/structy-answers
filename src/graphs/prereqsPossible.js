// https://www.structy.net/problems/premium/prereqs-possible

/**
 * Write a function, prereqsPossible, that takes in a number of courses
 * (n) and prerequisites as arguments. Courses have ids ranging from 0
 * through n - 1. A single prerequisite of [A, B] means that course A
 * must be taken before course B. The function should return a boolean
 * indicating whether or not it is possible to complete all courses.
 *
 * ```js
 * const numCourses = 6;
 * const prereqs = [
 *   [0, 1],
 *   [2, 3],
 *   [0, 2],
 *   [1, 3],
 *   [4, 5],
 * ];
 * prereqsPossible(numCourses, prereqs); // -> true
 * ```
 */

// Another white-gray-black cycle-detection problem, like hasCycle
const prereqsPossible = (numCourses, prereqs) => {
  const graph = buildGraph(prereqs),
    visiting = new Set(),
    visited = new Set();

  for (const node in graph) {
    if (detect(graph, node, visiting, visited)) return false;
  }
  return true;
};

const detect = (graph, src, visiting, visited) => {
  if (visited.has(src)) return false;
  if (visiting.has(src)) return true;
  visiting.add(src);

  for (const prereq of graph[src]) {
    if (detect(graph, prereq, visiting, visited)) return true;
  }

  visiting.delete(src);
  visited.add(src);
  return false;
};
const buildGraph = edges => {
  const graph = {};

  for (const [l, r] of edges) {
    if (!(l in graph)) graph[l] = [];
    if (!(r in graph)) graph[r] = [];
    graph[r].push(l);
  }
  return graph;
};
module.exports = {
  prereqsPossible,
};
