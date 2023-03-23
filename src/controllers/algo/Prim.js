import prim from "../../utils/prim";

export default class Prim {
    constructor(colors, links) {
        this.color = 0;
        this.colors = colors;
        this.links = links;
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
        this.MST = prim(this.graphData)

    }

    design() {

        for (let edge of this.MST) {

            this.links.filter(l => {
                console.log(edge)

                return  (l.source.index === edge.source.index && l.target.index === edge.target.index)
                   ||   (l.source.index === edge.target.index && l.target.index === edge.source.index)
           })

               .attr("class", "black")
        }
    }



    print() {
        console.group("MST: ")
        console.log(this.MST)
        console.groupEnd()
    }
}
