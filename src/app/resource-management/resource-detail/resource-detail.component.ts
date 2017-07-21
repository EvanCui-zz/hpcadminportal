import { Component, OnInit, Input} from '@angular/core';
import { NodeItem } from '../node-item';
import { Router } from '@angular/router';

import { ResourceManagementService } from '../resource-management.service';



@Component({
  selector: 'resource-detail',
  templateUrl: './resource-detail.component.html',
  styleUrls: [ './resource-detail.component.css' ]
})
export class ResourceDetailComponent implements OnInit {
  @Input() filiterItem: string;
    nodes: NodeItem[]


  constructor(
    private router: Router,
    private resourceManagementService: ResourceManagementService
  ){}

  ngOnInit(): void {
    this.resourceManagementService.getNodeList()
      .then(nodes => this.nodes = nodes);
  }

  showDetail(name:string){
    this.router.navigate(['/resource/detail',name]);
  }
}
