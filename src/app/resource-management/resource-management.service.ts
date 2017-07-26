import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import { FilterItem } from '../filterlist/filteritem';

import { NodeItem } from './node-item';
import { HttpPrefixService } from '../http-prefix.service';

@Injectable()
export class ResourceManagementService {
    private headers = new Headers({ 'Content-type': 'application/json' });
    private resourceUrl: string;
    private nodeList: NodeItem[];

    constructor(private httpPrefixService: HttpPrefixService, private http: Http) {
        this.resourceUrl = this.httpPrefixService.getUrlPrefix();
    }

    getFilterList(): Promise<FilterItem[]> {
        return this.http
            .get(this.resourceUrl + '/api/nodes/filters')
            .toPromise()
            .then(response => {
                console.log(response.json());
                return response.json() as FilterItem[]
            });
    }

    getNodeList(statu: string): Promise<NodeItem[]> {
        return this.http
            .get(this.resourceUrl + '/api/nodes/status?' + statu)
            .toPromise()
            .then(response => {
                return response.json() as NodeItem[];
            });
    }

    getFilteredNodeList() {
        return this.nodeList;
    }

    setNodeList(nodelist: NodeItem[]) {
        this.nodeList = nodelist;
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }


}