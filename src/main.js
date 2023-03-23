import {generateGraph, graph, graphData2, graphData3, graphData4, parseGraph} from './mocks/graph'
// import {dfs, dfsStack, tout, visited, visitOrder} from "./utils/dfs";
import {transposition} from "./utils/transposition";
import prim from "./utils/prim";
import BoardController from "./controllers/board";
import ConnectedComponent from "./controllers/algo/ConnectedComponent";


const board = new BoardController()
// Initial


// board.render( parseGraph(generateGraph(10, 5)), "CC")
// board.render( parseGraph(graphData2), "SCC")
board.render( parseGraph(graphData4), "dijkstra")

// ToDo create menu class for selection
const selection = document.querySelector("select")
selection.addEventListener("change", (e) => {
    let graph;
    const algoName = e.target.value;
    switch (algoName) {
        case "CC": graph = parseGraph(generateGraph(10, 5)); break
        case "SCC": graph = parseGraph(generateGraph(15, 20, true)); break
        case "prim": graph = parseGraph(generateGraph(10, 12, false, true)); break
        case "dijkstra": graph = parseGraph(generateGraph(10, 12, false, true)); break
    }
    board.render(graph, algoName);

})



























