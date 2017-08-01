import { Component, OnInit, Input } from '@angular/core';
import { NgStyle } from '@angular/common';
import { NodeItem } from '../node-item';
import * as d3 from 'd3';

import 'rxjs/add/operator/switchMap';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { ResourceManagementService } from '../resource-management.service';
import { PageEvent } from '@angular/material';



@Component({
  selector: 'resource-detail',
  templateUrl: './resource-detail.component.html',
  styleUrls: ['./resource-detail.component.scss']
})
export class ResourceDetailComponent implements OnInit {
  @Input() filiterItem: string;
  nodes: NodeItem[];
  length: number;
  pageSize: number;
  pageSizeOptions = [5, 10, 25, 100];

  // MdPaginator Output
  pageEvent: PageEvent;
  interval;

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private resourceManagementService: ResourceManagementService
  ) { }

  colorScale;
  errorColorScale;
  filterDetail;

  ngOnInit(): void {
    const colors = ["#E1F5FE", "#B3E5FC", "#81D4FA", "#4FC3F7", "#29B6F6", "#03A9F4", "#039BE5", "#0288D1", "#0277BD", "#01579B"];
    const errorColors = ["#FFEBEE", "#FFCDD2", "#EF9A9A", "#E57373", "#EF5350", "#F44336", "#E53935", "#D32F2F", "#C62828", "#B71C1C"];
    this.colorScale = d3.scaleQuantile()
      .domain([0, 100])
      .range(colors);
    this.errorColorScale = d3.scaleQuantile()
      .domain([0, 100])
      .range(errorColors);

    this.route.paramMap
      .switchMap((params: ParamMap) => {
        let queryString = params.get('filterKey');

        if (params.get('filterDetail') !== 'all') {
          queryString = params.get('filterKey') + "=" + params.get('filterDetail');
        }

        console.log(queryString);

        this.filterDetail = params.get('filterDetail');


        return this.resourceManagementService.getNodeList(queryString);
      })
      .subscribe(nodes => {
        console.log(nodes);
        let allNodes = nodes;
        nodes.map(function (item, index) {
          item["cpuUsage"] = Math.random() * 100;
          item["jobNum"] = Math.floor(Math.random() * 300);
          if (item["nodeHealth"] == 'OK') {
            item["errorJob"] = 0;
          } else {
            item["errorJob"] = item["errorJob"] = Math.floor(Math.random() * (50 - 20) + 20);
          }
        });
        
        if (this.interval) {
          clearInterval(this.interval);
        }

        if (this.filterDetail == 'all') {
          d3.json('../../../assets/nodelist.json', (error, data) => {

            allNodes = allNodes.concat(data);


            console.log(allNodes);


            this.length = allNodes.length;
            this.pageSize = 15;
            this.nodes = allNodes;

          });

          let errorNodes = [];


          this.interval = setInterval(() => {
            for (let i = 0; i < 5; i++) {
              let random_index = Math.floor(Math.random() * (14 - 3) + 3);
              let random_node = allNodes[random_index];
              let probability = Math.random() * 100;
              random_node["jobNum"] = Math.floor(Math.random() * (300 - 50) + 50)
              if (random_node["nodeHealth"] == "OK") {
                if (probability > 90 && errorNodes.length < 3) {
                  random_node["nodeHealth"] = "Error";
                  random_node["errorJob"] = Math.floor(Math.random() * (50 - 20) + 20);
                  errorNodes.push(random_node);
                } else {

                  random_node["cpuUsage"] = random_node["cpuUsage"] > 50 ? random_node["cpuUsage"] - 20 : random_node["cpuUsage"] + 10;


                }
              } else {
                if (probability > 60) {
                  random_node["nodeHealth"] = "OK";
                  random_node["errorJob"] = Math.floor(Math.random() * (20));
                } else {

                  random_node["cpuUsage"] = random_node["cpuUsage"] > 50 ? random_node["cpuUsage"] - 20 : random_node["cpuUsage"] + 10;


                }
              }
            }
          }, 5000);
        } else {
          this.nodes = nodes;
          if (nodes.length > 0) {
            this.interval = setInterval(() => {
              nodes.map(function (item, index) {
                item["cpuUsage"] = Math.random() * 100;
                item["jobNum"] = Math.floor(Math.random() * 300);
                if (item["nodeHealth"] == 'OK') {
                  item["errorJob"] = 0;
                } else {
                  item["errorJob"] = item["errorJob"] = Math.floor(Math.random() * (50 - 20) + 20);
                }
              });

            }, 5000);
          }

        }





      });
  }

  showDetail(name: string) {
    this.router.navigate(['/resource/detail', name]);
  }

  ngOnDestroy() {
    if (this.interval) {
      console.log(this.interval);
      clearInterval(this.interval);
    }
  }
}
