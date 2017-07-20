import {Component} from '@angular/core';


@Component({
  selector: 'nodelist',
  styleUrls: ['nodelist.component.css'],
  templateUrl: 'nodelist.component.html',
})

export class NodelistComponent {
  managements = [
    {
      name: 'Configuration',
      icon: 'build',
    },
    {
      name: 'Resource Management',
      icon: 'devices',
    },
    {
      name: 'Job Management',
      icon: 'cloud',
    },
    {
      name: 'Diagnostics',
      icon: 'queue',
    },
    {
      name: 'Charts and Reports',
      icon: 'timeline'
    }
  ];
}