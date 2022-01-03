/* Day 18 */
const { getInputData, sum, min } = require('../utils');
const { v4: uuidV4 } = require('uuid');

let lastId = 0;
function getNewId () {
    return (lastId++).toString();
}

function createGraph ({ graph, element, parent = null, level = 0, isLeft = false, isRight = false }) {
    const id = getNewId();
    const node = {
        id,
        level,
        parent,
        isLeft,
        isRight,
        left: null,
        right: null,
        value: null,
    };
    if (Array.isArray(element)) {
        const { id: leftId } = createGraph({ graph, element: element[0], parent: id, level: level + 1, isLeft: true, });
        node.left = leftId;
        const { id: rightId } = createGraph({ graph, element: element[1], parent: id, level: level + 1, isRight: true, });
        node.right = rightId;
    } else {
        node.value = element;
    };
    graph[id] = node;

    return {
        id,
        node,
    };
}

function sumGraphs (first, second) {
    Object.keys(first).forEach(key => first[key].level++);
    Object.keys(second).forEach(key => second[key].level++);
    const firstRootId = Object.keys(first).filter(key => !first[key].parent)[0];
    const secondRootId = Object.keys(second).filter(key => !second[key].parent)[0];
    const newId = getNewId();
    const newRoot = {
        id: newId,
        level: 0,
        parent: null,
        isLeft: false,
        isRight: false,
        left: firstRootId,
        right: secondRootId,
        value: null,
    };
    first[firstRootId].parent = newId;
    first[firstRootId].isLeft = true;
    second[secondRootId].parent = newId;
    second[secondRootId].isRight = true,
    graph = {
        ...first,
        ...second,
        [newId]: newRoot,
    };
    return {
        rootId: newId,
        graph,
    };
}

function findClosestRight (graph, id) {
    const node = graph[id];
    if (!node.parent) return false; // No more numbers to the right
    let current = node;
    while (current.isRight && current.parent) {
        current = graph[current.parent];
    }
    if (!current.parent) return false; // No more numbers to the right
    // We found a right leg
    if (current.parent) {
        current = graph[graph[current.parent].right];
    } else {
        current = graph[current.right];
    }
    while (current.left) {
        current = graph[current.left];
    }
    return current.id;
}

function findClosestLeft (graph, id) {
    const node = graph[id];
    if (!node.parent) return false; // No more numbers to the left
    let current = node;
    while (current.isLeft && current.parent) {
        current = graph[current.parent];
    }
    if (!current.parent) return false; // No more numbers to the left
    // We found a left leg
    if (current.parent) {
        current = graph[graph[current.parent].left];
    } else {
        current = graph[current.left];
    }
    while (current.right) {
        current = graph[current.right];
    }
    return current.id;
}

function explode (graph, ids) {
    if (!ids.length) return graph;
    const id = min(ids.map(Number)).toString();
    const closeR = findClosestRight(graph, id);
    if (closeR) {
        graph[closeR].value += graph[graph[id].right].value;
    }
    const closeL = findClosestLeft(graph, id);
    if (closeL) {
        graph[closeL].value += graph[graph[id].left].value;
    }
    delete graph[graph[id].right];
    delete graph[graph[id].left];
    graph[id].left = null;
    graph[id].right = null;
    graph[id].value = 0;
    // console.log('AFTER EXPLODE', simplifyGraph(graph));
}

function split (graph, ids) {
    if (!ids.length) return graph;
    const id = min(ids.map(Number)).toString();
    const left = {
        id: getNewId(),
        level: graph[id].level + 1,
        parent: id,
        isLeft: true,
        isRight: false,
        left: null,
        right: null,
        value: Math.floor(graph[id].value / 2),
    };
    const right = {
        id: getNewId(),
        level: graph[id].level + 1,
        parent: id,
        isLeft: false,
        isRight: true,
        left: null,
        right: null,
        value: Math.ceil(graph[id].value / 2),
    };
    graph[id].value = null;
    graph[id].left = left.id;
    graph[id].right = right.id;
    graph[left.id] = left;
    graph[right.id] = right;
    // console.log('AFTER SPLIT', simplifyGraph(graph));
}

function reduceGraph (graph) {
    let toExplode = [...new Set(Object.keys(graph).filter(key => graph[key].level > 4 && graph[key].value !== null).map(key => graph[key].parent))];
    let toSplit = [...new Set(Object.keys(graph).filter(key => graph[key].value > 9))];
    while (toExplode.length || toSplit.length) {
        while (toExplode.length) {
            explode(graph, toExplode);
            toExplode = [...new Set(Object.keys(graph).filter(key => graph[key].level > 4 && graph[key].value !== null).map(key => graph[key].parent))];
        }
        toSplit = [...new Set(Object.keys(graph).filter(key => graph[key].value > 9))];
        split(graph, toSplit);
        toExplode = [...new Set(Object.keys(graph).filter(key => graph[key].level > 4 && graph[key].value !== null).map(key => graph[key].parent))];
        toSplit = [...new Set(Object.keys(graph).filter(key => graph[key].value > 9))];
    }
}

function getGraphMagnitude (graph, id) {
    const node = graph[id];
    if (typeof node.value === 'number') {
        return node.value;
    }
    return (3 * getGraphMagnitude(graph, node.left)) + (2 * getGraphMagnitude(graph, node.right));
}

function simplifyGraph (graph) {
    return Object.keys(graph).filter(k => typeof graph[k].value === 'number').map(k => ({ value: graph[k].value, level: graph[k].level }));
}

function printGraph (graph) {
    console.log(simplifyGraph(graph));
}

function run (data) {
    const elements = data.map(line => JSON.parse(line));
    const initial = elements.shift();
    let graph = {};
    let { id: graphRootId } = createGraph({ graph, element: initial });
    // printGraph(graph);
    elements.forEach((element, i) => {
        let newGraph = {};
        createGraph({ graph: newGraph, element });
        // printGraph(newGraph);

        reduceGraph(graph);
        reduceGraph(newGraph);
        const result = sumGraphs(graph, newGraph);
        graphRootId = result.rootId;
        graph = result.graph;
    });
    const magnitude = getGraphMagnitude(graph, graphRootId);
    // console.log(magnitude);
    return magnitude;
}

function day18A (file) {
    const data = getInputData(file);
    return run(data);
    return 4140;
}

function day18B (file) {
    const data = getInputData(file);
    return 1;
}

module.exports = {
    day18A,
    day18B,
    createGraph,
    reduceGraph,
    sumGraphs,
    getGraphMagnitude,
    simplifyGraph,
};
