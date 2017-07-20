import { NgModule, CUSTOM_ELEMENTS_SCHEMA }  from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { CommonModule }   from '@angular/common';
import { AngularEchartsModule } from 'ngx-echarts';

import { ResourceManagementRoutingModule } from './resource-management-routing.module';
import { ResourceManagementComponent } from './resource-management.component';
import { ResourceDetailComponent } from './resource-detail/resource-detail.component';
import { HeatmapComponent } from './heatmap/heatmap.component';
import { FilterlistModule } from '../filterlist/filterlist.module';
import { ResourceManagementService } from './resource-management.service';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ResourceManagementRoutingModule,
    FilterlistModule,
    AngularEchartsModule
  ],
  declarations: [
    ResourceManagementComponent,
    ResourceDetailComponent,
    HeatmapComponent
  ],
  providers: [
    ResourceManagementService
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ResourceManagementModule {}