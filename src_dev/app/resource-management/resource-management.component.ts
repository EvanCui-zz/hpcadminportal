import { Component, OnInit } from '@angular/core';
import { FilterItem } from '../filterlist/filteritem';
import { NodeItem } from './node-item';

import { Router } from '@angular/router';
import { ResourceManagementService } from './resource-management.service';


@Component({
  selector: 'resource-management',
  templateUrl: './resource-management.component.html',
  styleUrls: [ './resource-management.component.css' ]
})
export class ResourceManagementComponent implements OnInit{
   condition = [
    {value: 'nodes', viewValue: 'Nodes'},
    {value: 'operation', viewValue: 'Operation'}
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
    this.resourceManagementService.getFilterList().then(filterlist => this.filterlist = filterlist);
  }

  getNodeList(): void {
    this.resourceManagementService.getNodeList().then(nodes => this.nodes = nodes);
  }

  ngOnInit(): void {
    this.getFilterList();
    this.getNodeList();
    this.showView = "nodelist";
  }
  
  onSelectFilterItem(name: string): void {
    this.selectedItem = name;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail'])
  }

  onGetNodes(name: string) {
    console.log(name);
    this.resourceManagementService.getNodeList().then(nodes=>{
      this.nodes = nodes;
      this.router.navigate(['/resource/nodelist']);
    });
  }

  showHeatmap(): void {
    this.showView = "heatmap";
    this.router.navigate(['/resource/heatmap']);
  }

  showNodelist(): void {
    this.showView = "nodelist";
    this.router.navigate(['/resource/nodelist']);
  }
 
}
