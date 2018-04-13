import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {MeetService} from '../../core/services/meet.service';
import {AngularFirestore} from 'angularfire2/firestore';

@Component({
  selector: 'app-eventadd',
  templateUrl: './eventadd.component.html',
  styleUrls: ['./eventadd.component.scss']
})
export class EventaddComponent implements OnInit {
    public newEventForm: FormGroup;
    public location: any;
    public date: any = new Date();
    public events: any;
  constructor(
      private fb: FormBuilder,
      private meetService: MeetService,
      private route: ActivatedRoute,
      private router: Router,
      private db: AngularFirestore,
      private dialogRef: MatDialogRef<EventaddComponent>,

  ) { }

  ngOnInit() {
      this.newEventForm = this.fb.group({
          location: '',
          date: new Date(),
          events: ''
      });

  }

    addNewEvent() {

        const meetObj = {
            id: new Date().getTime(),
            date: this.date,
            location: this.location,
            events: this.events.split(',')
        };
        for (let i = 0; i < meetObj.events.length; i++) {
            console.log(meetObj.events[i]);
            const type = meetObj.events[i];
            const newEventObj = {
                type: type,
                pr: 0
            };
            meetObj.events[i] = newEventObj;
        }
        // this.db.collection('/team').doc((athleteObj.id).toString()).set(athleteObj);
        this.db.collection('/meets').doc((meetObj.id).toString()).set(meetObj);

        // this.db.collection('/meets').add(meetObj)
        //     .then((docRef) => {
        //         console.log("Document written with ID: ", docRef.id);
        //         this.location = '';
        //         this.events = '';
        //         this.dialogRef.close();
        //
        //     })
        //     .catch((error) => {
        //         console.error("Error adding document: ", error);
        //     });

        // console.log(this.newEventForm);
        // this.meetService.addNewMeet(this.newEventForm.value).subscribe(
        //     res => {console.log(res);
        //     },
        //     err => {
        //         console.log(err);
        //     }
        // );
    }

}
