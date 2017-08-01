import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import 'rxjs/add/operator/switchMap';

import { Location } from '@angular/common';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ResourceManagementService } from '../resource-management.service';

@Component({
  selector: 'node-detail',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './node-detail.component.html',
  styleUrls: ['./node-detail.component.scss']
})
export class NodeDetailComponent implements OnInit {
  nodeName: string;
  jobs = [
    {
      name: "Job1",
      owner: "Jingjing Li",
      state: "ongoing",
      progress: '40',
      date: "2017/7/21 20:35:00"
    },
    {
      name: "Job2",
      owner: "Jingjing Li",
      state: "ongoing",
      progress: '60',
      date: "2017/7/21 20:17:00"
    },
    {
      name: "Job3",
      owner: "Jingjing Li",
      state: "ongoing",
      progress: '80',
      date: "2017/7/21 20:11:00"
    },
    {
      name: "Job4",
      owner: "Jingjing Li",
      state: "ongoing",
      progress: '90',
      date: "2017/7/21 19:55:00"
    },
    {
      name: "Job5",
      owner: "Jingjing Li",
      state: "finished",
      progress: '100',
      date: "2017/7/21 19:15:00"
    },
    {
      name: "Job6",
      owner: "Jingjing Li",
      state: "finished",
      progress: '100',
      date: "2017/7/21 19:03:00"
    },
    {
      name: "Job7",
      owner: "Jingjing Li",
      state: "finished",
      progress: '100',
      date: "2017/7/21 18:47:00"
    },
    {
      name: "Job8",
      owner: "Jingjing Li",
      state: "finished",
      progress: '100',
      date: "2017/7/21 18:17:00"
    },
    {
      name: "Job9",
      owner: "Jingjing Li",
      state: "finished",
      progress: '100',
      date: "2017/7/21 17:30:00"
    },
    {
      name: "Job10",
      owner: "Jingjing Li",
      state: "finished",
      progress: '100',
      date: "2017/7/21 17:17:00"
    }
  ];

  compute;
  interface;
  computeKeys;
  scheduledEvent;
  scheduledEventKeys;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private resourceManagementService: ResourceManagementService
  ) { }

  gridSize = 40;
  legendElementWidth: number;
  blockSize = this.gridSize + 20;
  height: number;
  svg;
  margin = { top: 30, right: 16, bottom: 100, left: 16 };
  times = [];
  cal_width: number;



  drawPannel(size: number) {
    let containerWidth = document.getElementById("node-chart").clientWidth;
    const containerHeight = document.getElementById("node-chart").clientHeight;
    d3.select("svg").remove();
    console.log(containerWidth);

    const x_node_num = 15;
    const y_node_num = 1.5;
    const width = (this.blockSize) * (x_node_num);
    this.height = (this.blockSize) * (y_node_num);

    this.cal_width = width;
    this.legendElementWidth = this.gridSize * 2;
    const g_mgL = (containerWidth - width) / 2;

    this.svg = d3.select("#node-chart").append("svg")
      .attr("width", containerWidth - 20)
      .attr("height", this.height)
      .append("g")
      .attr("transform", "translate(" + g_mgL + "," + 0 + ")");



    const timeLabels = this.svg.selectAll(".timeLabel")
      .data(this.times)
      .enter().append("text")
      .text((d) => d)
      .attr("x", (d, i) => i * this.blockSize)
      .attr("y", this.blockSize * 1.5)
      .style("text-anchor", "middle")
      .attr("transform", "translate(" + this.gridSize / 2 + ", -6)")
      .attr("class", (d, i) => ((i >= 7 && i <= 16) ? "timeLabel axis axis-worktime" : "timeLabel axis"));

  }

  drawChart(data: any) {
    const colors = ["#E1F5FE", "#B3E5FC", "#81D4FA", "#4FC3F7", "#29B6F6", "#03A9F4", "#039BE5", "#0288D1", "#0277BD", "#01579B"];
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
          return ((index) * (blockSize)) % cal_width;
        })
          .attr("y", (d, index) => Math.floor(index * (blockSize) / cal_width) * (blockSize) + 10)
          .attr("rx", 5)
          .attr("ry", 5)
          .attr("class", "node bordered")
          .attr("width", gridSize)
          .attr("height", gridSize)
          .style("fill", colors[0])
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
            let displayName = d.displayName;
            let showContent = "<div class='nodeName'>" + "CPU Usage" + "</div>" + usage;
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
      });
    };

    return heatmapChart;

  }

  formateTime(time: number): string {
    if (time < 10) {
      return "0" + time;
    }
    return time.toString();
  }

  goBack() {
    this.location.back();
  }


  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => {
        console.log(params.get('name'));
        this.nodeName = params.get('name');

        let now_num = +new Date();
        this.times = [];
        console.log(now_num);

        for (let i = 15; i > 0; i--) {
          let time = now_num - i * 60 * 1000 * 5;
          let date = new Date(time);

          this.times.push(this.formateTime(date.getHours()) + ":" + this.formateTime(date.getMinutes()));
        }
        console.log(typeof (this.nodeName));

        return this.resourceManagementService.getMetaData(this.nodeName);
      })
      .subscribe((data) => {
        // console.log(data);
        this.compute = data.compute;
        this.computeKeys = Object.keys(this.compute);
        this.interface = data.network.interface;
        console.log(data.network.interface);
        this.resourceManagementService.getScheduledEvent(this.nodeName).then((data) => {
          this.scheduledEvent = data.Events[0];
          this.scheduledEventKeys = Object.keys(this.scheduledEvent);
          console.log(this.scheduledEvent);
          console.log(this.scheduledEventKeys);

        });
        this.drawPannel(300);
        var testFunc = this.drawChart('../../../assets/input.json');
        testFunc('../../../assets/input.json');

      })

  }

}
