import { Component, OnInit, ViewContainerRef} from '@angular/core';
// import { Http, Response } from '@angular/http';
import * as d3 from 'd3';
// import  './input.tsv';
// import  './input1.tsv';
// import  './input2.tsv';
// import  './input3.tsv';
// import  './input4.tsv';
// import  './input5.tsv';
// import  './input6.tsv';
// import  './input7.tsv';
// import  './input8.tsv';
// import  './input9.tsv';

@Component({
  selector: 'heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: [ './heatmap.component.css' ]
})
export class HeatmapComponent implements OnInit{
    margin = { top: 50, right: 0, bottom: 100, left: 30 };
   
   
   
    days = [];
    times = [];
    datasets = ["input.tsv", "input1.tsv","input2.tsv","input3.tsv","input4.tsv","input5.tsv",
        "input6.tsv","input7.tsv","input8.tsv","input9.tsv"];

    elem;
    


    constructor(private viewContainerRef: ViewContainerRef){}
    ngOnInit(): void {
      var width = 1960 - this.margin.left - this.margin.right;
      var height = 1960 - this.margin.top - this.margin.bottom;
      var gridSize = Math.floor(width / 100);
      var legendElementWidth = gridSize*2;
        for(let i = 0; i <100; i++)
        {
            this.times.push(i+1);
        }

        for(let j = 0; j < 100; j++) {
            this.days.push(j+1);
        }


        this.elem = this.viewContainerRef.element.nativeElement;

        var svg = d3.select(this.elem).select('#chart').append("svg")
          .attr("width", width + this.margin.left + this.margin.right)
          .attr("height", height + this.margin.top + this.margin.bottom)
          .append("g")
          .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

        var dayLabels = svg.selectAll(".dayLabel")
          .data(this.days)
          .enter().append("text")
            .text(function (d) { return d; })
            .attr("x", 0)
            .attr("y", (d, i) =>{ return i * gridSize; })
            .style("text-anchor", "end")
            .attr("transform", "translate(-6," + gridSize / 1.5 + ")")
            .attr("class", function (d, i) { return ((i >= 0 && i <= 4) ? "dayLabel mono axis axis-workweek" : "dayLabel mono axis"); });

        var timeLabels = svg.selectAll(".timeLabel")
          .data(this.times)
          .enter().append("text")
            .text(function(d) { return d; })
            .attr("x", (d, i) => { return i * gridSize; })
            .attr("y", 0)
            .style("text-anchor", "middle")
            .attr("transform", "translate(" + gridSize / 2 + ", -6)")
            .attr("class", function(d, i) { return ((i >= 7 && i <= 16) ? "timeLabel mono axis axis-worktime" : "timeLabel mono axis"); });

            var buckets = 9;
            var colors = ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"]; // alternatively colorbrewer.YlGnBu[9]
      var heatmapChart = function(tsvFile) {
        d3.tsv(tsvFile,
        (d) => {
          return {
            day: +d.day,
            hour: +d.hour,
            value: +d.value
          };
        },
        (error, data) => {
          var colorScale = d3.scaleQuantile()
              .domain([0, buckets - 1, d3.max(data, function (d) { return d.value; })])
              .range(colors);

          var cards = svg.selectAll(".hour")
              .data(data, function(d) {return d.day+':'+d.hour;});

          cards.append("title");

          cards.enter().append("rect")
              .attr("x", (d) => { return (d.hour - 1) * gridSize; })
              .attr("y", (d) => { return (d.day - 1) * gridSize; })
              .attr("rx", 4)
              .attr("ry", 4)
              .attr("class", "hour bordered")
              .attr("width", gridSize)
              .attr("height", gridSize)
              .style("fill", colors[0])
              .on("click",function(d){
              console.log("start");
              console.log(d.value);
              console.log("end");
            });

          cards.transition().duration(10)
              .style("fill", function(d) { return colorScale(d.value); });

          cards.select("title").text(function(d) { return d.value; });
          
          cards.exit().remove();


          var legend = svg.selectAll(".legend")
              .data([0].concat(colorScale.quantiles()), function(d) { return d; });

          console.log(legend);

          legend.enter().append("g")
              .attr("class", "legend");

          legend.append("rect")
            .attr("x", function(d, i) { return legendElementWidth * i; })
            .attr("y", height)
            .attr("width", legendElementWidth)
            .attr("height", gridSize / 2)
            .style("fill", function(d, i) { 
              return colors[i];
             });

          legend.append("text")
            .attr("class", "mono")
            .text(function(d) { return "≥ " + Math.round(d); })
            .attr("x", function(d, i) { return legendElementWidth * i; })
            .attr("y", height + gridSize);

          legend.exit().remove();

        });  
      };

      heatmapChart('../../../assets/input.tsv');

      // setInterval(()=>{
        
      //   heatmapChart(this.datasets[Math.floor(Math.random()*10)]);
        
      // },10000);
    }
    

     
      

 
  
}
