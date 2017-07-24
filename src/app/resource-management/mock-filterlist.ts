import { FilterItem } from '../filterlist/filteritem';

export const FilterList: FilterItem[] = [
        {
            filterKey: "By Node Health",
            filterDetail: [
               "OK", "Waring","Error","Transitional","Unapproved"
            ]
        },
        {
            
            filterKey: "By Node State",
            filterDetail: [
                "Online",
                "Offline",
                "Draining",
               "Provisioning",
                "Rejected",
               "Not-Deployed"
                
            ]
        }
    ];