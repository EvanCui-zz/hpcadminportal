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
  gridSize = 40;
  height: number;
  cal_width: number;
  legendElementWidth: number;
  chartTitle: string;
  interval;
  blockSize = this.gridSize + 2;

  drawPannel(size: number) {
    let containerWidth = document.getElementById("chart").clientWidth;
    const containerHeight = document.getElementById("chart").clientHeight;
    d3.select("svg").remove();

    const x_node_num = Math.floor((containerWidth - this.margin.left - this.margin.right) / this.blockSize);
    const y_node_num = Math.ceil(size / x_node_num);
    // console.log(y_node_num);
    const width = (this.blockSize) * (x_node_num);
    this.height = (this.blockSize) * (y_node_num);
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
      .attr("transform", "translate(" + g_mgL + "," + 0 + ")");

  }

  drawChart(data: any) {

    // // '#e7f2f9','#abd9e9','#74add1','#4575b4','#313695'
    // const colors = ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"]; // alternatively colorbrewer.YlGnBu[9]
    // const colors = ["#E3F2FD", "#BBDEFB", "#90CAF9", "#64B5F6", "#42A5F5", "#2196F3", "#1E88E5", "#1976D2", "#1565C0"];
    const colors = ["#E1F5FE", "#B3E5FC", "#81D4FA", "#4FC3F7", "#29B6F6", "#03A9F4", "#039BE5", "#0288D1", "#0277BD", "#01579B"];
    const errorColors = ["#FFEBEE", "#FFCDD2", "#EF9A9A", "#E57373", "#EF5350", "#F44336", "#E53935", "#D32F2F", "#C62828", "#B71C1C"];
    const buckets = colors.length;

    const svg = this.svg;
    const gridSize = this.gridSize;
    const blockSize = this.blockSize;
    const height = this.height;
    const legendElementWidth = this.legendElementWidth;
    const cal_width = this.cal_width;

    const div = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    const heatmapChart = function (data) {
      // d3.json(data, (error, data) => {

      const colorScale = d3.scaleQuantile()
        .domain([0, 100])
        .range(colors);

      const errorColorScale = d3.scaleQuantile()
        .domain([0, 100])
        .range(errorColors);

      const cards = svg.selectAll(".node")
        .data(data, (d, index) => {
          return index;
        });



      const rect = cards.enter().append("rect");

      rect.attr("x", (d, index) => {
        return ((index) * (blockSize)) % cal_width;
      })
        .attr("y", (d, index) => Math.floor(index * (blockSize) / cal_width) * (blockSize) + 25)
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
        .style("fill", (d) => {
         
          if (d.nodeState == "Error") {
            return errorColorScale(d.value);
          } else {
            return colorScale(d.value);
          }

        });

      cards.exit().remove();

      // const legend = svg.selectAll(".legend")
      //   .data([0].concat(colorScale.quantiles()), (d) => { return d });

      // const legend_g = legend.enter().append("g")
      //   .attr("class", "legend");

      // legend_g.append("rect").attr("x", (d, i) => (cal_width - buckets * legendElementWidth) - legendElementWidth * i)
      //   .attr("y", 0)
      //   .attr("width", legendElementWidth)
      //   .attr("height", gridSize / 2)
      //   .style("fill", (d, i) => colors[i]);

      // legend_g.append("text")
      //   .attr("class", "mono")
      //   .text((d) => {
      //     return "≥ " + Math.round(d) + "%"
      //   })
      //   .attr("x", (d, i) => (cal_width - buckets * legendElementWidth) - legendElementWidth * (i - 1 / 2))
      //   .attr("y", gridSize);

      // legend.exit().remove();
      // });
    };

    return heatmapChart;

  }

  constructor(
    private resourceManagementService: ResourceManagementService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }


  filterDetail;

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => {
        // let queryString = params.get('filterKey');
        this.queryString = params.get('filterKey');
        if (params.get('filterDetail') !== 'all') {
          this.queryString = params.get('filterKey') + "=" + params.get('filterDetail');
        }

        this.filterDetail = params.get('filterDetail');
        return this.resourceManagementService.getHeatmapInfo(this.queryString + "&aliases=HPCCpuUsage");
      })
      .subscribe(data => {
        this.heatmapData = data;

        d3.json('../../../assets/input1.json', (error, data) => {
          let fakeData = data;
          let random_nums = data.length;
          if (this.filterDetail == 'all') {
            this.heatmapData = this.heatmapData.concat(data);
          }
         
          if (this.heatmapData.length > 0) {
            this.chartTitle = this.heatmapData[0].displayName;
            this.drawPannel(this.heatmapData.length);
          }
          else {
            this.drawPannel(0);
          }

          var testFunc = this.drawChart(this.heatmapData);
          testFunc(this.heatmapData);

          if (this.interval) {
            clearInterval(this.interval);
          }

          let errorNodes = [];

          this.interval = setInterval(() => {
            this.resourceManagementService.getHeatmapInfo(this.queryString + "&aliases=HPCCpuUsage").then((data) => {
              this.heatmapData = data;
              // randomly pick node to be error state
              if (this.filterDetail == 'all') {
                for (let i = 0; i < 30; i++) {
                  let random_num = Math.floor(Math.random() * random_nums);
                  // console.log(random_num);
                  let random_node = fakeData[random_num];
                  // console.log(fakeData);
                  console.log(random_node);
                  let probability = Math.random() * 100;
                  if (random_node["nodeState"] == 'OK') {
                    if (probability > 90 && errorNodes.length < 5) {
                      random_node["nodeState"] = "Error";
                      errorNodes.push(random_node);
                    } else {
                      let currentVal = random_node["value"];
                      if (currentVal > 50) {
                        random_node["value"] = random_node["value"] - 50;
                      } else {
                        random_node["value"] = random_node["value"] + 50;
                      }

                    }
                  } else {
                    if (probability > 60) {
                      random_node["nodeState"] = "OK";
                    } else {
                      let currentVal = random_node["value"];
                      if (currentVal > 50) {
                        random_node["value"] = random_node["value"] - 50;
                      } else {
                        random_node["value"] = random_node["value"] + 50;
                      }
                    }
                  }
                }

                this.heatmapData = data.concat(fakeData);
              }
             
             
              var testFunc = this.drawChart(this.heatmapData);
              testFunc(this.heatmapData);
            });
          }, 5000);

        });



      });


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


