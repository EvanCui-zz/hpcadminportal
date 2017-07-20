import { NgModule, CUSTOM_ELEMENTS_SCHEMA }       from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { CommonModule }   from '@angular/common';


import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.compnent';
import { DashboardDetailComponent } from './dashboard-detail/dashboard-detail.component';
import { FilterlistModule } from '../filterlist/filterlist.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    FilterlistModule
  ],
  declarations: [
    DashboardComponent,
    DashboardDetailComponent
  ],
  providers: [
    // CrisisService
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class DashboardModule {}