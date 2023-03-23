
export class Simulation {
    constructor() {
        this.svgWidth = window.innerWidth * 0.8;
        this.svgHeight = window.innerHeight
        this.svgSelection = d3.select('svg')
            .attr('width', this.svgWidth)
            .attr('height', this.svgHeight);
        this.graphData = null;
        this.nodesSelection = null;
        this.textsSelection = null;
        this.gNodesSelection = null;
        this.arrowsSelection = null;
        this.lineSelection = null;
        // this.nodeGroup = null;
        // this.lineGroup = null;


        // Forces
        this.collideForce = d3
            .forceCollide()
            .radius(this.svgWidth*0.02)

        this.drag =  d3
            .drag()
            .on("start", this._dragstarted.bind(this))
            .on("drag", this._dragged.bind(this))
            .on("end", this._dragended.bind(this))
    }

    rerender(graphData) {
        this.graphData = graphData
        this._rerunSimulation()
        if (this.graphData.isDirected) {
            this._rerenderArrows()
        } else {
            this._rerenderLinks()
        }
        this._rerenderGNodes()
     }



    _rerunSimulation() {
        this.linkForce = d3
            .forceLink(this.graphData.links)
            .id(function(d) {
                return d.id;
            })
            .distance(this.svgWidth * 0.1)



        this.simulation = d3
            .forceSimulation(this.graphData.nodes)
            .force(
                "link", this.linkForce
            )
            .force('collide', this.collideForce)

            .force("charge", d3.forceManyBody().strength(-400).distanceMax(200))
            .force("center", d3.forceCenter(this.svgWidth / 2, this.svgHeight / 2))


        if (this.graphData.isDirected) {
            this.simulation.on("tick", this._tickDirected.bind(this));
        } else {
            this.simulation.on("tick", this._tick.bind(this));
        }

    }

    _rerenderLinks() {
        this.svgSelection.select(".links").remove()
        this.linksSelection = this.svgSelection
            .append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(this.graphData.links)
            .enter()
            .append("line")
            .attr("class", "line")
            .attr("stroke-width", this.svgWidth * 0.003)

        this.labelsSelection = this.svgSelection.select(".links")
            .selectAll("text")
            .data(this.graphData.links)
            .enter()
            .filter(d => d.weight !== 0)
            .append("text")
            .text(d => d.weight)

    }

    _rerenderArrows() {
        this.svgSelection.select("defs").remove()
        this.svgSelection.select(".links").remove()


        // build the arrow marker.
        this.svgSelection.append("svg:defs")
            .selectAll("marker")
            .data(["end"])      // Different link/path types can be defined here
            .enter().append("svg:marker")    // This section adds in the arrows
            .attr("id", String)
            .attr("viewBox", "0 0 20 20")
            .attr("refX", 0)
            .attr("refY", 5)
            .attr("markerWidth", 20)
            .attr("markerHeight", 20)
            .attr("orient", "auto")
            .append("svg:path")
            .attr("d", "M0,0L10,5L0,10")
            // .attr('transform', `rotate(-1 0 0)`)

// add the links and the arrows
        this.arrowsSelection = this.svgSelection
            .append("g")
            .attr("class", "links")
            .selectAll("path")
            .data(this.graphData.links)
            .enter()
            .append("svg:path")
            //    .attr("class", function(d) { return "link " + d.type; })
            .attr("class", "arrow")
            .attr("marker-end", "url(#end)");
    }

    _rerenderGNodes() {
        this.svgSelection.selectAll(".gNodes").remove()
        this.gNodesSelection = this.svgSelection
            .append("g")
            .attr("class", "gNodes")
            .selectAll("g")
            .data(this.graphData.nodes)
            .enter()
            .append("g")
            .attr("class", "gNode")
            .call(this.drag)


        this.gNodesSelection
            .append("circle")
            .attr("class", "node")
            .attr("r", this.svgWidth * 0.03)
            .attr("fill", "#c9c9c9")

        this.gNodesSelection
            .append("text")
            .attr("class", "text")
            .text(x => x.name)
    }

    _tick () {
        this.gNodesSelection
            .attr("transform", d => "translate(" + d.x + ", " + d.y + ")" )

        this.linksSelection
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y)

        this.labelsSelection
            .attr("x", d => (d.source.x + d.target.x) / 2)
            .attr("y", d => (d.source.y + d.target.y) / 2)
    }

    _tickDirected() {
        this.gNodesSelection
            .attr("transform", d => "translate(" + d.x + ", " + d.y + ")" )
        let svgWidth = this.svgWidth

        this.arrowsSelection.attr("d", function(d) {
            var dx = d.target.x - d.source.x,
                dy = d.target.y - d.source.y,
                dr = Math.sqrt(dx * dx + dy * dy);

            return `M${d.source.x}, ${d.source.y} A${dr}, ${dr} 0 0,1 ${d.target.x}, ${d.target.y}`
        });

        this.arrowsSelection.attr("d", function(d) {
            var pl = this.getTotalLength(),
                r = svgWidth*0.03 + svgWidth * 0.006+10, // radius + stroke width* + marker size
                m = this.getPointAtLength(pl - r),
                n = this.getPointAtLength(r/2);
            // ToDo refactor n - source coordinate should point ad nods`s border

            var dx = m.x - d.source.x,
                dy = m.y - d.source.y,
                dr = Math.sqrt(dx * dx + dy * dy);

            return `M${n.x}, ${n.y} A${dr}, ${dr} 0 0,1 ${m.x}, ${m.y}`
        });


    }

    _dragstarted(d) {
        if (!d3.event.active) this.simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    _dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    _dragended(d) {
        if (!d3.event.active) this.simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }

}
