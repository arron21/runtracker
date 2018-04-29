import {Injectable} from "@angular/core";
import {AngularFirestoreDocument,
    AngularFirestore,
    AngularFirestoreCollection} from 'angularfire2/firestore';
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";
import {isNullOrUndefined} from "util";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Athlete } from '../models/athlete';
import { Team } from '../models/team';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AthleteService {

    team: AngularFirestoreCollection<Team>;
    private athleteDoc: AngularFirestoreDocument<Team>;

    constructor(private db: AngularFirestore) {
        // Get the tasks collection
        this.team = db.collection<Athlete>('team');
    }

    addAthlete(athlete) {
        // Add the new athlete to the collection
        this.team.add(athlete);
        console.log(`added ${athlete}`);
    }
}
