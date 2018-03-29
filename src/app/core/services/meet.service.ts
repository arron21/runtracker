import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";
import {isNullOrUndefined} from "util";
import {HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TeamService {
    constructor(private http: HttpClient) {}
    getTeam() {
        return this.http.get('https://runtracker-7c76c.firebaseio.com/team.json');
    }

    addNewAthlete(athlete) {
        const athleteObj = athlete;
        console.log(athleteObj);
        return this.http.post('https://runtracker-7c76c.firebaseio.com/team.json', athleteObj, httpOptions);
    }



}
