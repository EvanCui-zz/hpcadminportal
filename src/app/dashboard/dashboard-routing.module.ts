import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.compnent';
import { DashboardDetailComponent } from './dashboard-detail/dashboard-detail.component';
// import { FilterlistComponent }       from '../filterlist/filterlist.component';


// import { CanDeactivateGuard }     from '../can-deactivate-guard.service';
// import { CrisisDetailResolver }   from './crisis-detail-resolver.service';

const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: DashboardDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(dashboardRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    // CrisisDetailResolver
  ]
})
export class DashboardRoutingModule { }