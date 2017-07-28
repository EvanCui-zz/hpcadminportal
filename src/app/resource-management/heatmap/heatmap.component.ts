import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import * as d3 from 'd3';
import { HttpPrefixService } from '../..//http-prefix.service';
import { ResourceManagementService } from '../resource-management.service';
import { HeatmapItem } from '../heatmap-item';

@Component({
  selector: 'heatmap',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.scss']
})
export class HeatmapComponent implements OnInit {
  resourceUrl: string;
  heatmapData: HeatmapItem[];
  queryString: string;

  margin = { top: 30, right: 16, bottom: 100, left: 16 };
  days = [];
  times = [];
  svg;
  dayLabels;
  timeLabels;
  gridSize = 40;
  height: number;
  cal_width: number;
  legendElementWidth: number;
  chartTitle: string;
  interval;

  drawPannel(size: number) {
    let containerWidth = document.getElementById("chart").clientWidth;
    const containerHeight = document.getElementById("chart").clientHeight;
    d3.select("svg").remove();

    const x_node_num = Math.floor((containerWidth - this.margin.left - this.margin.right) / (this.gridSize + 2));
    const y_node_num = Math.ceil(size / x_node_num);
    // console.log(y_node_num);
    const width = (this.gridSize + 2) * (x_node_num);
    this.height = (this.gridSize + 2) * (y_node_num);
    this.legendElementWidth = this.gridSize * 2;
    this.cal_width = width;


    if (containerHeight < this.height) {
      containerWidth -= 17;
    }
    const g_mgL = (containerWidth - width) / 2;

    this.svg = d3.select("#chart").append("svg")
      .attr("width", containerWidth)
      .attr("height", this.height + this.margin.top + this.margin.bottom)
      .append("g")
      .attr("transform", "translate(" + g_mgL + "," + this.margin.top + ")");

  }

  drawChart(data: any) {

    // // '#e7f2f9','#abd9e9','#74add1','#4575b4','#313695'
    // const colors = ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"]; // alternatively colorbrewer.YlGnBu[9]
    // const colors = ["#E3F2FD", "#BBDEFB", "#90CAF9", "#64B5F6", "#42A5F5", "#2196F3", "#1E88E5", "#1976D2", "#1565C0"];
    const colors = ["#E1F5FE", "#B3E5FC", "#81D4FA", "#EF5350", "#4FC3F7", "#29B6F6", "#03A9F4", "#039BE5", "#0288D1", "#0277BD", "#01579B"];
    const buckets = colors.length;

    const svg = this.svg;
    const gridSize = this.gridSize;
    const height = this.height;
    const legendElementWidth = this.legendElementWidth;
    const cal_width = this.cal_width;

    const div = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    const heatmapChart = function (data) {
      d3.json(data, (error, data) => {

        const colorScale = d3.scaleQuantile()
          .domain([0, 100])
          .range(colors);

        const cards = svg.selectAll(".node")
          .data(data, (d, index) => {
            return index;
          });



        const rect = cards.enter().append("rect");

        rect.attr("x", (d, index) => {
          return ((index) * (gridSize + 2)) % cal_width;
        })
          .attr("y", (d, index) => Math.floor(index * (gridSize+2) / cal_width) * (gridSize+2) + gridSize +18)
          // .attr("cx", (d) => (d.hour - 1) * gridSize)
          // .attr("cy", (d) => (d.day - 1) * gridSize)
          // .attr("r", 13)
          .attr("rx", 5)
          .attr("ry", 5)
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
            let usage = (d.value).toFixed(1) + '%';
            let nodeName = d.nodeName;
            let showContent = "<div class='nodeName'>" + nodeName + "</div>" + usage;
            div.html(showContent)
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

        legend_g.append("rect").attr("x", (d, i) => (cal_width - buckets * legendElementWidth) - legendElementWidth * i)
          .attr("y", 0)
          .attr("width", legendElementWidth)
          .attr("height", gridSize / 2)
          .style("fill", (d, i) => colors[i]);

        legend_g.append("text")
          .attr("class", "mono")
          .text((d) => {
            return "≥ " + Math.round(d) + "%"
          })
          .attr("x", (d, i) => (cal_width - buckets * legendElementWidth) - legendElementWidth * (i-1/2))
          .attr("y", gridSize);

        legend.exit().remove();
      });
    };

    return heatmapChart;

  }

  constructor(
    private resourceManagementService: ResourceManagementService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }



  ngOnInit(): void {
    const datasets = ["input1", "input2", "input3", "input4", "input5",
      "input6", "input7", "input8", "input9"];

    this.chartTitle = "CPU Usage (%)";
    this.drawPannel(300);
    var testFunc = this.drawChart('../../../assets/input1.json');
    testFunc('../../../assets/input1.json');
     this.interval = setInterval(() => {
        testFunc("../../../assets/"+datasets[Math.floor(Math.random()*(9-1)+1)]+ ".json") ;
      }, 10000);


    // this.route.paramMap
    //   .switchMap((params: ParamMap) => {
    //     // let queryString = params.get('filterKey');
    //     this.queryString = params.get('filterKey');
    //     if (params.get('filterDetail') !== 'all') {
    //       this.queryString = params.get('filterKey') + "=" + params.get('filterDetail');
    //     }

    //     return this.resourceManagementService.getHeatmapInfo(this.queryString + "&aliases=HPCCpuUsage");
    //   })
    //   .subscribe(data => {
    //     this.heatmapData = data;
    //     if (data.length > 0) {
    //       this.chartTitle = data[0].displayName;
    //       this.drawPannel(data.length);
    //     }
    //     else {
    //       this.drawPannel(0);
    //     }

    //     var testFunc = this.drawChart(data);
    //     testFunc(data);

    //     if (this.interval) {
    //       clearInterval(this.interval);
    //     }

    //     this.interval = setInterval(() => {
    //       this.resourceManagementService.getHeatmapInfo(this.queryString + "&aliases=HPCCpuUsage").then((data) => {
    //         this.heatmapData = data;
    //         var testFunc = this.drawChart(data);
    //         testFunc(data);
    //       });
    //     }, 10000);

    //   });


    //  this.interval = setInterval(() => {
    //     testFunc("../../../assets/input"+Math.random()*10+'.json');
    //   }, 10000);



  }


  ngOnDestroy() {
    if (this.interval) {
      console.log(this.interval);
      clearInterval(this.interval);
    }
  }


}


