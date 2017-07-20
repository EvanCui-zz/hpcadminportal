import { Component, OnInit, Input} from '@angular/core';
import { NodeItem } from '../node-item';

import { ResourceManagementService } from '../resource-management.service';


@Component({
  selector: 'resource-detail',
  templateUrl: './resource-detail.component.html',
  styleUrls: [ './resource-detail.component.css' ]
})
export class ResourceDetailComponent implements OnInit {
    nodes: NodeItem[]
//   heroes: Hero[] = [];

  constructor(private resourceManagementService: ResourceManagementService) { }

  ngOnInit(): void {
    this.resourceManagementService.getNodeList()
      .then(nodes => this.nodes = nodes);
  }
}
