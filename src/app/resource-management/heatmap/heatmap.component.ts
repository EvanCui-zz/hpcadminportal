import { Component, OnInit, ViewEncapsulation} from '@angular/core';
// import { Http, Response } from '@angular/http';
import * as d3 from 'd3';

@Component({
  selector: 'heatmap',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './heatmap.component.html',
  styleUrls: [ './heatmap.component.css' ]
})
export class HeatmapComponent implements OnInit{
    margin = { top: 60, right: 0, bottom: 100, left: 60 };
    days = [];
    times = [];
    svg;
    dayLabels;
    timeLabels;
    gridSize: number;
    height: number;
    legendElementWidth: number;

    drawPannel(size: number){
      d3.select("svg").remove();
      const node_num = Math.ceil(Math.sqrt(size));
      this.gridSize = 40;
      const width = this.gridSize * (node_num + 2) > this.gridSize*2*9 ? this.gridSize* (node_num+2) : this.gridSize*2*9;
      this.height = this.gridSize * (node_num + 2);
      this.legendElementWidth = this.gridSize*2;

        for(let i = 0; i <node_num; i++)
        {
            this.times.push(i+1);
        }

        for(let j = 0; j < node_num; j++) {
            this.days.push(j+1);
        }

        this.svg = d3.select("#chart").append("svg")
          .attr("width", width + this.margin.left + this.margin.right)
          .attr("height", this.height + this.margin.top + this.margin.bottom)
          .append("g")
          .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

        // this.dayLabels = this.svg.selectAll(".dayLabel")
        //   .data(this.days)
        //   .enter().append("text")
        //     .text(function (d) { return d; })
        //     .attr("x", 0)
        //     .attr("y", (d, i) => i * this.gridSize)
        //     .style("text-anchor", "end")
        //     .attr("transform", "translate(-6," + this.gridSize / 1.5 + ")")
        //     .attr("class", (d, i) => ((i >= 0 && i <= 4) ? "dayLabel mono axis axis-workweek" : "dayLabel mono axis"));

        //  this.timeLabels = this.svg.selectAll(".timeLabel")
        //   .data(this.times)
        //   .enter().append("text")
        //     .text((d) => d)
        //     .attr("x", (d, i) => i * this.gridSize)
        //     .attr("y", 0)
        //     .style("text-anchor", "middle")
        //     .attr("transform", "translate(" + this.gridSize / 2 + ", -6)")
        //     .attr("class", (d, i) => ((i >= 7 && i <= 16) ? "timeLabel mono axis axis-worktime" : "timeLabel mono axis"));
    }
    
    drawChart(data: any){
 
      const buckets = 9;
      // // '#e7f2f9','#abd9e9','#74add1','#4575b4','#313695'
      const colors = ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"]; // alternatively colorbrewer.YlGnBu[9]

   
      const svg = this.svg;
      const gridSize = this.gridSize;
      const height = this.height;
      const legendElementWidth = this.legendElementWidth;

      const type = (d) => {
        return {
          day: +d.day,
          hour: +d.hour,
          value: +d.value
        };
      };

      const div = d3.select("body").append("div")	
      .attr("class", "tooltip")				
      .style("opacity", 0);

      const heatmapChart = function(tsvFile) {
        d3.tsv(tsvFile, type, (error, data) => {
          const colorScale = d3.scaleQuantile()
            .domain([0, buckets - 1, d3.max(data, (d) => d.value)])
            .range(colors);
         
          const cards = svg.selectAll(".node")
              .data(data, (d) => { return d.day+':'+d.hour;});
          
        

          const rect = cards.enter().append("rect");

          rect.attr("x", (d) => (d.hour - 1) * gridSize)
              .attr("y", (d) => (d.day - 1) * gridSize)
              .attr("rx", 4)
              .attr("ry", 4)
              .attr("class", "node bordered")
              .attr("width", gridSize)
              .attr("height", gridSize)
              .style("fill", colors[0])
              .on("click", function(d){
                console.log(d.value);
               
              })
              .on("mouseover",function(d){
                div.transition()		
                .duration(200)		
                .style("opacity", .9);		
                div.html(d.value)	
                .style("left", (d3.event.pageX) + "px")		
                .style("top", (d3.event.pageY - 28) + "px");	
              })
              .on("mousemove",function(d){
                div.transition()		
                .duration(200)		
                .style("opacity", .9);		
                div	.html(d.value)	
                .style("left", (d3.event.pageX) + "px")		
                .style("top", (d3.event.pageY - 28) + "px");	
              })
              .on("mouseout",function(){
                // return tooltip.style("visibility","hidden");
                div.transition()		
                .duration(500)		
                .style("opacity", 0);	
              })
              .merge(cards)
              .transition()
              .duration(300)
              .style("fill", (d) => colorScale(d.value));

          cards.exit().remove();

          const legend = svg.selectAll(".legend")
              .data([0].concat(colorScale.quantiles()), (d) => { return d});

          const legend_g = legend.enter().append("g")
              .attr("class", "legend");

          legend_g.append("rect").attr("x", (d, i) => legendElementWidth * i)
            .attr("y", height)
            .attr("width", legendElementWidth)
            .attr("height", gridSize / 2)
            .style("fill", (d, i) => colors[i]);

          legend_g.append("text")
            .attr("class", "mono")
            .text((d) =>{ 
             return  "≥ " + Math.round(d)
            })
            .attr("x", (d, i) => legendElementWidth * i)
            .attr("y", height + gridSize);

          legend.exit().remove();
        });
      };

      const datasets = ["input1.tsv","input2.tsv","input3.tsv","input4.tsv","input5.tsv",
        "input6.tsv","input7.tsv","input8.tsv","input9.tsv"];

        return heatmapChart;

    }


    // constructor(private viewContainerRef: ViewContainerRef){}
    ngOnInit(): void {
      const datasets = ["input1.tsv","input2.tsv","input3.tsv","input4.tsv","input5.tsv",
        "input6.tsv","input7.tsv","input8.tsv","input9.tsv"];
      this.drawPannel(100);
      var testFunc = this.drawChart('../../../assets/input1.tsv');
      testFunc('../../../assets/input1.tsv');
    
      setInterval(()=>{   
        testFunc('../../../assets/'+datasets[Math.floor(Math.random()*(9-1)+1)]);
      },10000);
      
    }
  
}
