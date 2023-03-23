import {bfs, distances, resetAlgoDerivatives, visited, visitsOrder} from "../../utils/bfs";

export default class ConnectedComponent {
    constructor(colors, gNodes) {
        this.color = 0;
        this.colors = colors;
        this.gNodes = gNodes;
        this.graphData = null;
    }

    run(graphData) {
        this.graphData = graphData
        resetAlgoDerivatives()
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
    }

    design() {
        this.stepBtn = document.querySelector(".js-step")
        // dirty event listeners removing
        const stepBtnCopy = this.stepBtn.cloneNode(true)
        this.stepBtn.replaceWith(stepBtnCopy)
        this.stepBtn = stepBtnCopy
        console.group("Connected components: ")
        console.log("components count: " + visitsOrder.length)
        console.log(...visitsOrder)
        console.groupEnd()
        this.connectedComponentNodesInSearchOrder = visitsOrder.shift()
        this.designHandler = this._designHandler.bind(this)

        this.stepBtn.addEventListener("click", this.designHandler)
    }

    _designHandler() {
        if (this.connectedComponentNodesInSearchOrder.length > 0) {
            const node = this.connectedComponentNodesInSearchOrder.shift()
            this.gNodes.filter(n => n.index === node).select("circle").attr("fill", this.colors[this.color])
        } else {
            if (visitsOrder.length > 0) {
                this.color++
                this.connectedComponentNodesInSearchOrder = visitsOrder.shift()
            } else {
                this.stepBtn.removeEventListener("click", this.designHandler)
                console.log("finish decoration")
            }
        }
    }

    print() {
        console.group("Bfs results: ")
        console.log(visited)
        console.log(distances)
        console.groupEnd()
    }
}
