import { Component, OnInit } from '@angular/core';
import { SharedModule} from '../shared/shared.module';
import {FormBuilder, FormGroup} from '@angular/forms';
import {TeamService} from '../core/services/team.service';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFirestore} from 'angularfire2/firestore';
import {AthleteEventEditComponent} from './athlete-event-edit/athlete-event-edit.component';
import {MatDialog} from '@angular/material';
import {AthleteViewComponent} from './athlete-view/athlete-view.component';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

    constructor(
    ) { }

  ngOnInit() {
  }



}
