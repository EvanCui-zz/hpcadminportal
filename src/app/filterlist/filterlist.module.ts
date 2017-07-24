import { NgModule, NO_ERRORS_SCHEMA}       from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { CommonModule }   from '@angular/common';
import { RouterModule, Routes } from '@angular/router';


// import { MdButtonModule, MdListModule, MdIconModule } from '@angular/material';
import { FilterlistComponent } from '../filterlist/filterlist.component';
import { NgMaterialModule } from '../ng-material.module';
import { FilterNamePipe } from './filter.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgMaterialModule
  ],
  declarations: [
    FilterlistComponent,
    FilterNamePipe
  ],
  providers: [
    // CrisisService
  ],
  exports: [FilterlistComponent, CommonModule, FormsModule, RouterModule, NgMaterialModule, FilterNamePipe],
  schemas: [ NO_ERRORS_SCHEMA ]
  
})
export class FilterlistModule {}
