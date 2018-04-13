import { Component, OnInit } from '@angular/core';
import {TeamService} from '../../core/services/team.service';
import {AngularFirestore} from 'angularfire2/firestore';
import {MatDialog} from '@angular/material';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AthleteViewComponent} from '../athlete-view/athlete-view.component';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {

    public teamForm: FormGroup;
    public team: any;
    public loading: Boolean;

    public firstName: any;
    public lastName: any;

    constructor(private fb: FormBuilder,
              private teamService: TeamService,
              private db: AngularFirestore,
              public dialog: MatDialog) { }

  ngOnInit() {
      this.teamForm = this.fb.group({
          firstName: '',
          lastName: '',
      });

      this.loadTeam();
  }

    loadTeam() {
        // let team = [];
        this.loading = true;
        this.db.collection('/team').valueChanges()
            .subscribe(res => {
                const result = Object.keys(res).map(function(key) {
                    return res[key];
                });
                this.team = result;
                this.loading = false;
                // console.log(this.team);
            });
    }

    addAthlete() {
        const athleteObj = {
            id: new Date().getTime(),
            firstName: this.firstName,
            lastName: this.lastName,
            meets: [],
            pr: {}
        };

        this.db.collection('/team').doc((athleteObj.id).toString()).set(athleteObj);
        this.firstName = '';
        this.lastName = '';
        //

        //   const athleteObj = {
        //         id: new Date().getTime(),
        //         firstName: this.firstName,
        //         lastName: this.lastName,
        //   };
        //     this.db.collection('/team').add(athleteObj)
        //         .then((docRef) => {
        //             console.log("Document written with ID: ", docRef.id);
        //             this.firstName = '';
        //             this.lastName = '';
        //         })
        //         .catch((error) => {
        //             console.error("Error adding document: ", error);
        //         });
        // }
    }


    athleteModal(athlete) {
        let dialogRef = this.dialog.open(AthleteViewComponent, {
            width: '250px',
            data: {'athlete': athlete}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            // this.animal = result;
        });
    }

    viewAthlete(athlete) {
        // let dialogRef = this.dialog.open(AthleteViewComponent, {
        //     width: '250px',
        //     data: {'athlete': athlete}
        // });
        //
        // dialogRef.afterClosed().subscribe(result => {
        //     console.log('The dialog was closed');
        //     // this.animal = result;
        // });
    }

}
