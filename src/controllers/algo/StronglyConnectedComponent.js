import {dfs, dfsStack, resetAlgoDerivatives, visited, visitOrder} from "../../utils/dfs";
import {visited as bfsVisited, resetAlgoDerivatives as bfsResetAlgoDerivatives, bfsStack} from "../../utils/bfs";
import {transposition} from "../../utils/transposition";
import {bfs} from "../../utils/bfs";

export default class StronglyConnectedComponent {
    constructor(colors, gNodes) {
        this.color = 0;
        this.colors = colors;
        this.gNodes = gNodes;
        this.graphData = null;

        this.components = null
    }

    run(graphData) {
        console.log(graphData)
        this.graphData = graphData
        resetAlgoDerivatives()
        bfsResetAlgoDerivatives()
        for (let node of this.graphData.nodes) {
            if (!visited.has(node.index)) {
                dfs(this.graphData.links, node.index)
            }
        }
        this.stack = [...dfsStack ]
        this.algo()
        this.design()
        this.print()
    }

    algo() {
        for (let node of this.graphData.nodes) {
            if (!visited.has(node.index)) {
                bfs(this.graphData.links, node.index)
            }
        }

        this.reversedLinks = transposition(this.graphData.links)
        this.bfsstack = [...bfsStack]
        console.log(this.stack)

        this.innerDfs()
        this.innerBfs()

    }

    innerBfs() {
        this.components = []
        visited.clear()
        this.used = new Set()
        let tmpStack = [...this.stack]
        while (tmpStack.length > 0) {
            const node = tmpStack.pop()
            let SCC;
            bfs(this.reversedLinks, node)
            SCC = Array.from(bfsVisited).filter(x => !this.used.has(x))
            tmpStack = tmpStack.filter(x => !this.used.has(x) && !bfsVisited.has(x))
            this.components.push(SCC)
            for (let v of bfsVisited) {
                this.used.add(v)
            }
            bfsVisited.clear()
        }
        console.log("bfs")
        console.log(...this.components)
        // console.log(this.bfsstack)
    }

    innerDfs() {
        this.components = []
        visited.clear()
        this.used = new Set()
        let tmpStack = [...this.stack]

        while (tmpStack.length > 0) {
            const node = tmpStack.pop()
            let SCC;
            dfs(this.reversedLinks, node)
            SCC = Array.from(visited).filter(x => !this.used.has(x))
            tmpStack = tmpStack.filter(x => !visited.has(x))
            this.components.push(SCC)
            for (let v of visited) {
                this.used.add(v)
            }
            visited.clear()
        }
        console.log("dfs")
        console.log(...this.components)
    }

    design() {
        this.components.forEach(component => {
            component.forEach(node =>
                this.gNodes
                    .filter(n => n.index === node)
                    .select("circle")
                    .attr("fill", this.colors[this.color])
            )
            this.color++
        })
    }


    print() {
        console.group("Components: ")
        console.log(this.components)
        console.groupEnd()
        console.group("visitOrder: ")
        console.log(...visitOrder)
        console.groupEnd()
    }
}
