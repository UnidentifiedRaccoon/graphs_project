import {graph} from "./graph";
import {bfs} from "../utils/bfs";

let oldVisited = new Set()
let oldDistances = []
// orange, blue, teal, red
let colors = ["#ffc107", "#2979ff", "#1de9b6", "#1de9b6"]
let color = 0;
let shift = 500;

for (let x of graph.adjacency_list.keys()) {
    (function() {
        setTimeout(() => {
            if (!oldVisited.has(x)) {
                let [newVisited, newDistances] = bfs(graph.adjacency_list, x)
                oldVisited = new Set([...oldVisited, ...newVisited])
                oldDistances = [...oldDistances, ...newDistances]
                simulation.nodes.filter(x => newVisited.has(x.name)).attr("fill", colors[color])
                color++
            }
        }, shift )
    })()
    shift +=500
}