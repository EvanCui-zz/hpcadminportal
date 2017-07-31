import { NgModule, CUSTOM_ELEMENTS_SCHEMA }  from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { CommonModule }   from '@angular/common';
import { AngularEchartsModule } from 'ngx-echarts';

import { ResourceManagementRoutingModule } from './resource-management-routing.module';
import { ResourceManagementComponent } from './resource-management.component';
import { ResourceDetailComponent } from './resource-detail/resource-detail.component';
import { HeatmapComponent } from './heatmap/heatmap.component';
import { NodeDetailComponent } from './node-detail/node-detail.component';
import { FilterlistModule } from '../filterlist/filterlist.module';
import { HttpPrefixService } from '../http-prefix.service';
import { ResourceManagementService } from './resource-management.service';
import { CapitalizePipe } from './node-detail/capitalize.pipe';



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
    HeatmapComponent,
    NodeDetailComponent,
    CapitalizePipe
  ],
  providers: [
    HttpPrefixService,
    ResourceManagementService
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ResourceManagementModule {}