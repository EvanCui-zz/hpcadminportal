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

  filterlist: FilterItem[];
  selectedItem: string;
  nodes: NodeItem[];
  showView: string;
  filterQueryString = "/nodeState/all";

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
    // this.onGetNodes({nodeState: ''});
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
      this.filterQueryString = "/"+key+"/"+filterDetail[key]; 
      console.log(this.filterQueryString);
      this.router.navigate(['/resource/'+this.showView,key,filterDetail[key]]);
  }

  showHeatmap(): void {
    this.showView = "heatmap";
    this.router.navigate(['/resource/heatmap'+this.filterQueryString]);
  }

  showNodelist(): void {
    this.showView = "nodelist";
    this.router.navigate(['/resource/nodelist'+this.filterQueryString]);
  }
 
}
