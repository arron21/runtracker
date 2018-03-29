import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";
import {isNullOrUndefined} from "util";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AngularFireDatabase} from 'angularfire2/database';
import {FirebaseListObservable} from 'angularfire2/database-deprecated';
import {AngularFirestore} from 'angularfire2/firestore';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TeamService {

    public team: FirebaseListObservable<any>;

    constructor(private http: HttpClient, private db: AngularFirestore) {}
    getTeam() {
        // return this.http.get('https://runtracker-7c76c.firebaseio.com/team.json');
        // const team = this.db.list('/team');
        // return team;

        this.db.collection('/team').valueChanges().subscribe(res => {
            const result = Object.keys(res).map(function(key) {
                return res[key];
            });
            // this.team = result;
            return result;
        });

    }

    addNewAthlete(athlete) {
        const athleteObj = {
            id: new Date().getTime(),
            firstName: athlete.firstName,
            lastName: athlete.lastName,
        };
        console.log(athleteObj);
        return this.http.post('https://runtracker-7c76c.firebaseio.com/team.json', athleteObj, httpOptions);
    }


    getAthlete(athlete) {
        const id = athlete.id;
        console.log(id);
        // ?orderBy="username"&equalTo="${nameParam}"
        return this.http.get(`https://runtracker-7c76c.firebaseio.com/team.json?orderBy="id"&equalTo=${id}`);
    }

}
