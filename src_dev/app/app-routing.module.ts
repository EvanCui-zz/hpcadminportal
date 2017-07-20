import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { DashboardComponent } from './dashboard/dashboard.compnent';
import { NodelistComponent } from './nodelist/nodelist.component';
const routes: Routes = [
    { 
        path: 'dashboard',
        loadChildren: 'app/dashboard/dashboard.module#DashboardModule'
    },
    {
        path: 'resource',
        loadChildren: 'app/resource-management/resource-management.module#ResourceManagementModule',
        data: {preload: true}
    },
    {
        path: 'nodelist',
        component: NodelistComponent
    },
    // { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
