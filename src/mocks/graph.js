let graphData = {
    nodes: [
        ['v1', 1],
        ['v2', 2],
        ['v3', 3],
        ['v4', 4],
        ['v5', 5],
        ['v6', 6],
        ['v7', 7],
        ['v8', 8],
    ],

    links: [
        [1, 2, 0],
        [2, 1, 0],
        [1, 3, 0],
        [3, 1, 0],
        [4, 5, 0],
        [5, 4, 0],
        [5, 6, 0],
        [6, 5, 0],
        [6, 7, 0],
        [7, 6, 0],
        [7, 8, 0],
        [8, 7, 0],
    ]
};

export const graphData2 = {
    nodes: [
        ['v1', 1],
        ['v2', 2],
        ['v3', 3],
        ['v4', 4],
        ['v5', 5],
        ['v6', 6],
        ['v7', 7],
        ['v8', 8],
        ['v9', 9],
        // ['v10', 10],
        // ['v11', 11],
        ['v12', 12],
        // ['v13', 13],
        ['v14', 14],
        // ['v15', 15],
        // ['v16', 16],
    ],

    links: [
        [1, 2, 0],
        [2, 1, 0],
        [3, 1, 0],
        [4, 6, 0],
        [5, 6, 0],
        [6, 5, 0],
        [7, 6, 0],
        [8, 7, 0],
        [14, 4, 0],
        [14, 12, 0],
        [12, 9, 0],
        [9, 14, 0],
        [8, 3, 0],
        [7, 3, 0],
        [14, 3, 0],
        [3, 9, 0],
    ],

    isDirected: true,
};

export const graphData3 = {
    nodes: [
        ['v1', 1],
        ['v2', 2],
        ['v3', 3],
        ['v4', 4],
        ['v5', 5],
        ['v6', 6],
        ['v7', 7],
        ['v8', 8],
    ],

    links: [
        [1, 2, 5],
        [1, 7, 4],
        [2, 1, 5],
        [2, 6, 2],
        [1, 3, 2],
        [3, 1, 2],
        [3, 8, 1],
        [4, 5, 6],
        [4, 7, 4],
        [5, 4, 6],
        [5, 6, 7],
        [6, 5, 7],
        [6, 2, 2],
        [6, 7, 8],
        [7, 6, 8],
        [7, 1, 4],
        [7, 4, 4],
        [7, 8, 5],
        [8, 7, 5],
        [8, 3, 1],
    ]
}

export const graphData4 = {
    nodes: [
        ["1", 0],
        ["2", 1],
        ["3", 2],
        ["4", 3],
        ["5", 4],
        ["6", 5],
        ["7", 6],
    ],

    links: [
        [0, 1, 2],
        [0, 3, 1],
        [1, 2, 3],
        [2, 5, 1],
        [5, 6, 4],
        [5, 4, 2],
        [4, 1, 1],
        [4, 3, 3],
        [4, 0, 2],
        [2, 4, 3],

        [1, 0, 2],
        [3, 0, 1],
        [2, 1, 3],
        [5, 2, 1],
        [6, 5, 4],
        [4, 5, 2],
        [1, 4, 1],
        [3, 4, 3],
        [0, 4, 2 ],
        [4, 2, 3],

    ]
}

// export const graphData4 = {

//     links: [


//     ],
// }



// Use preParser for parsing data form files
const preParser = () => {}
const postParser = () => {}

export const generateGraph = (n, m, isDirected = false, hasWeight = false) => {
    const graph = {nodes: [], links: [], isDirected, hasWeight}
    if (n === 0) return graph

    for (let i = 0; i < n; i++) {
        graph.nodes.push([i.toString(), i])
    }

    let edgeCount = 0;
    let curNode = 0
    // Проходим по всем уздам 1...n - curNode
    // В случайном порядке берем узел и соединяем с curNode
    // Пока не получим нужное количество связей
    while (edgeCount < m) {

        curNode %= n;
        const newConnectionNode = Math.floor(Math.random() * n)
        // ToDo подумать над ускорением проверки существование связи
        const isNotSameNode = newConnectionNode !== curNode
        const isNotConnected = graph.links.findIndex(link => link[0] === curNode && link[1] === newConnectionNode) === -1

        if (isNotSameNode && isNotConnected) {
            let weight = 0;
            if (hasWeight) weight = Math.floor(Math.random() * 10) + 1
            graph.links.push([curNode, newConnectionNode, weight])
            if (!isDirected) graph.links.push([newConnectionNode, curNode, weight])
            edgeCount++
        }
        curNode++
    }

    return graph
}

export const parseGraph = (data) => {
    const graph = {nodes: [], links: [], isDirected: data.isDirected, hasWeight: data.hasWeight}
    if (data.nodes.length === 0) return graph
    for (let node of data.nodes) {
        graph.nodes.push({name: node[0], id: node[1]})
    }

    let edgeCount = 0;

    for (let sourceNode of graph.nodes) {

        data.links
            .filter(link => link[0] === sourceNode.id)
            .forEach(link => {
                const targetNode = graph.nodes.filter(node => node.id === link[1])[0]
                graph.links.push({
                    source: sourceNode,
                    target: targetNode,
                    id: edgeCount++,
                    weight: link[2]
                })
            })
    }
    return graph
}






