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

    public meets: any;
    constructor(
      private fb: FormBuilder,
      private meetService: MeetService,
      private route: ActivatedRoute,
      private router: Router,
      private db: AngularFirestore,
        public dialog: MatDialog,
    ) { }

  ngOnInit() {
      this.getMeets();
  }

  getMeets() {
      this.db.collection('/meets').valueChanges()
          .subscribe(res => {
              const result = Object.keys(res).map(function(key) {
                  return res[key];
              });
              this.meets = result;
          });
  }

    editMeetModal(meet) {
        let dialogRef = this.dialog.open(EventeditComponent, {
            // width: '250px',
            data: {'meet': meet}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            // this.animal = result;
        });
    }


    onEventAddModal() {
        let dialogRef = this.dialog.open(EventaddComponent, {});

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            // this.animal = result;
        });
    }

}
