import { Component, OnInit } from '@angular/core';
import { FilterItem } from '../filterlist/filteritem';
import { NodeItem } from './node-item';

import { Router } from '@angular/router';
import { ResourceManagementService } from './resource-management.service';


@Component({
  selector: 'resource-management',
  templateUrl: './resource-management.component.html',
  styleUrls: [ './resource-management.component.scss' ]
})
export class ResourceManagementComponent implements OnInit{
   condition = [
    {value: 'nodes', viewValue: 'Nodes'},
    {value: 'operation', viewValue: 'Operation'}
  ];

  groups = [
    {value: 'HeadNodes', viewValue: 'HeadNodes'},
    {value: 'ComputeNodes', viewValue: 'ComputeNodes'},
    {value: 'WCFBrokerNodes', viewValue: 'WCFBrokerNodes'},
    {value: 'AzureNodes', viewValue: 'AzureNodes'},
    {value: 'UnmanagedServerNodes', viewValue: 'UnmanagedServerNodes'},
    {value: 'LinuxNodes', viewValue: 'LinuxNodes'},
    {value: 'AzureBatchServicePools', viewValue: 'AzureBatchServicePools'}
  ];

  health = [
    {value: 'OK', viewValue: 'OK'},
    {value: 'Warning', viewValue: 'Warning'},
    {value: 'Error', viewValue: 'Error'},
    {value: 'Transitional', viewValue: 'Transitional'},
    {value: 'Unapproved', viewValue: 'Unapproved'}
  ];

  filterlist: FilterItem[];
  selectedItem: string;
  nodes: NodeItem[];
  showView: string;

  constructor(
    private router: Router,
    private resourceManagementService: ResourceManagementService
  ){}

  getFilterList(): void {
    this.resourceManagementService.getFilterList().then(filterlist => {
      this.filterlist = filterlist;
      this.router.navigate(['/resource/nodelist','nodeState','all']);
    });
  }

  ngOnInit(): void {
    this.getFilterList();
    this.onGetNodes({nodeState: ''});
    this.showView = "nodelist";
  }
  
  onSelectFilterItem(name: string): void {
    this.selectedItem = name;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail'])
  }

  onGetNodes(filterDetail: {[key:string]:string}) {
      let key = Object.keys(filterDetail)[0];
      this.router.navigate(['/resource/nodelist',key,filterDetail[key]]);
  }

  showHeatmap(): void {
    this.showView = "heatmap";
    this.router.navigate(['/resource/heatmap']);
  }

  showNodelist(): void {
    this.showView = "nodelist";
    this.router.navigate(['/resource/nodelist/nodeState/all']);
  }
 
}
