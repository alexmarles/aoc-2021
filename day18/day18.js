/* Day 18 */
const { getInputData, sum } = require('../utils');
const { v4: uuidV4 } = require('uuid');

function createGraph ({ graph, element, parent = null, level = 0, isLeft = false, isRight = false }) {
    const id = uuidV4();
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
    const newId = uuidV4();
    const newRoot = {
        newId,
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
    return graph;
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
        // console.log('CURRENT', current);
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
    const id = ids[0];
    // console.log('EXPLODING', id);
    const closeR = findClosestRight(graph, id);
    if (closeR) {
        // console.log('closeR', graph[closeR]);
        graph[closeR].value += graph[graph[id].right].value;
    }
    const closeL = findClosestLeft(graph, id);
    if (closeL) {
        // console.log('closeL', graph[closeL]);
        graph[closeL].value += graph[graph[id].left].value;
    }
    delete graph[graph[id].right];
    delete graph[graph[id].left];
    graph[id].left = null;
    graph[id].right = null;
    graph[id].value = 0;
}

function split (graph, ids) {
    if (!ids.length) return graph;
    const id = ids[0];
    const left = {
        id: uuidV4(),
        level: graph[id].level + 1,
        parent: id,
        isLeft: true,
        isRight: false,
        left: null,
        right: null,
        value: Math.floor(graph[id].value / 2),
    };
    const right = {
        id: uuidV4(),
        level: graph[id].level + 1,
        parent: id,
        isLeft: false,
        isRight: true,
        left: null,
        right: null,
        value: Math.ceil(graph[id].value / 2),
    };
    graph[id].value = null;
    graph[id].left = left;
    graph[id].right = right;
    graph[left.id] = left;
    graph[right.id] = right;
}

function reduceGraph (graph) {
    let toExplode = [];
    let toSplit = [];
    do {
        toExplode = [...new Set(Object.keys(graph).filter(key => graph[key].level > 3).map(key => graph[key].parent))];
        if (toExplode.length) explode(graph, toExplode);
        toSplit = [...new Set(Object.keys(graph).filter(key => graph[key].value > 9))];
        if (toSplit.length) split(graph, toSplit);
    } while (toExplode.length || toSplit.length);
}

function getGraphMagnitude (graph, id) {
    const node = graph[id];
    if (typeof node.value === 'number') {
        return node.value;
    }
    return (3 * getGraphMagnitude(graph, node.left)) + (2 * getGraphMagnitude(graph, node.right));
}

function run (data) {
    const elements = data.map(line => JSON.parse(line));
    const initial = elements.shift();
    let graph = {};
    let { id: graphRootId } = createGraph({ graph, element: [1,1] });
    // graph = elements.reduce((oGraph, current) => {
    //     let newGraph = {};
    //     createGraph({ graph: newGraph, element: current });
    //     reduceGraph(oGraph);
    //     oGraph = sumGraphs(oGraph, newGraph);
    //     return oGraph;
    // }, graph);
    // const magnitude = getGraphMagnitude(graph, graphRootId);
    let graph2 = {};
    createGraph({ graph: graph2, element: [2,2] });
    reduceGraph(graph);
    graph = sumGraphs(graph, graph2);
    let graph3 = {};
    createGraph({ graph: graph3, element: [3,3] });
    reduceGraph(graph);
    graph = sumGraphs(graph, graph3);
    let graph4 = {};
    createGraph({ graph: graph4, element: [4,4] });
    reduceGraph(graph);
    graph = sumGraphs(graph, graph4);
    let graph5 = {};
    createGraph({ graph: graph5, element: [5,5] });
    reduceGraph(graph);
    graph = sumGraphs(graph, graph5);
    // let graph6 = {};
    // createGraph({ graph: graph6, element: [6,6] });
    // reduceGraph(graph);
    // graph = sumGraphs(graph, graph6);
    reduceGraph(graph);
    console.log(Object.keys(graph).filter(k => typeof graph[k].value === 'number').map(k => ({ value: graph[k].value, level: graph[k].level })));
    // console.log(Object.keys(graph).filter(k => !graph[k].parent));
}

function day18A (file) {
    const data = getInputData(file);
    run(data);
    return 4140;
}

function day18B (file) {
    const data = getInputData(file);
    return 1;
}

module.exports = {
    day18A,
    day18B,
};
