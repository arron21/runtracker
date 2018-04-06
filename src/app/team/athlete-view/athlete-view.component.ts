import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import {AngularFirestore} from 'angularfire2/firestore';
import {ActivatedRoute, Params} from '@angular/router';
import {AthleteSkillAddComponent} from '../athlete-skill-add/athlete-skill-add.component';

@Component({
  selector: 'app-athlete-view',
  templateUrl: './athlete-view.component.html',
  styleUrls: ['./athlete-view.component.scss']
})
export class AthleteViewComponent implements OnInit {

  public athlete: any;
  public athleteId: any;
  public meets: any;
  public eventTypes: Array<any>;

  constructor(
      // @Inject(MAT_DIALOG_DATA) public data: any,
      private db: AngularFirestore,
      private  activatedRoute: ActivatedRoute,
      public dialog: MatDialog,
  ) { }

  ngOnInit() {
    // const athleteFromModalRef = this.data.athlete;

      this.activatedRoute.params.subscribe((params: Params) => {
          console.log(params);
          this.athleteId = params.athleteId;
      });

      this.athlete = this.db.collection('/team', ref => ref.where('id', '==', Number(this.athleteId))).valueChanges()
          .subscribe(res => {

              console.log(res);

              const result = Object.keys(res).map(function(key) {
                  return res[key];
              });
              this.athlete = result[0];
              console.log( this.athlete);

              const meets = [];
              for (const i in result[0].meets) {
                  meets.push(result[0].meets[i]);
              }
              this.meets = meets;

              this.afterAthleteLoad();
          });
  }

  afterAthleteLoad() {
      this.listEventTypes();
  }



    addEventType(type?) {
        const dialogRef = this.dialog.open(AthleteSkillAddComponent, {
            data:  {
                athlete: this.athlete,
                events: this.eventTypes,
                type: type
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });

    }

    listEventTypes() {
        const eventTypeArray = [];
        for (var key in this.athlete.events) {
            // skip loop if the property is from prototype
            if (!this.athlete.events.hasOwnProperty(key)) {
                continue;
            }
            eventTypeArray.push(key);
        }
        this.eventTypes = eventTypeArray;
    }

}
