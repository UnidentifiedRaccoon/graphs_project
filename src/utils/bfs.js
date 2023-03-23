export let visited = new Set()
export let distances = []
export let visitsOrder = []
export let bfsStack = []

export const resetAlgoDerivatives = () => {
    visited = new Set()
    distances = []
    visitsOrder = []
    bfsStack = []
}

export const bfs = function (links, startNode) {
    const queue = [startNode];
    visited.add(startNode);
    let i = 0
    distances[startNode] = 0;
    const order = []
    while (queue.length > 0) {
        let node = queue.shift();
        const distanceFromRoot = distances[node]
        order.push(node)

        links.filter(l => {
                return l.source.index === node
            }
        ).forEach(
            l => {
                let t = l.target.index
                if (!visited.has(t)) {
                    visited.add(t);
                    distances[t] = distances[node] + 1;
                    queue.push(t);
                }
            }
        )
    }
    bfsStack.push(order.reverse())
    visitsOrder.push(order)
};

