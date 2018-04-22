import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {AngularFirestore} from 'angularfire2/firestore';

@Component({
  selector: 'app-athlete-skill-add',
  templateUrl: './athlete-skill-add.component.html',
  styleUrls: ['./athlete-skill-add.component.scss']
})
export class AthleteSkillAddComponent implements OnInit {
    public athleteSkillForm: FormGroup;

    public options: any;

    event = new FormControl();
    eventType: any;
    score = new FormControl();
    date = new FormControl();

    public dataFromDb: any;

    @ViewChild('scoreInput') scoreInput: ElementRef;

    constructor(
      @Inject(MAT_DIALOG_DATA) public data: any,
      private dialogRef: MatDialogRef<AthleteSkillAddComponent>,
      private fb: FormBuilder,
      private db: AngularFirestore,
  ) {
    }

  ngOnInit() {
      const data = this.data.athlete;
      this.options = this.data.events;

      this.athleteSkillForm = this.fb.group({
          score: '',
          date: '',
          event: ''
      });

      if (this.data.type) {
        this.eventType = this.data.type;
      }


  }

  getAthleteEvents() {
      const team = this.db.collection('/team');
      const athleteRef = team.doc((this.data.athlete.id).toString());
      athleteRef.valueChanges().subscribe ( res => {
          console.log(res);
          if (res['events'] && res['events'][this.eventType] && res['events'][this.eventType] !== undefined) {
              this.dataFromDb = res['events'][this.eventType];
          } else {
              console.log('no data');
          }
      });
  }

  saveForm() {

      // TIMESTAMP FOR REFERENCE
      // timestamp: firebase.firestore.FieldValue.serverTimestamp()
      const newEventArray = []
      const eventTypeString = this.athleteSkillForm.value.event.toString();

      let scoreArray = [];
      const newEventObj = {
          timestamp: new Date().getTime(),
          date: this.athleteSkillForm.value.date,
          score: this.athleteSkillForm.value.score
      };
      scoreArray.push(newEventObj);
      var events;
      if (this.dataFromDb) {
          for (let i = 0; i < this.dataFromDb.length; i++) {
              scoreArray.unshift(this.dataFromDb[i]);
          }
            events = {
              'events': {
                  [eventTypeString]: scoreArray
            }
          };
          console.log(events);
      } else {
          events = {
              'events': {
                  [eventTypeString]: scoreArray
              }
          };
      }
      this.db.collection('/team').doc((this.data.athlete.id).toString()).set(events, {merge: true});
      this.dialogRef.close();

  }

  // saveFormToDb() {
  //     if (res['events']) {
  //         console.log(res['events']);
  //
  //         const eventTypeString = this.athleteSkillForm.value.event.toString();
  //         console.log(eventTypeString)
  //         console.log(eventTypeString)
  //         console.log(eventTypeString)
  //         console.log(eventTypeString)
  //         if (res['events'][eventTypeString]) {
  //             const dataFromDb = res['events'][eventTypeString]['scores'];
  //             console.log(dataFromDb);
  //             console.log(dataFromDb);
  //             console.log(dataFromDb);
  //             dataFromDb.push(newEventObj);
  //             const updatedEventsArray = dataFromDb;
  //             const events = {
  //                 'events': {
  //                     [eventTypeString]: {
  //                         updated_at: new Date().getTime(),
  //                         scores: [updatedEventsArray]
  //                     }
  //                 }
  //             }
  //             athleteRef.update(events);
  //         } else {
  //             const events = {
  //                 'events': {
  //                     [eventTypeString]: [newEventObj]
  //                 }
  //             }
  //             athleteRef.update(events)
  //         }
  //     } else {
  //         const eventTypeString = this.athleteSkillForm.value.event.toString();
  //
  //         const events = {
  //             'events': {
  //                 [eventTypeString]: {
  //                     updated_at: new Date().getTime(),
  //                     scores: [newEventObj]
  //                 }
  //             }
  //         }
  //         athleteRef.update(events);
  //
  //     }
  // }

}
