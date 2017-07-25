import {Component} from '@angular/core';


@Component({
  selector: 'sidenav',
  styleUrls: ['sidenav.component.scss'],
  templateUrl: 'sidenav.component.html',
})

export class SidenavComponent {
  managements = [
    {
      name: 'Configuration',
      icon: 'build',
      // path: '/configuration'
      path: 'dashboard'
    },
    {
      name: 'Resource Management',
      icon: 'cloud',
      path: '/resource'
    },
    {
      name: 'Job Management',
      icon: 'device_hub',
      // path: '/job'
      path: 'dashboard'
    },
    {
      name: 'Diagnostics',
      icon: 'security',
      // path: '/diagnostics'
      path: 'dashboard'
    },
    {
      name: 'Charts and Reports',
      icon: 'timeline',
      // path: '/reports'
      path: 'dashboard'
    }
  ];
}