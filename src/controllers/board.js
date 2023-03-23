import {Simulation} from "./simulation";
import {graph} from "../events/graph";
import {bfs, distances, visited, visitsOrder} from "../utils/bfs";
import ConnectedComponent from "./algo/ConnectedComponent";
import StronglyConnectedComponent from "./algo/StronglyConnectedComponent";
import Prim from "./algo/Prim";
import Dijkstra from "./algo/Dijkstra";

export default class BoardController {
  constructor(container) {
    this.simultion = new Simulation()
    this.graphData = null;
    this.color = 0;
    this.colors = ["#ffc107", "#6495ED", "#1de9b6", "#DC143C", "#008B8B", "#c4f420", "#9c27b0", "#8561c5", "#607d8b", "#795548", "#FF4081", "#FFCDD2", "#FFD740"]
  }

  render(graphData, algoName) {
    this.graphData = graphData

    console.group("Graph: ")
    console.log(graphData.nodes)
    console.log(graphData.links)
    console.log("isDirected" + " " + graphData.isDirected)
    console.log("hasWeight" + " " + graphData.hasWeight)
    console.groupEnd()

    this.simultion.rerender(graphData)

    // choose algo in input field
    switch (algoName) {
      case "CC":  new ConnectedComponent(this.colors, this.simultion.gNodesSelection).run(graphData); break
      case "SCC":  new StronglyConnectedComponent(this.colors, this.simultion.gNodesSelection).run(graphData); break
      case "prim":  new Prim(this.colors, this.simultion.linksSelection).run(graphData); break
      case "dijkstra":  new Dijkstra(this.colors, this.simultion.linksSelection).run(graphData); break

    }
  }
}
