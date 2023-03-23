// // get the data
// d3.csv("force.csv", function(error, links) {
//
//     var nodes = {};
//
// // Compute the distinct nodes from the links.
//     links.forEach(function (link) {
//         link.source = nodes[link.source] ||
//             (nodes[link.source] = {name: link.source});
//         link.target = nodes[link.target] ||
//             (nodes[link.target] = {name: link.target});
//         link.value = +link.value;
//     });
// });
//


let mock = {
    v1: ['v2', 'v3'],
    v2: ['v1'],
    v3: ['v1'],
    v4: ['v5'],
    v5: ['v4', 'v6'],
    v6: ['v5', 'v7'],
    v7: ['v6', 'v8'],
    v8: ['v7'],
};

let mock2 = {
    v1: ['v2'],
    v2: [],
    v3: ['v1'],
    v4: ['v5'],
    v5: [],
    v6: ['v5', 'v7'],
    v7: [],
    v8: ['v7'],
};

let bigMock = [
    [0, [12, 14]],
    [1, [11]],
    [2, [12, 5]],
    [3, [12, 2]],
    [4, [14, 0]],
    [5, [12]],
    [6, [4]],
    [7, []],
    [8, [7]],
    [9, [6, 10]],
    [10, [9]],
    [11, [0]],
    [12, [13, 3]],
    [13, [6]],
    [14, [4]],
    [15, [16]],
    [16, [15]],
]



let generateGraph = (n, m, isDirected = false, withWeight = false) => {
    if (n === 0) return new Map()
    const map = new Map()
    for (let i = 0; i < n; i++) {
        map.set(i, [])
    }

    let edgeCount = 0;
    let curNode = 0
    // Проходим по всем уздам 1...n - curNode
    // В случайном порядке берем узел и соединяем с curNode
    // Пока не получим нужное количество связей
    while (edgeCount < m) {
        const newConnectionNode = Math.floor(Math.random() * n)
        const isSameNode = newConnectionNode === curNode % n
        const isAlreadyConnected = map.get(curNode % n).includes(newConnectionNode)
        if (!isSameNode && !isAlreadyConnected) {
            const curNodeConnections = map.get(curNode % n)
            map.set(curNode % n, [...curNodeConnections, newConnectionNode])

            if (!isDirected) {
                const newConnectionNodeConnections = map.get(newConnectionNode)
                map.set(newConnectionNode, [...newConnectionNodeConnections, curNode % n])
            }

            edgeCount++
        }
        curNode++
    }
    return map
}


let parseGraph = (mock) => {
    /**
     * @param {JSON} mock - list of connections
     */
    const map = new Map(Object.entries(mock)); // makes mock iterable
    let id = 0
    let graph = { nodes: [], links: []}
    for (let node of map.keys()) {
        graph.nodes.push({ name: node, id: id++})
    }

    let edgeCount = 0;

    for (let sourceNode of graph.nodes) {
        const value = map.get(sourceNode.name)
        value.forEach(targetName => graph.nodes
            .filter(n => n.name == targetName)
            .forEach(targetNode =>
                graph.links.push({
                        source: sourceNode,
                        target: targetNode,
                        id: edgeCount++
                })))
    }

    return graph
}


let generatePrimGraph = (n, m) => {
    let id = 0
    let graph = {nodes: [], links: []}
    for (let i = 0; i < n; i++) {
        graph.nodes.push({name: i, id: id++})
    }

    let curNode = 0
    let linkId = 0;
    let edgeCount = 0;
    while (edgeCount < m) {
        const newConnectionNode = Math.floor(Math.random() * n)
        const isSameNode = newConnectionNode === curNode % n

        // console.log([...graph.links])
        function find(l) {
            return l.source.id === curNode % n && l.target.id === newConnectionNode
        }
        const isAlreadyConnected = graph.links.findIndex(find) !== -1
        if (!isSameNode && !isAlreadyConnected) {
            const randomWeight = Math.ceil(Math.random() * n)
            graph.links.push({source: graph.nodes[curNode % n], target: graph.nodes[newConnectionNode], id: linkId++, weight: randomWeight})
            graph.links.push({source:  graph.nodes[newConnectionNode], target: graph.nodes[curNode % n], id: linkId++, weight: randomWeight})
            edgeCount++;
        }
        curNode++
    }

    return graph
}

// - arbitrary vertex content
export const graph = parseGraph(mock)
// - random generation
// export const graph = parseGraph(Object.fromEntries(generateGraph(15, 10)))
// export const graph = parseGraph(mock2) - arbitrary vertex content
// - random generation
// use big data
// export const graph = parseGraph(Object.fromEntries(bigMock))

// ToDo prim - algo graphs
// export const graph = generatePrimGraph(10, 12);


