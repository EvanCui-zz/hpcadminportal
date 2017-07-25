import { Injectable } from '@angular/core';

@Injectable()
export class HttpPrefixService {
    private urlPrefix = "http://13.75.122.13:5000";
    // private urlPrefix = "http://10.172.7.42:32238";
    getUrlPrefix():string {
        return this.urlPrefix;
    }

}