import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import * as d3 from 'd3';
import 'rxjs/add/operator/switchMap';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';

@Component({
  selector: 'node-detail',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './node-detail.component.html',
  styleUrls: [ './node-detail.component.css' ]
})
export class NodeDetailComponent implements OnInit{
    nodeName: string;

    nodeDetail = [
    {
      name: "Node Health",
      detail: [
        {
          name: "Node state",
          info: "Online-node is available to run jobs or services" 
        },
        {
          name: "Node Connectivity",
          info: "OK"
        },
        {
          name: "Operations",
          info: "Discovering the configuration of the head node-7/4/2017 11:40:31 AM"
        },
        {
          name: "Diagnostics",
          info: "No failures"
        }
      ]
    },
    {
      name: "Properties",
      detail:[
        {
          name: "Groups",
          info: ["WCFBrokerNodes","ComputerNodes","HeadNodes"]
        },
        {
          name: "State",
          info: "online"
        },
        {
          name: "Core",
          info: ["AMD Opteron(tm) Processor 4171 HE","AMD Opteron(tm) processor 4171 HE"]
        },
        {
          name: "System Type",
          info: "Microsoft Windows NT 6.2.9200.0"
        },
        {
          name: "Node Template",
          info: "HeadNode Template"
        },
        {
          name: "Location",
          info: ""
        },
        {
          name: "Disks",
          info: ["D:\\","E:\\"]
        }
      ]
    },
    {
      name: "Network",
      detail: [
        {
          name: "Bound to network",
          info: "Enterprise"
        },
        {
          name: "IP address",
          info: "10.0.0.6"
        },
        {
          name: "Subnet mask",
          info: "255.255.252.0"
        },
        {
          name: "Domain",
          info: "reddog.microsoft.com"
        }
      ]
    }
  ];

   jobs = [
    {
       name: "Job1",
       owner: "Jingjing Li",
       state: "ongoing",
       progress: '40%',
       date: "2017/7/21 17:17:00"
    },
    {
       name: "Job2",
       owner: "Jingjing Li",
       state: "ongoing",
       progress: '60%',
       date: "2017/7/21 17:17:00"
    },
    {
       name: "Job3",
       owner: "Jingjing Li",
       state: "ongoing",
       progress: '80%',
       date: "2017/7/21 17:17:00"
    },
    {
       name: "Job4",
       owner: "Jingjing Li",
       state: "ongoing",
       progress: '90%',
       date: "2017/7/21 17:17:00"
    },
    {
       name: "Job5",
       owner: "Jingjing Li",
       state: "ongoing",
       progress: '100%',
       date: "2017/7/21 17:17:00"
    },
    {
       name: "Job6",
       owner: "Jingjing Li",
       state: "ongoing",
       progress: '100%',
       date: "2017/7/21 17:17:00"
    },
    {
       name: "Job7",
       owner: "Jingjing Li",
       state: "ongoing",
       progress: '100%',
       date: "2017/7/21 17:17:00"
    },
    {
       name: "Job8",
       owner: "Jingjing Li",
       state: "ongoing",
       progress: '100%',
       date: "2017/7/21 17:17:00"
     },
     {
       name: "Job5",
       owner: "Jingjing Li",
       state: "ongoing",
       progress: '100%',
       date: "2017/7/21 17:17:00"
     }
   ];
  
    constructor(
        private route: ActivatedRoute,
        private location: Location
    ) {}

    // constructor(private viewContainerRef: ViewContainerRef){}
    ngOnInit(): void {
        this.route.paramMap
        .switchMap((params: ParamMap)=>{
            console.log(params.get('name'));
            this.nodeName = params.get('name');
            return this.nodeName;
        })
        .subscribe(name=> {
            console.log(name);
            // this.nodeName = name;
        })
      
    }
  
}
