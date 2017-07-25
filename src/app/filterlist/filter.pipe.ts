import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: "filterName"})
export class FilterNamePipe implements PipeTransform {
    transform(value: string): string {
        switch(value) {
            case "nodeState" : {
                return "STATE";
            }
            case "nodeHealth": return "HEALTH"; 
            case "nodeTemplate": return "TEMPLATE"; 
            case "nodeTag" : return "TAG";
            default: return "No Such Case";
        }
       
    }
}