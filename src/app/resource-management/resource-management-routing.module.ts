import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ResourceManagementComponent } from './resource-management.component';
import { ResourceDetailComponent }     from './resource-detail/resource-detail.component';
import { HeatmapComponent } from './heatmap/heatmap.component';

// import { CanDeactivateGuard }     from '../can-deactivate-guard.service';
// import { CrisisDetailResolver }   from './crisis-detail-resolver.service';

const resourceManagementRoutes: Routes = [
  {
    path: '',
    component: ResourceManagementComponent,
    children: [
      {
        path: 'heatmap',
        component: HeatmapComponent
      },
      {
        path: 'nodelist',
        component: ResourceDetailComponent,   
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
