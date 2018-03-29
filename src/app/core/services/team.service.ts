import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";
import {isNullOrUndefined} from "util";

@Injectable()
export class ProfilesService {
    constructor(private http: Http) {}
    getProfiles() {
        return this.http.get('https://over-6bbe9.firebaseio.com/profiles.json')
            .map((response: Response) => {
                const JSON = response.json();
                const length = JSON.length;
                const resArray = [];

                for (const key in JSON) {
                    if (JSON.hasOwnProperty(key)) {
                        resArray.push(JSON[key]);
                    }
                }
                return resArray;

            });
    }
}