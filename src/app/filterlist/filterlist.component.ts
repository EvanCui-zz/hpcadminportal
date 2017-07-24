import { Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import { FilterItem } from './filteritem';

@Component({
  selector: 'filterlist',
  templateUrl: 'filterlist.component.html',
  styleUrls: ['filterlist.component.css'],
})
export class FilterlistComponent implements OnInit{
    @Input() items: FilterItem[];
    @Output() onGetNodes= new EventEmitter<any>(); 
    selectedName: string;
    filter: string;

    ngOnInit(): void {
      this.selectedName = 'nodeState';
    }
  
    getNodes(name: string, filter: string){
      if(filter == "all"){
        this.selectedName = name;
      }
      else {
        this.selectedName = "";
      }
      
      this.filter = filter;
      let filterDetail = {};
      filterDetail[name] = filter;
      this.onGetNodes.emit(filterDetail);
    }


}
