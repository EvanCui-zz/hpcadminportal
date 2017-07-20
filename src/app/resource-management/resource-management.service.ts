import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { FilterItem } from '../filterlist/filteritem';
import { FilterList } from './mock-filterlist';

import { NodeItem } from './node-item';
import { NodeList } from './mock-nodelist';

@Injectable()
export class ResourceManagementService {
    private headers = new Headers({'Content-type': 'application/json'});
    private resourceUrl = '';

    getFilterList(): Promise<FilterItem[]> {
        return Promise.resolve(FilterList);
    }

    getNodeList(): Promise<NodeItem[]> {
        console.log(NodeList);
        return Promise.resolve(NodeList);
    }
    

}