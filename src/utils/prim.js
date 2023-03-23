import PriorityQueue from "js-priority-queue"

export default function prim(graph) {
    //  works only for undirected graphs.

    const MST = [];

    const priorityEdgesQueue = new PriorityQueue({ comparator: function(a, b) { return a.weight - b.weight; }});
    const visited = new Set();
    const start = graph.nodes[0];
    visited.add(start.index)
    graph.links.filter(l => l.source.index === start.index).forEach(
        l => priorityEdgesQueue.queue(l)
    )


    while (priorityEdgesQueue.length > 0) {
        const currentMinEdge = priorityEdgesQueue.dequeue();

        // Find out the next unvisited minimal vertex to traverse.
        let nextMinVertex = null;
        // if (!visited.has(currentMinEdge.source.index)) {
        //     nextMinVertex = currentMinEdge.source;
        // else
        if (!visited.has(currentMinEdge.target.index)) {
            nextMinVertex = currentMinEdge.target;
        }

        // If all vertices of current edge has been already visited then skip this round.
        if (nextMinVertex) {
            // Add current min edge to MST.
            MST.push(currentMinEdge);

            // Add vertex to the set of visited ones.
            visited.add(nextMinVertex.index)

            // Add all current vertex's edges to the queue.
            graph.links
                .filter(l => l.source.index === nextMinVertex.index)
                .forEach((l) => {
                // Add only vertices that link to unvisited nodes.
                if (!visited.has(l.source.index) || !visited.has(l.target.index)) {
                    priorityEdgesQueue.queue(l);
                }
            })
        }
    }

    console.log(MST)
    return MST;
}