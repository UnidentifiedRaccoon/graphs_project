import prim from "../../utils/prim";
import {distances} from "../../utils/bfs";
import dijkstra from "../../utils/dijkstra";

export default class Dijkstra {
    constructor(colors, gNodes) {
        this.color = 0;
        this.colors = colors;
        this.gNodes = gNodes;
        this.graphData = null;
    }

    run(graphData) {
        this.graphData = graphData
        // ToDo подумать нужно ли обнуление производных данных получ в результате выполнения алгоритма
        // resetAlgoDerivatives()
        this.algo()
        this.design()
        this.print()
    }

    algo() {
        const [dist, prev] = dijkstra(this.graphData, this.graphData.nodes[0])
        this.distances = dist
        this.previous = prev
    }

    design() {
        // for (let edge of this.MST) {
        //    this.links.filter(l =>
        //            (l.source.id === edge.source.id && l.target.id === edge.target.id)
        //            ||   (l.source.id === edge.target.id && l.target.id === edge.source.id))
        //        .attr("class", "black")
        // }
    }



    print() {
        console.group("Distances: ")
        console.log(this.distances)
        console.groupEnd()
        console.group("Previous nodes: ")
        console.log(this.previous)
        console.groupEnd()
    }
}
