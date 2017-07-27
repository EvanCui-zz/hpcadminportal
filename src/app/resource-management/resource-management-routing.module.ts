import { NgModule } from '@angular/core';
import { RouterModule, Routes, RunGuardsAndResolvers } from '@angular/router';

import { ResourceManagementComponent } from './resource-management.component';
import { ResourceDetailComponent } from './resource-detail/resource-detail.component';
import { HeatmapComponent } from './heatmap/heatmap.component';
import { NodeDetailComponent } from './node-detail/node-detail.component';

// import { CanDeactivateGuard }     from '../can-deactivate-guard.service';
// import { CrisisDetailResolver }   from './crisis-detail-resolver.service';

const resourceManagementRoutes: Routes = [
  {
    path: '',
    component: ResourceManagementComponent,
    children: [
      {
        path: 'heatmap/:filterKey/:filterDetail',
        component: HeatmapComponent,
        runGuardsAndResolvers: 'paramsOrQueryParamsChange'
      },
      {
        path: 'nodelist/:filterKey/:filterDetail',
        component: ResourceDetailComponent,
        runGuardsAndResolvers: 'paramsOrQueryParamsChange'
      },
      {
        path: 'detail/:name',
        component: NodeDetailComponent,
      },
      {
        path: '',
        redirectTo: 'nodelist',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(resourceManagementRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ResourceManagementRoutingModule { }
