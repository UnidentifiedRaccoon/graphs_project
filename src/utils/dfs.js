
export let dfsStack = []
export let visited = new Set()
export let visitOrder = [];
let distances = [];

export const resetAlgoDerivatives = () => {
    dfsStack = []
    visited = new Set()
    visitOrder = []
    distances = []
}

// const visitsOrder = []; - use for(v of visited) instead
export const dfs = function (links, node) {

    if (!visited.has(node)) {
        visited.add(node)
        visitOrder.push(node)
        links.filter(l => {
                return l.source.index === node
            }
        ).forEach(
            l => {
                dfs(links, l.target.index)
            }
        )
        visitOrder.push(node)
        dfsStack.push(node)
    }

};


