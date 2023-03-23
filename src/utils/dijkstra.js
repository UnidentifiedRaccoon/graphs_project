export default function dijkstra(graph, startVertex) {

    const distances = [];
    const visited = new Set();
    const previousVertices = [];
    const queue = []

    graph.nodes.forEach(n => {
        distances[n.index] = Infinity;
        previousVertices[n.index] = null;
    });

    distances[startVertex.index] = 0;
    queue.push(startVertex)

    while (queue.length > 0) {
        // Fetch next closest vertex.
        const currentVertex = queue.shift();



        graph.links.filter(l => l.source.index === currentVertex.index)
            .forEach(l => {
                const neighbor =  l.target
                if (!visited.has(neighbor.index)) {
                    const existingDistanceToNeighbor = distances[neighbor.index];
                    const distanceToNeighborFromCurrent = distances[currentVertex.index] + l.weight

                    if (distanceToNeighborFromCurrent < existingDistanceToNeighbor) {
                        distances[neighbor.index] = distanceToNeighborFromCurrent;
                        // reorganize priority
                        previousVertices[neighbor.index] = currentVertex.index;
                    }
                    if (queue.findIndex(x => x.index === neighbor.index) === -1) {
                        queue.push(neighbor);
                    }
                }
            })
        queue.sort((a, b) => distances[a.index] - distances[b.index])


        visited.add(currentVertex.index)
    }

    return [
        distances,
        previousVertices,
    ]
}