// https://www.structy.net/problems/premium/semesters-required

/** Write a function, semestersRequired, that takes in a number of
 * courses (n) and a list of prerequisites as arguments. Courses have ids
 * ranging from 0 through n - 1. A single prerequisite of [A, B] means that
 * course A must be taken before course B. Return the minimum number of
 * semesters required to complete all n courses. There is no limit on how
 * many courses you can take in a single semester, as long as the
 * prerequisites of a course are satisfied before taking it.
 *
 * Note that given prerequisite [A, B], you cannot take course A and course
 * B concurrently in the same semester. You must take A in some semester
 * before B.
 *
 * You can assume that it is possible to eventually complete all
 * courses.
 *
 * ```js
 * const numCourses = 6;
 * const prereqs = [
 *   [1, 2],
 *   [2, 4],
 *   [3, 5],
 *   [0, 5],
 * ];
 * semestersRequired(numCourses, prereqs); // -> 3
 * ```
 */

const semestersRequired = (numCourses, prereqs) => {
  if (prereqs.length === 0) return 1;

  const graph = buildGraph(prereqs);
  // Map of course to which semester it can be taken at
  const semesterMap = {};

  for (const node in graph) {
    if (graph[node].length === 0) semesterMap[node] = 1;
  }

  for (const node in graph) {
    traverseCourses(graph, node, semesterMap);
  }
  return Math.max(...Object.values(semesterMap));
};

const traverseCourses = (graph, course, semesterMap) => {
  if (course in semesterMap) return semesterMap[course];

  let maxLength = 0;
  for (const prereq of graph[course]) {
    const attempt = traverseCourses(graph, prereq, semesterMap);
    maxLength = Math.max(attempt, maxLength);
  }

  semesterMap[course] = 1 + maxLength;
  return semesterMap[course];
};

const buildGraph = edges => {
  const graph = {};

  for (const [l, r] of edges) {
    if (!(r in graph)) graph[r] = [];
    if (!(l in graph)) graph[l] = [];
    graph[r].push(l);
  }

  return graph;
};

module.exports = {
  semestersRequired,
};

/** Given solution:
 *
 * ```js
 * const semestersRequired = (numCourses, prereqs) => {
 *   const graph = buildGraph(numCourses, prereqs);
 *   const distance = {};
 *
 *   for (let i = 0; i < numCourses; i += 1) {
 *     if (graph[i].length === 0) distance[i] = 1;
 *   }
 *
 *   for (let i = 0; i < numCourses; i += 1) {
 *     traverseDistance(graph, i, distance)
 *   }
 *
 *   return Math.max(...Object.values(distance));
 * };
 *
 * const traverseDistance = (graph, node, distance) => {
 *   if (node in distance) return distance[node];
 *
 *   let maxDistance = 0;
 *   for (let neighbor of graph[node]) {
 *     const neighborDistance = traverseDistance(graph, neighbor, distance);
 *     if (neighborDistance > maxDistance) maxDistance = neighborDistance;
 *   }
 *
 *   distance[node] = maxDistance + 1;
 *   return distance[node];
 * };
 *
 * const buildGraph = (numCourses, prereqs) => {
 *   const graph = {};
 *
 *   for (let i = 0; i < numCourses; i += 1) {
 *     graph[i] = [];
 *   }
 *
 *   for (let prereq of prereqs) {
 *     const [a, b] = prereq;
 *     graph[a].push(b);
 *   }
 *
 *   return graph;
 * };
 * ```
 */
