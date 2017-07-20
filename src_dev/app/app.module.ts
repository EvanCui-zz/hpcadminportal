import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgMaterialModule } from './ng-material.module';
import { AngularEchartsModule } from 'ngx-echarts';


import { AppRoutingModule } from './app-routing.module';



import { AppComponent } from './app.component';
// import { DashboardComponent } from './dashboard/dashboard.compnent';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
// import { FilterlistComponent } from './filterlist/filterlist.component';
import { NodelistComponent } from './nodelist/nodelist.component';
import { HeroService } from './dashboard/hero.service';


@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    SidenavComponent,
    NodelistComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    NgMaterialModule,
    AngularEchartsModule,
    AppRoutingModule
  ],
  providers: [HeroService],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
