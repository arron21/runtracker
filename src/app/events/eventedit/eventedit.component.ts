import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {MeetService} from '../../core/services/meet.service';
import {TeamService} from '../../core/services/team.service';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {AthleteEventEditComponent} from '../../team/athlete-event-edit/athlete-event-edit.component';
import {AngularFirestore} from 'angularfire2/firestore';
@Component({
  selector: 'app-eventedit',
  templateUrl: './eventedit.component.html',
  styleUrls: ['./eventedit.component.scss']
})
export class EventeditComponent implements OnInit {
  public meetId: any;

  public meet: any;
  public team: any;

  constructor(
      private activatedRoute: ActivatedRoute,
      private meetService: MeetService,
      private teamService: TeamService,
      private fb: FormBuilder,
      public dialog: MatDialog,
      // @Inject(MAT_DIALOG_DATA) public data: any,
      private db: AngularFirestore
  ) { }

  ngOnInit() {

      // const meetFromModalRef = this.data.meet;
      // console.log(meetFromModalRef)
      // this.meetId = meetFromModalRef.id;

      this.activatedRoute.params.subscribe((params: Params) => {
          console.log(params);
          const meetId = params.eventId;
          this.meetId = meetId;
      });

      this.getMeet();
      this.getTeam();
  }

  getMeet() {
  // Angular firestore requires you use the exact typing, the event is saved as an INT, but our json converts it to a string, so annyoying

      this.meet = this.db.collection('/meets', ref => ref.where('id', '==', Number(this.meetId))).valueChanges()
          .subscribe(res => {
              console.log('res');
              console.log(res);
              const result = Object.keys(res).map(function(key) {
                  return res[key];
              });
              this.meet = result;
              console.log('result');
              console.log(result);
          });

    // this.meetService.getMeet(meetId).subscribe(
    //       res => {
    //
    //           const result = Object.keys(res).map(function(key) {
    //               return res[key];
    //           });
    //           this.meet = result;
    //           console.log(this.meet);
    //       },
    //       err => {
    //       }
    //   );
  }

  getTeam() {

      this.db.collection('/team').valueChanges()
          .subscribe(res => {
              const result = Object.keys(res).map(function(key) {
                  return res[key];
              });
              this.team = result;
              console.log(this.team);
          });


      // let team = [];

      // this.teamService.getTeam().subscribe(
      //     res => {
      //        const result = Object.keys(res).map(function(key) {
      //             return res[key];
      //         });
      //         this.team = result;
      //
      //     },
      //     err => {
      //     }
      // );
  }

    openDialog(athlete, meet): void {
        let dialogRef = this.dialog.open(AthleteEventEditComponent, {
            width: '250px',
            data: {'athlete': athlete, 'meet': meet}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            // this.animal = result;
        });
    }


    // For now just going to load every athelete into the page
  // addAthleteToEvent() {
  //     this.teamService.getTeam().subscribe(
  //         res => {
  //
  //             const result = Object.keys(res).map(function(key) {
  //                 return res[key];
  //             });
  //         },
  //         err => {
  //         }
  //     );
  // }

}


