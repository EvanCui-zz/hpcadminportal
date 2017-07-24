import { Component, OnInit, Input} from '@angular/core';
import { NodeItem } from '../node-item';

import 'rxjs/add/operator/switchMap';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
 
import { ResourceManagementService } from '../resource-management.service';
import {PageEvent} from '@angular/material';



@Component({
  selector: 'resource-detail',
  templateUrl: './resource-detail.component.html',
  styleUrls: [ './resource-detail.component.css' ]
})
export class ResourceDetailComponent implements OnInit {
  @Input() filiterItem: string;
    nodes: NodeItem[];
    length: number;
    pageSize: number;
    pageSizeOptions = [5, 10, 25, 100];

  // MdPaginator Output
    pageEvent: PageEvent;

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private resourceManagementService: ResourceManagementService
  ){}

  ngOnInit(): void {
    this.route.paramMap
        .switchMap((params: ParamMap) => {
          let queryString =  params.get('filterKey');
          if(params.get('filterDetail') !== 'all') {
            queryString = params.get('filterKey')+"="+params.get('filterDetail');
          } 
         
          return this.resourceManagementService.getNodeList(queryString);
        })
        .subscribe(nodes => {
          console.log(nodes); 
          this.length = nodes.length;
          this.pageSize = 10;
          this.nodes = nodes;
        });
  }

  showDetail(name:string){
    this.router.navigate(['/resource/detail',name]);
  }
}
