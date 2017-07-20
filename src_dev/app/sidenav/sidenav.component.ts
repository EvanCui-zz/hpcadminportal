import {Component} from '@angular/core';


@Component({
  selector: 'sidenav',
  styleUrls: ['sidenav.component.css'],
  templateUrl: 'sidenav.component.html',
})

export class SidenavComponent {
  managements = [
    {
      name: 'Configuration',
      icon: 'build',
      path: '/configuration'
    },
    {
      name: 'Resource Management',
      icon: 'device_hub',
      path: '/resource'
    },
    {
      name: 'Job Management',
      icon: 'cloud',
      path: '/job'
    },
    {
      name: 'Diagnostics',
      icon: 'security',
      path: '/diagnostics'
    },
    {
      name: 'Charts and Reports',
      icon: 'timeline',
      path: '/reports'
    }
  ];
}