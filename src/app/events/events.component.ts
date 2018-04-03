import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MeetService} from '../core/services/meet.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularFirestore} from 'angularfire2/firestore';
import {AthleteViewComponent} from '../team/athlete-view/athlete-view.component';
import {MatDialog} from '@angular/material';
import {EventeditComponent} from './eventedit/eventedit.component';
import {EventaddComponent} from './eventadd/eventadd.component';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

    constructor() { }

  ngOnInit() {
  }

}
