import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {AngularFirestore} from 'angularfire2/firestore';
import {Router} from '@angular/router';
import {Location} from '@angular/common';


@Component({
  selector: 'app-athlete-event-edit',
  templateUrl: './athlete-event-edit.component.html',
  styleUrls: ['./athlete-event-edit.component.scss']
})
export class AthleteEventEditComponent implements OnInit {


    public athleteForm: FormGroup;
    public athlete: any;
    items: any[] = [];

    constructor(
          @Inject(MAT_DIALOG_DATA) public data: any,
          private dialogRef: MatDialogRef<AthleteEventEditComponent>,
          private fb: FormBuilder,
          private _location: Location,

            private db: AngularFirestore
    ) { }

  ngOnInit() {

    this.getAthleteData();
  }

    onNoClick(): void {
        // this.dialogRef.close();
    }
    getAthleteData() {
        const athleteId = this.data.athlete.id;
        const athleteRef = this.db.collection('/team', ref => ref.where('id', '==', athleteId));
        athleteRef.valueChanges()
            .subscribe(res => {
                const result = Object.keys(res).map(function(key) {
                    return res[key];
                });
                this.athlete = result[0];
                console.log('getAthleteData SUB')
                console.log(this.data.meet.id)
                console.log(this.athlete.meets[this.data.meet.id])
                if (this.athlete.meets[this.data.meet.id] === undefined) {
                    this.buildAthleteForm(false);
                }
                if (this.data.meet.id && this.athlete.meets[this.data.meet.id]) {
                    console.log('found athlete meet data!!!');
                    this.buildAthleteForm(true);
                    // this.createEventFormGroup(this.athlete.meets[this.data.meet.id]);
                    // return this.athlete.meets[this.data.meet.id];
                } else {
                }
            });
    }

    buildAthleteForm(foundData?) {
        // check to see if athlete has data already

        this.athleteForm = this.fb.group({
            athleteId: this.data.athlete.id,
            eventId: this.data.meet.id,
            athleteName: this.data.athlete.firstName,
            events: this.fb.array( [] )
        });
        console.log(foundData);
        if (foundData === true) {
            this.createEventFormGroup(this.athlete.meets[this.data.meet.id]);
        } else {
            this.createEventFormGroup();
        }

    }
    createEventFormGroup(existingData?) {

        let eventData;
        if (existingData) {
            this.athleteForm.controls['events'].reset();
            const control = <FormArray>this.athleteForm.controls['events'];
            for (let i = 0; i < control.length; i++) {
                control.removeAt(i);
            }
            console.log('existing data')
            console.log(existingData)
            eventData = existingData.events;
        } else {
            eventData = '';
        }

        const _this = this;
        console.log(this);
        for (let i = 0; i < this.data.meet.events.length; i++) {
            if (!_this.data.meet.events[i]) {
                break;
            }
          const group = this.fb.group({
              type: _this.data.meet.events[i].type,
              score: eventData[i] ? eventData[i]['score'] : ''
          });
            if (group.controls.score.value == null) {
                break;
            }

            console.log('adding ');
            console.log(group)
            console.log('to ');
            console.log(this.athleteForm.controls['events']);

          const control = <FormArray>this.athleteForm.controls['events'];
          control.push(group);
        }
    }

    saveForm() {
      console.log(this.athleteForm);

      const eventId = this.athleteForm.value.eventId;
      const events = this.athleteForm.value.events;

      // const athlete = this.db.collection('/team', ref => ref.where('id', '==', Number(this.athleteForm.value['athleteId'])));
      const team = this.db.collection('/team');
      const athlete = team.doc((this.athleteForm.value.athleteId).toString());
      console.log(athlete);
      let meets = {};
      meets[eventId] = {
          eventId: eventId,
          events: events
      };
      const meetObj = {
          meets
      }
      // updateObj = {
      //     meets: {
      //         meet: {
      //             eventId: eventId,
      //             events: events
      //         }
      //     }
      //
      // };
      athlete.set(meetObj, { merge: true });
      this.dialogRef.close();
        // this._location.back();


        // athlete.valueChanges()
        //     .subscribe(res => {
        //         const result = Object.keys(res).map(function(key) {
        //             return res[key];
        //         });
        //        console.log(result);
        //     });

        // athlete.snapshotChanges().map(actions => {
        //     actions.map(a => {
        //         const data = a.payload.doc.data();
        //         data.id = a.payload.doc.id;
        //         console.log(data);
        //     });
        // });



      // const eventData = this.athleteForm.value;
      //   this.db.collection('/team', ref => ref.where('id', '==', Number(this.athleteForm.value['athleteId'])).set(eventData).then(function() {
      //       console.log("Document successfully written!");
      //   });

    }
}
