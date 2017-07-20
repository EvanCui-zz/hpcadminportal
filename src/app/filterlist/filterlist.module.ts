import { NgModule, NO_ERRORS_SCHEMA}       from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { CommonModule }   from '@angular/common';
import { RouterModule, Routes } from '@angular/router';


// import { MdButtonModule, MdListModule, MdIconModule } from '@angular/material';
import { FilterlistComponent } from '../filterlist/filterlist.component';
import {NgMaterialModule} from '../ng-material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgMaterialModule
  ],
  declarations: [
    FilterlistComponent
  ],
  providers: [
    // CrisisService
  ],
  exports: [FilterlistComponent, CommonModule, FormsModule, RouterModule, NgMaterialModule],
  schemas: [ NO_ERRORS_SCHEMA ]
  
})
export class FilterlistModule {}
