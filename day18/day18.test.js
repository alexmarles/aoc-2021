const { day18A, day18B, createGraph, reduceGraph, sumGraphs, getGraphMagnitude, simplifyGraph } = require('./day18');

xdescribe('Functions', () => {
    it('should simplify graph', () => {
        const element = [[1, 1], [2, 2]];
        let graph = {};
        createGraph({ graph, element });

        const result = simplifyGraph(graph);
        const expected = [
            { value: 1, level: 2, },
            { value: 1, level: 2, },
            { value: 2, level: 2, },
            { value: 2, level: 2, },
        ];

        expect(result).toEqual(expected);
    });

    it('should not reduce graph 1', () => {
        const element = [[[[1,1],[2,2]],[3,3]],[4,4]];
        let graph = {};
        createGraph({ graph, element });
        reduceGraph(graph);
        graph = simplifyGraph(graph);

        const expected = [
            { value: 1, level: 4 },
            { value: 1, level: 4 },
            { value: 2, level: 4 },
            { value: 2, level: 4 },
            { value: 3, level: 3 },
            { value: 3, level: 3 },
            { value: 4, level: 2 },
            { value: 4, level: 2 },
        ];

        expect(graph).toEqual(expected);
    });

    it('should reduce graph 2', () => {
        const element = [[[[[1,1],[2,2]],[3,3]],[4,4]],[5,5]];
        let graph = {};
        createGraph({ graph, element });
        reduceGraph(graph);
        graph = simplifyGraph(graph);

        const expected = [
            { value: 3, level: 4 },
            { value: 0, level: 4 },
            { value: 5, level: 4 },
            { value: 3, level: 4 },
            { value: 4, level: 3 },
            { value: 4, level: 3 },
            { value: 5, level: 2 },
            { value: 5, level: 2 },
        ];

        expect(graph).toEqual(expected);
    });

    it('should reduce easy graph', () => {
        const element = [13,2];
        let graph = {};
        createGraph({ graph, element });
        reduceGraph(graph);
        graph = simplifyGraph(graph).map(JSON.stringify);

        const expected = [
            { value: 6, level: 2 },
            { value: 7, level: 2 },
            { value: 2, level: 1 },
        ].map(JSON.stringify);

        expect(graph.sort()).toEqual(expected.sort());
    });

    it('should reduce graph 3', () => {
        const element = [[[[[4,3],4],4],[7,[[8,4],9]]],[1,1]];
        let graph = {};
        createGraph({ graph, element });
        reduceGraph(graph);
        graph = simplifyGraph(graph).map(JSON.stringify);

        const expected = [
            { value: 0, level: 4 },
            { value: 7, level: 4 },
            { value: 4, level: 3 },
            { value: 7, level: 4 },
            { value: 8, level: 4 },
            { value: 6, level: 4 },
            { value: 0, level: 4 },
            { value: 8, level: 2 },
            { value: 1, level: 2 },
        ].map(JSON.stringify);

        expect(graph.sort()).toEqual(expected.sort());
    });

    it('should sum easy graphs', () => {
        const element1 = [1,1];
        const element2 = [2,2];
        let graph1 = {};
        let graph2 = {};
        createGraph({ graph: graph1, element: element1 });
        createGraph({ graph: graph2, element: element2 });
        graph1 = sumGraphs(graph1, graph2).graph;
        reduceGraph(graph1);
        const result = simplifyGraph(graph1);

        const expected = [
            { value: 1, level: 2, },
            { value: 1, level: 2, },
            { value: 2, level: 2, },
            { value: 2, level: 2, },
        ];

        expect(result).toEqual(expected);
    });

    it('should sum hard graphs', () => {
        const element1 = [[[[3,0],[5,3]],[4,4]],[5,5]];
        const element2 = [6,6];
        let graph1 = {};
        let graph2 = {};
        createGraph({ graph: graph1, element: element1 });
        createGraph({ graph: graph2, element: element2 });
        graph1 = sumGraphs(graph1, graph2).graph;
        reduceGraph(graph1);
        const result = simplifyGraph(graph1);

        const expected = [
            { value: 5, level: 4, },
            { value: 0, level: 4, },
            { value: 7, level: 4, },
            { value: 4, level: 4, },
            { value: 5, level: 3, },
            { value: 5, level: 3, },
            { value: 6, level: 2, },
            { value: 6, level: 2, },
        ];

        expect(result).toEqual(expected);
    });

    it('should sum harder graphs 1', () => {
        const element1 = [[[[7,7],[7,7]],[[8,7],[8,7]]],[[[7,0],[7,7]],9]];
        const element2 = [[[[4,2],2],6],[8,7]];
        let graph1 = {};
        let graph2 = {};
        createGraph({ graph: graph1, element: element1 });
        createGraph({ graph: graph2, element: element2 });
        graph1 = sumGraphs(graph1, graph2).graph;
        reduceGraph(graph1);
        const result = simplifyGraph(graph1).map(JSON.stringify);
        console.log(result);

        const expected = [
            { value: 8, level: 4, },
            { value: 7, level: 4, },
            { value: 7, level: 4, },
            { value: 7, level: 4, },
            { value: 8, level: 4, },
            { value: 6, level: 4, },
            { value: 7, level: 4, },
            { value: 7, level: 4, },
            { value: 0, level: 4, },
            { value: 7, level: 4, },
            { value: 6, level: 4, },
            { value: 6, level: 4, },
            { value: 8, level: 3, },
            { value: 7, level: 3, },
        ].map(JSON.stringify);

        expect(result.sort()).toEqual(expected.sort());
    });

    it('should sum harder graphs 2', () => {
        const element1 = [[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]];
        const element2 = [7,[[[3,7],[4,3]],[[6,3],[8,8]]]];
        let graph1 = {};
        let graph2 = {};
        createGraph({ graph: graph1, element: element1 });
        createGraph({ graph: graph2, element: element2 });
        graph1 = sumGraphs(graph1, graph2).graph;
        reduceGraph(graph1);
        const result = simplifyGraph(graph1).map(JSON.stringify);
        // console.log(result);

        const expected = [
            { value: 4, level: 4, },
            { value: 0, level: 4, },
            { value: 5, level: 4, },
            { value: 4, level: 4, },
            { value: 7, level: 4, },
            { value: 7, level: 4, },
            { value: 6, level: 4, },
            { value: 0, level: 4, },
            { value: 8, level: 3, },
            { value: 7, level: 4, },
            { value: 7, level: 4, },
            { value: 7, level: 4, },
            { value: 9, level: 4, },
            { value: 5, level: 4, },
            { value: 0, level: 4, },
        ].map(JSON.stringify);

        expect(result.sort()).toEqual(expected.sort());
    });

    const magnitudeTests = [
        [ [[1,2],[[3,4],5]], 143 ],
        [ [[[[0,7],4],[[7,8],[6,0]]],[8,1]], 1384 ],
        [ [[[[1,1],[2,2]],[3,3]],[4,4]], 445 ],
        [ [[[[3,0],[5,3]],[4,4]],[5,5]], 791 ],
        [ [[[[5,0],[7,4]],[5,5]],[6,6]], 1137 ],
        [ [[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]], 3488 ],
    ];

    test.each(magnitudeTests)('Calculates magnitude %s', (input, magnitude) => {
        let graph = {};
        const { id } = createGraph({ graph, element: input });
        const result = getGraphMagnitude(graph, id);

        expect(result).toBe(magnitude);
    });
});

xdescribe('Day 18 A', () => {
    it('should solve example', () => {
        const result = day18A('day18/exampleData');

        expect(result).toBe(4140);
    });

    // it('should solve input', () => {
    //     const result = day18A('day18/inputData');

    //     expect(result).toBe(739);
    // });
});

// describe('Day 18 B', () => {
//     it('should solve example', () => {
//         const result = day18B('day18/exampleData');

//         expect(result).toBe(318);
//     });

//     // it('should solve input', () => {
//     //     const result = day18B('day18/inputData');

//     //     expect(result).toBe(3038);
//     // });
// });
