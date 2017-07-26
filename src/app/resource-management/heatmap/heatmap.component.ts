import { Component, OnInit, ViewEncapsulation } from '@angular/core';
// import { Http, Response } from '@angular/http';
import * as d3 from 'd3';

@Component({
  selector: 'heatmap',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.scss']
})
export class HeatmapComponent implements OnInit {
  margin = { top: 30, right: 15, bottom: 100, left: 15 };
  days = [];
  times = [];
  svg;
  dayLabels;
  timeLabels;
  gridSize = 30;
  height: number;
  cal_width: number;
  legendElementWidth: number;

  drawPannel(size: number) {
    const containerWidth = document.getElementById("chart").offsetWidth;
    console.log(document.getElementById("chart").offsetWidth);
    d3.select("svg").remove();

    const x_node_num = Math.floor((containerWidth - this.margin.left - this.margin.right) / this.gridSize);
    // console.log(x_node_num);
    const y_node_num = Math.ceil(size / x_node_num);
    // console.log(y_node_num);
    const width = this.gridSize * (x_node_num);
    this.height = this.gridSize * (y_node_num);
    this.legendElementWidth = this.gridSize * 2;
    this.cal_width = width;
    const g_mgL = (containerWidth - width) / 2;




    this.svg = d3.select("#chart").append("svg")
      .attr("width", containerWidth)
      .attr("height", this.height + this.margin.top + this.margin.bottom)
      .append("g")
      .attr("transform", "translate(" + g_mgL + "," + this.margin.top + ")");

  }

  drawChart(data: any) {

    const buckets = 6;
    // // '#e7f2f9','#abd9e9','#74add1','#4575b4','#313695'
    // const colors = ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"]; // alternatively colorbrewer.YlGnBu[9]
    // const colors = ["#E3F2FD", "#BBDEFB", "#90CAF9", "#64B5F6", "#42A5F5", "#2196F3", "#1E88E5", "#1976D2", "#1565C0"];
    const colors = ["#E1F5FE", "#81D4FA", "#4FC3F7", "#1E88E5", "#1565C0", "#0D47A1"];

    const svg = this.svg;
    const gridSize = this.gridSize;
    const height = this.height;
    const legendElementWidth = this.legendElementWidth;
    const cal_width = this.cal_width;

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

    const heatmapChart = function (jsonFile) {
      d3.json(jsonFile, (error, data) => {

        const colorScale = d3.scaleQuantile()
          .domain([0, buckets - 1, d3.max(data, (d) => d.value)])
          .range(colors);

        const cards = svg.selectAll(".node")
          .data(data, (d, index) => {
            return index;
          });



        const rect = cards.enter().append("rect");

        console.log(cal_width);
        rect.attr("x", (d, index) => {
          console.log((index * gridSize) % cal_width);
          return ((index) * gridSize) % cal_width;
        })
          .attr("y", (d, index) => Math.floor(((index) * gridSize) / cal_width) * gridSize)
          // .attr("cx", (d) => (d.hour - 1) * gridSize)
          // .attr("cy", (d) => (d.day - 1) * gridSize)
          // .attr("r", 13)
          .attr("rx", 0)
          .attr("ry", 0)
          .attr("class", "node bordered")
          .attr("width", gridSize)
          .attr("height", gridSize)
          .style("fill", colors[0])
          .on("click", function (d) {
            console.log(d.value);

          })
          .on("mouseover", function (d) {
            div.transition()
              .duration(200)
              .style("opacity", .9);
            div.html(d.value)
              .style("left", (d3.event.pageX) + "px")
              .style("top", (d3.event.pageY - 28) + "px");
          })
          .on("mousemove", function (d) {
            div.transition()
              .duration(200)
              .style("opacity", .9);
            div.html(d.value)
              .style("left", (d3.event.pageX) + "px")
              .style("top", (d3.event.pageY - 28) + "px");
          })
          .on("mouseout", function () {
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
          .data([0].concat(colorScale.quantiles()), (d) => { return d });

        const legend_g = legend.enter().append("g")
          .attr("class", "legend");

        legend_g.append("rect").attr("x", (d, i) => legendElementWidth * i)
          .attr("y", height)
          .attr("width", legendElementWidth)
          .attr("height", gridSize / 2)
          .style("fill", (d, i) => colors[i]);

        legend_g.append("text")
          .attr("class", "mono")
          .text((d) => {
            return "≥ " + Math.round(d)
          })
          .attr("x", (d, i) => legendElementWidth * i)
          .attr("y", height + gridSize);

        legend.exit().remove();
      });
    };

    const datasets = ["input1.tsv", "input2.tsv", "input3.tsv", "input4.tsv", "input5.tsv",
      "input6.tsv", "input7.tsv", "input8.tsv", "input9.tsv"];

    return heatmapChart;

  }


  // constructor(private viewContainerRef: ViewContainerRef){}
  ngOnInit(): void {
    const datasets = ["input1.tsv", "input2.tsv", "input3.tsv", "input4.tsv", "input5.tsv",
      "input6.tsv", "input7.tsv", "input8.tsv", "input9.tsv"];
    this.drawPannel(100);
    var testFunc = this.drawChart('../../../assets/input1.tsv');
    testFunc('../../../assets/input1.json');

    // setInterval(()=>{   
    //   testFunc('../../../assets/'+datasets[Math.floor(Math.random()*(9-1)+1)]);
    // },10000);

  }

}
