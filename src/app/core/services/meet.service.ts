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
export class MeetService {
    constructor(private http: HttpClient) {}
    getMeets() {
        return this.http.get('https://runtracker-7c76c.firebaseio.com/meets.json');
    }

    getMeet(meetId) {
        const id = meetId.eventId;
        console.log(meetId);
        // ?orderBy="username"&equalTo="${nameParam}"
        return this.http.get(`https://runtracker-7c76c.firebaseio.com/meets.json?orderBy="id"&equalTo=${id}`);

    }

    addNewMeet(meet) {
        // const meetObj = athlete;
        let events = meet.events.split(',');
        for (let i = 0; i < events.length; i++) {
            console.log(events[i]);
            const type = events[i];
            const newEventObj = {
                type: type,
                pr: 0
            };
            events[i] = newEventObj;
        }
        const meetObj = {
            id: new Date().getTime(),
            date: meet.date || new Date(),
            location: meet.location,
            events: events
        };
        return this.http.post('https://runtracker-7c76c.firebaseio.com/meets.json', meetObj, httpOptions);
    }

}
