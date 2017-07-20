import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FilterItem } from './filteritem';

@Component({
  selector: 'filterlist',
  templateUrl: 'filterlist.component.html',
  styleUrls: ['filterlist.component.css'],
})
export class FilterlistComponent{
    @Input() items: FilterItem[];
    @Output() onGetNodes= new EventEmitter<any>(); 
    selectedName:string;

    getNodes(name: string){
      this.selectedName = name;
      this.onGetNodes.emit(name);
    }


}
